<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'
import { Advertisement } from '~/types/ads'

import { Posts } from '~/types/posts'

export default defineComponent({
  name: 'HomeMostRead',

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

    const column1 = ref<Posts[]>([])
    const column2 = ref<Posts[]>([])
    const column3 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const items: Posts[] = await $axios.$get<Posts[]>(
          `api/${lang}/home/most-read`
        )

        column1.value = items.slice(0, 2)
        column2.value = items.slice(2, 6)
        column3.value = items.slice(6, 10)
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
      column1,
      column2,
      column3,
    }
  },
})
</script>

<template>
  <div id="home-most-read" ref="target" class="bg-bg1-light dark:bg-bg1-dark py-8">
    <v-container>
      <v-heading
        :level="2"
        class="font-bold uppercase text-3xl text-h2-light dark:text-h2-dark mb-4"
      >
        <nuxt-link :to="localePath('/all-news')" class="flex items-center">
          <span class="mr-5">{{ $t('headings.most_read') }}</span>
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

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4">
        <!-- column 1 -->
        <section class="bg-bg2-light dark:bg-bg2-dark p-2 col-auto xl:col-span-4">
          <article v-for="(post, col1Index) in column1" :key="post.id" class="flex space-x-2">
            <div
              class="flex-shrink-0 w-9 font-bold text-black dark:text-white text-3xl py-4"
            >{{ col1Index + 1 }}</div>
            <div
              class="border-gray-600 py-4"
              :class="
              column1.length - 1 === col1Index ? 'border-b-0' : 'border-b-2'
            "
            >
              <v-heading
                class="font-bold text-black dark:text-white text-2xl mb-4 line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
              >
                <nuxt-link :to="localePath(post.slug)">
                  {{
                  post.title
                  }}
                </nuxt-link>
              </v-heading>
              <p class="text-black dark:text-white text-xl line-clamp-5" v-html="post.excerpt"></p>
            </div>
          </article>
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="bg-bg2-light dark:bg-bg2-dark p-2 col-auto xl:col-span-4">
          <article v-for="(post, col2Index) in column2" :key="post.id" class="flex space-x-2">
            <div
              class="flex-shrink-0 w-9 font-bold text-black dark:text-white text-3xl py-4"
            >{{ col2Index + 3 }}</div>
            <div
              class="border-bg5-light dark:border-bg5-dark py-4"
              :class="
              column2.length - 1 === col2Index ? 'border-b-0' : 'border-b-2'
            "
            >
              <v-heading
                class="font-heading font-bold text-black dark:text-white text-xl mb-4 line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
              >
                <nuxt-link :to="localePath(post.slug)">
                  {{
                  post.title
                  }}
                </nuxt-link>
              </v-heading>
              <p class="text-p-light dark:text-p-dark text-base line-clamp-2 merriweather-sans-normal" v-html="post.excerpt"></p>
            </div>
          </article>
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <section class="bg-bg2-light dark:bg-bg2-dark p-2 col-auto xl:col-span-4">
          <article v-for="(post, col3Index) in column3" :key="post.id" class="flex space-x-2">
            <div
              class="flex-shrink-0 w-9 font-bold text-black dark:text-white text-3xl py-4"
            >{{ col3Index + 7 }}</div>
            <div
              class="border-bg5-light dark:border-bg5-dark py-4"
              :class="
              column3.length - 1 === col3Index ? 'border-b-0' : 'border-b-2'
            "
            >
              <v-heading
                class="font-heading font-bold text-black dark:text-white text-xl mb-4 line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
              >
                <nuxt-link :to="localePath(post.slug)">
                  {{
                  post.title
                  }}
                </nuxt-link>
              </v-heading>
              <p class="text-p-light dark:text-p-dark text-base line-clamp-2 merriweather-sans-normal" v-html="post.excerpt"></p>
            </div>
          </article>
        </section>
        <!-- column 3 -->

        <!-- column 5 -->
        <section class="col-auto xl:col-span-3">
          <v-ads v-if="ads" :ads="ads" />
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
        <!-- column 5 -->
      </div>
      <!-- news -->
    </v-container>
  </div>
</template>
