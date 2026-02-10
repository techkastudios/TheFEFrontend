<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useIntersectionObserver } from '@vueuse/core'
import { LiveMedia } from '~/types/media'

export default defineComponent({
  name: 'HomeFeaturedMedia',

  setup() {
    const { $axios, i18n } = useContext()
    const target = ref(null)
    const loading = ref(false)

    const media: any = ref<LiveMedia>()
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    // get live status
    const isLive = ref(false)
    dayjs.extend(isBetween)

    const fetch = async () => {
      loading.value = true
      try {
        const url = `api/${lang}/live-media/featured`
        media.value = await $axios.$get(url)

        if (media.value) {
          const { startAt, endAt } = media.value
          if (startAt && endAt) {
            isLive.value = dayjs().isBetween(dayjs(startAt), dayjs(endAt))
          }
        }
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
      media,
      isLive,
    }
  },
})
</script>

<template>
  <div ref="target" :class="media && Object.keys(media).length == 0 ? 'hidden' : 'bg-red-600 p-2 mb-4'">
    <div v-if="media" v-b-modal.live-media-featured>
      <figure v-if="media.image">
        <v-img :src="media.image" :alt="media.title" />
      </figure>
      <div v-if="isLive" class="py-1 px-4 shadow-sm bg-white text-red-600 font-bold mt-2 inline-flex uppercase">
        {{ $t('live') }}
      </div>
      <p class="text-white text-base leading-5 line-clamp-3 mt-2">
        {{ media.title }}
      </p>
    </div>

    <b-modal id="live-media-featured" centered hide-footer
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
