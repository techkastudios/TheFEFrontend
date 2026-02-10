<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  PropType,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import { Posts } from '~/types/posts'
import CategoryHeading from '~/components/home/CategoryHeading.vue'
import CategoryColumnHeading from '~/components/home/CategoryColumnHeading.vue'
// import CategoryPostTitle from '~/components/home/CategoryPostTitle.vue'
import CategoryMediaLeftRight from '~/components/home/CategoryMediaLeftRight.vue'
import { CategoryHomeLifestyle } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategoryLifeStyle',
  components: {
    CategoryHeading,
    CategoryColumnHeading,
    // CategoryPostTitle,
    CategoryMediaLeftRight,
  },
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
    const column3 = ref<Posts[]>([])
    const oped = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategoryHomeLifestyle =
          await $axios.$get<CategoryHomeLifestyle>(
            `api/${lang}/home/category-lifestyle`
          )

        console.log('category', category)

        name.value = category.name
        slug.value = category.slug

        lead.value = category.featured
        column1.value = category.posts
        // column3.value =  category.titles
        column3.value = [
          ...category.living,
          ...category.entertainment,
          ...category.foods,
          ...category.culture,
          ...category.others,
        ]
        oped.value = category.oped
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
      column3,
      oped,
    }
  },
})
</script>

<template>
  <div id="home-category-life-style" ref="target" class="bg-bg1-light dark:bg-bg1-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="$t('lifestyle')" url="/lifestyle" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-8 gap-4 pb-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-4">
          <template v-if="lead">
            <v-card
              :category="lead.category"
              :image="lead.image"
              :title="lead.title"
              :url="lead.slug"
              :text="lead.excerpt"
              class="mb-4 last:mb-0"
            />
          </template>

          <template v-if="column1.length > 0">
            <v-card
              v-for="post in column1"
              :key="'general-post-' + post.id"
              :title="post.title"
              :category="post.category"
              :url="post.slug"
              :text="post.excerpt"
              class="mb-4 last:mb-0"
            />
          </template>
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-2">
          <category-column-heading :name="$t('op_ed_lifestyle')" :url="localePath(`/lifestyle`)" />
          <div
            class="mt-4 bg-bg2-light dark:bg-bg2-dark divide-y divide-bg5-light dark:divide-bg5-dark px-4"
          >
            <category-media-left-right
              v-for="post in oped"
              :key="post.id"
              :title="post.title"
              :url="post.slug"
              :image-left="post.image"
              :datetime="post.datetime"
              class="mb-4 last:mb-0"
            />
          </div>
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <section class="col-auto xl:col-span-2">
          <category-media-left-right
            v-for="post in column3"
            :key="post.id"
            :title="post.title"
            :url="post.slug"
            :category="post.category"
            :image-left="post.image"
            :datetime="post.datetime"
            class="mb-4 last:mb-0"
          />
          <!-- <category-post-title :posts="column3" class="bg-bg2-light dark:bg-bg2-dark" /> -->
        </section>
        <!-- column 3 -->
      </div>
      <!-- news -->
      <!-- ads -->
      <div class="mt-8">
        <v-ads v-if="ads" :ads="ads" />
        <client-only v-else>
          <Adsense
            data-ad-client="ca-pub-3438694616169600"
            data-ad-slot="2838794797"
            data-full-width-responsive="yes"
            is-new-ads-code="yes"
            data-ad-format="auto"
            ins-class="text-center mt-8"
          />
        </client-only>
      </div>
      <!-- ads -->
    </v-container>
  </div>
</template>