<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  onMounted,
  useFetch,
  watchEffect,
  computed,
  ssrRef,
} from '@nuxtjs/composition-api'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

import { PostPagination, Posts } from '~/types/posts'

export default defineComponent({
  name: 'AllNews',

  setup() {
    const { $axios, i18n } = useContext()
    const loading = ref(false)
    const loadingMostRead = ref(false)
    const target = ref<HTMLElement>()

    const nextPageUrl = ssrRef('')
    const hasPages = ssrRef(false)
    const nextPage = computed(() => nextPageUrl.value)
    const hasMorePages = computed(() => hasPages.value)

    const posts = ref<Posts[]>([])
    const mostRead = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    useFetch(async () => {
      const url = `api/${lang}/posts`
      const response = await $axios.$get<PostPagination>(url)

      posts.value = response.items
      nextPageUrl.value = response.nextPageUrl
      hasPages.value = response.hasPages
    })

    const { y } = useWindowScroll()
    const { height } = useWindowSize()
    watchEffect(async () => {
      const targetBottom =
        (target.value?.clientHeight || 0) + (target.value?.offsetTop || 0)
      const windowBottom = height.value + y.value

      if (targetBottom - windowBottom <= 100) {
        if (!loading.value && hasMorePages.value) {
          loading.value = true
          try {
            const res: PostPagination = await $axios.$get(nextPage.value)
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

    const fetch = async () => {
      loadingMostRead.value = true
      try {
        mostRead.value = await $axios.$get<Posts[]>('api/en/post-most-read')
      } finally {
        loadingMostRead.value = false
      }
    }

    onMounted(() => fetch())

    return {
      loading,
      target,
      posts,
      mostRead,
    }
  },
})
</script>

<template>
  <div id="all-news" ref="target" class="py-8">
    <v-container>
      <div class="grid grid-cols-1 xl:grid-cols-16 gap-4">
        <div class="col-auto xl:col-span-12">
          <!-- news -->
          <v-heading :level="2" class="font-bold font-heading uppercase text-xl text-white bg-gray py-2 px-5 mb-4">
            <div class="flex items-center">
              <span class="mr-5">{{ $t('headings.all_news') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="21" viewBox="0 0 16 21" class="fill-current">
                <path id="Polygon_2" data-name="Polygon 2" d="M10.5,0,21,16H0Z" transform="translate(16) rotate(90)" />
              </svg>
            </div>
          </v-heading>
          <div class="space-y-4">
            <article v-for="post in posts" :key="post.id" class="p-2 bg-bg2-light dark:bg-bg2-dark">
              <v-category-time :category="post.category" :time="post.datetime" />
              <v-heading class="font-semibold text-h3-light dark:text-h3-dark mb-4 line-clamp-3">
                <nuxt-link :to="localePath(post.slug)">{{
                  post.title
                }}</nuxt-link>
              </v-heading>
              <p class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal" v-html="post.excerpt"></p>
            </article>
          </div>
          <!-- news -->
        </div>
        <div class="col-auto xl:col-span-4">
          <v-heading :level="2" class="font-bold font-heading uppercase text-xl text-white bg-gray py-2 px-5 mb-4">
            <div class="flex items-center">
              <span class="mr-5">{{ $t('headings.most_read') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="21" viewBox="0 0 16 21" class="fill-current">
                <path id="Polygon_2" data-name="Polygon 2" d="M10.5,0,21,16H0Z" transform="translate(16) rotate(90)" />
              </svg>
            </div>
          </v-heading>
          <v-card v-for="item in mostRead" :key="`${item.id}-most`" :title="item.title" :url="item.slug"
            :category="item.category" :datetime="item.datetime" :text="item.excerpt" class="mb-4 last:mb-0" />
        </div>
      </div>
    </v-container>
  </div>
</template>
