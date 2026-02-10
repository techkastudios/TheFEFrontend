<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import { Posts } from '~/types/posts'
import CategoryHeading from '~/components/home/CategoryHeading.vue'
import CategoryPostTitle from '~/components/home/CategoryPostTitle.vue'
import CategoryMediaLeftRight from '~/components/home/CategoryMediaLeftRight.vue'
import { CategorySport } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategorySport',

  components: { CategoryHeading, CategoryPostTitle, CategoryMediaLeftRight },

  props: {
    ads: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
  },

  setup() {
    const { $axios, i18n } = useContext()
    const target = ref(null)
    const loading = ref(false)

    const name = ref('')
    const slug = ref('/')
    const lead = ref<Posts>()
    const column1 = ref<Posts[]>([])
    const column2 = ref<Posts[]>([])
    const column3 = ref<Posts[]>([])
    const column4 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en';

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategorySport = await $axios.$get<CategorySport>(
          `api/${lang}/home/category-sports`
        )
        name.value = category.name
        slug.value = category.slug
        lead.value = category.featured
        column1.value = category.posts
        column3.value = category.latest
        column4.value = category.titles
      } finally {
        loading.value = false
      }
    }

    const { stop } = useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // Manually trigger a refetch
          fetch()

          stop()
        }
      },
      {
        rootMargin: '100px',
      }
    )

    return {
      target,
      loading,
      name,
      slug,
      lead,
      column1,
      column2,
      column3,
      column4,
    }
  },
})
</script>

<template>
  <div id="home-category-sport" ref="target" class="bg-bg1-light dark:bg-bg1-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="name" :url="slug" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4 pb-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-6">
          <v-card v-if="lead" :title="lead.title" :url="lead.slug" :image="lead.image" :category="lead.category"
            :datetime="lead.datetime" :text="lead.excerpt" class="mb-4"></v-card>
          <v-card v-for="post in column1" :key="post.id" :title="post.title" :url="post.slug" :category="post.category"
            :datetime="post.datetime" :text="post.excerpt" class="mb-4 last:mb-0" />

          <!-- <category-media-left-right
              v-for="post in column2"
              :key="post.id"
              :title="post.title"
              :url="post.slug"
              :image-right="post.image"
              :category="post.category"
              :datetime="post.datetime"
              :text="post.excerpt"
              class="mb-4 last:mb-0"
            /> -->
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section
          class="col-auto xl:col-span-6 bg-bg2-light dark:bg-bg2-dark divide-y divide-bg5-light dark:divide-bg5-dark px-4">
          <category-media-left-right v-for="post in column3" :key="post.id" :title="post.title" :url="post.slug"
            :image-left="post.image" :category="post.category" :datetime="post.datetime" :text="post.excerpt"
            class="py-4" />
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <category-post-title :posts="column4" class="col-auto xl:col-span-3 bg-bg2-light dark:bg-bg2-dark" />
        <!-- column 3 -->
      </div>
      <!-- news -->

      <!-- ads -->
      <v-ads v-if="ads" :ads="ads" />
      <client-only v-else>
        <Adsense data-ad-client="ca-pub-3438694616169600" data-ad-slot="2838794797" data-full-width-responsive="yes"
          is-new-ads-code="yes" data-ad-format="auto" ins-class="text-center mt-8" />
      </client-only>
      <!-- ads -->
    </v-container>
  </div>
</template>
