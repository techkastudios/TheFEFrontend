<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  watchEffect,
} from '@nuxtjs/composition-api'
import {
  useIntersectionObserver,
  useWindowScroll,
  useWindowSize,
} from '@vueuse/core'

import { PostPagination, Posts } from '~/types/posts'
import CategoryMediaLeftRight from '~/components/home/CategoryMediaLeftRight.vue'

export default defineComponent({
  name: 'CategoryMore',

  components: { CategoryMediaLeftRight },

  props: {
    category: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { $axios, i18n } = useContext()
    const target = ref()
    const loading = ref(false)

    const posts = ref<Posts[]>([])

    const nextPageUrl = ref('')
    const hasPages = ref(false)
    let lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    // For now 'en' will be selected language for bangla category all time.
    if (props.category === 'bangla') {
      lang = 'en'
    }
    const fetch = async () => {
      loading.value = true
      try {
        const response = await $axios.$get<PostPagination>(
          `api/${lang}/category/${props.category}/more`
        )

        posts.value = response.items
        nextPageUrl.value = response.nextPageUrl
        hasPages.value = response.hasPages
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

    const { y } = useWindowScroll()
    const { height } = useWindowSize()
    watchEffect(async () => {
      const targetBottom =
        (target.value?.clientHeight || 0) + (target.value?.offsetTop || 0)
      const windowBottom = height.value + y.value

      if (targetBottom - windowBottom <= 100) {
        if (!loading.value && nextPageUrl.value) {
          loading.value = true
          try {
            const res: PostPagination = await $axios.$get(nextPageUrl.value)
            posts.value = [...posts.value, ...res.items]
            nextPageUrl.value = res.nextPageUrl
            hasPages.value = res.hasPages
          } catch (e) {
          } finally {
            loading.value = false
          }
        }
      }
    })

    return {
      target,
      loading,
      posts,
    }
  },
})
</script>

<template>
  <div id="category-more" ref="target" class="bg-bg2-light dark:bg-bg2-dark py-8">
    <v-container>
      <!-- heading -->
      <v-heading
        :level="2"
        class="flex items-center font-bold uppercase text-3xl text-h2-light dark:text-h2-dark mb-4"
      >
        <span class="mr-5">{{ $t('more') }}</span>
        <svg
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="12"
          viewBox="0 0 13 12"
        >
          <path
            id="Polygon_3"
            data-name="Polygon 3"
            d="M6.5,0,13,12H0Z"
            transform="translate(13 12) rotate(180)"
          />
        </svg>
      </v-heading>
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-2 gap-4 pb-4">
        <!-- column 1 -->
        <category-media-left-right
          v-for="post in posts"
          :key="post.id"
          :title="post.title"
          :url="post.slug"
          :image-left="post.image"
          :category="post.category"
          :datetime="post.datetime"
          :text="post.excerpt"
          class="bg-bg1-light dark:bg-bg1-dark p-4"
        />
        <!-- column 1 -->
      </div>
      <!-- news -->
    </v-container>
  </div>
</template>
