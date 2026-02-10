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
import { LiveMedia } from '~/types/media'

export default defineComponent({
  name: 'MediaPost',

  setup() {
    const { $axios, i18n } = useContext()
    const target = ref()
    const loading = ref(false)

    const media = ref<LiveMedia>()
    const items = ref<LiveMedia[]>([])

    const nextPageUrl = ref('')
    const hasPages = ref(false)
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const url = `api/${lang}/live-media/get`
        const response = await $axios.$get(url)

        items.value = response.items
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
            const res = await $axios.$get(nextPageUrl.value)
            items.value = [...items.value, ...res.items]
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
      items,
      media,
      setMedia(item: LiveMedia) {
        media.value = item
      },
      isActive(item: LiveMedia): boolean {
        if (media.value) {
          return media.value.id === item.id
        }
        return false
      },
    }
  },
})
</script>

<template>
  <div id="category-more" ref="target" class="py-8">
    <v-container>
      <!-- heading -->
      <v-heading :level="2" class="font-bold font-heading uppercase text-xl text-white bg-blue-850 py-2 px-5 mb-4">
        Media
      </v-heading>
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-2 gap-4 pb-4">
        <!-- column 1 -->
        <article v-for="item in items" :key="item.id" class="grid xl:grid-cols-2 gap-x-4 bg-bg2-light dark:bg-bg2-dark"
          :class="[isActive(item) ? 'ring-2 ring-green-600' : '']" v-b-modal.live-media-modal
          @click.stop="setMedia(item)">
          <figure v-if="item.image">
            <v-img :src="item.image" />
          </figure>
          <div class="mt-4 xl:mt-0">
            <v-heading
              class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600">
              {{ item.title }}
            </v-heading>
          </div>
        </article>
      </div>
      <!-- news -->
    </v-container>

    <b-modal id="live-media-modal" centered hide-footer
      modal-class="fixed z-10 inset-0 overflow-y-auto transition-opacity ease-linear"
      dialog-class="flex items-center justify-center min-h-full pt-4 px-4 pb-20 text-center sm:p-0"
      content-class="inline-block align-bottom bg-white rounded-t-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
      header-class="p-2 flex justify-between items-center border-b-2 border-red-600 bg-red-600">
      <template #modal-header="{ close }">
        <h5 v-if="media" class="text-lg leading-6 font-medium text-white">
          {{ media.title }}
        </h5>
        <button type="button"
          class="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          @click.stop="close">
          <span class="sr-only">Close</span>
          <!-- Heroicon name: outline/x -->
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </template>
      <div v-if="media" v-html="media.content"></div>
    </b-modal>
  </div>
</template>
