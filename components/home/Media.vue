<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'
import { Advertisement } from '~/types/ads'
import { LiveMedia } from '~/types/media'

export default defineComponent({
  name: 'HomeMedia',

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

    const media = ref<LiveMedia>()
    const items = ref<LiveMedia[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const response: LiveMedia[] = await $axios.$get<LiveMedia[]>(
          `api/${lang}/live-media/home`
        )

        media.value = response[0]
        items.value = response
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
      items,
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
  <div>
    <div id="home-media" ref="target" class="bg-media-light dark:bg-media-dark py-8">
      <v-container>
        <!-- heading -->
        <v-heading :level="2" class="font-bold uppercase text-3xl text-white mb-4">
          <nuxt-link to="/media" class="flex items-center">
            <span class="mr-5">{{ $t('headings.media') }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="21"
              viewBox="0 0 16 21"
              class="fill-current"
            >
              <path
                id="Polygon_2"
                data-name="Polygon 2"
                d="M10.5,0,21,16H0Z"
                transform="translate(16) rotate(90)"
              />
            </svg>
          </nuxt-link>
        </v-heading>
        <!-- heading -->

        <!-- news -->
        <div class="grid xl:grid-cols-15 gap-8 pb-4">
          <!-- column 1 -->
          <section v-if="media && media.image" class="col-auto xl:col-span-7">
            <figure v-b-modal.live-media-modal class="ring-2 ring-green-600">
              <v-img :src="media.image" :alt="media.title" />
            </figure>
          </section>
          <!-- column 1 -->

          <!-- column 2 -->
          <section class="col-auto xl:col-span-8">
            <div
              v-for="item in items"
              :key="item.id"
              class="inline-flex bg-gray-light p-3 mb-4 last:mb-0 cursor-pointer w-full"
              :class="[isActive(item) ? 'ring-2 ring-green-600' : '']"
              @click.stop="setMedia(item)"
            >
              <div class="flex-shrink-0 w-40 mr-8">
                <figure v-if="item.image">
                  <v-img :src="item.image" :alt="item.title" />
                </figure>
              </div>

              <div>
                <p class="line-clamp-4 text-white text-base">{{ item.title }}</p>
              </div>
            </div>
          </section>
          <!-- column 2 -->
        </div>
        <!-- news -->
      </v-container>
      <b-modal
        id="live-media-modal"
        centered
        hide-footer
        modal-class="fixed z-10 inset-0 overflow-y-auto transition-opacity ease-linear"
        dialog-class="flex items-center justify-center min-h-full pt-4 px-4 pb-20 text-center sm:p-0"
        content-class="inline-block align-bottom bg-white rounded-t-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
        header-class="p-2 flex justify-between items-center border-b-2 border-red-600 bg-red-600"
      >
        <template #modal-header="{ close }">
          <h5 v-if="media" class="text-lg leading-6 font-medium text-white">{{ media.title }}</h5>
          <button
            type="button"
            class="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            @click.stop="close"
          >
            <span class="sr-only">Close</span>
            <!-- Heroicon name: outline/x -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </template>
        <div v-if="media" v-html="media.content"></div>
      </b-modal>
    </div>
    <div>
      <v-container>
        <!-- ads -->
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
        <!-- ads -->
      </v-container>
    </div>
  </div>
</template>
