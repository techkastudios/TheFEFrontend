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
import CategoryMediaLeftRightV2 from '~/components/home/CategoryMediaLeftRightV2.vue'
import { CategoryWorld } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategoryWorld',

  components: {
    CategoryHeading,
    CategoryMediaLeftRightV2,
  },

  props: {
    ads1: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    ads2: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    ads3: {
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

    const column1 = ref<Posts[]>([])
    const column2 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategoryWorld = await $axios.$get<CategoryWorld>(
          `api/${lang}/home/category-world`
        )

        name.value = category.name
        slug.value = category.slug

        column1.value = [
          ...[category.featured],
          ...category.posts,
          ...category.asia,
        ]
        column2.value = [
          ...category.america,
          ...category.europe,
          ...category.africa,
        ]
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
      column1,
      column2,
    }
  },
})
</script>

<template>
  <div id="home-category-world" ref="target" class="bg-bg1-light dark:bg-bg1-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="name" :url="slug" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4 pb-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-6 bg-bg2-light dark:bg-bg2-dark p-4">
          <category-media-left-right-v-2
            v-for="post in column1"
            :key="post.id"
            :title="post.title"
            :url="post.slug"
            :image-left="post.image"
            :category="post.category"
            :datetime="post.datetime"
            :text="post.excerpt"
            class="mb-4 last:mb-0"
          />
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-6 grid grid-rows-3 grid-cols-2 gap-x-4">
          <v-card
            v-for="post in column2"
            :key="post.id"
            :title="post.title"
            :url="post.slug"
            :image="post.image"
            :category="post.category"
            :datetime="post.datetime"
            :text="post.excerpt"
            class="mb-4 last:mb-0"
          />
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <section class="col-auto xl:col-span-3 grid grid-rows-2 gap-8">
          <v-ads v-if="ads1" :ads="ads1" />
          <client-only v-else>
            <Adsense
              data-ad-client="ca-pub-3438694616169600"
              data-ad-slot="2838794797"
              data-full-width-responsive="yes"
              is-new-ads-code="yes"
              data-ad-format="vertical"
            />
          </client-only>
          <v-ads v-if="ads2" :ads="ads2" />
          <client-only v-else>
            <Adsense
              data-ad-client="ca-pub-3438694616169600"
              data-ad-slot="2838794797"
              data-full-width-responsive="yes"
              is-new-ads-code="yes"
              data-ad-format="vertical"
            />
          </client-only>
        </section>
        <!-- column 3 -->
      </div>
      <!-- news -->

      <!-- ads -->
      <v-ads v-if="ads3" :ads="ads3" />
      <client-only v-else>
        <Adsense
          data-ad-client="ca-pub-3438694616169600"
          data-ad-slot="2838794797"
          data-full-width-responsive="yes"
          is-new-ads-code="yes"
          data-ad-format="auto"
        />
      </client-only>
      <!-- ads -->
    </v-container>
  </div>
</template>
