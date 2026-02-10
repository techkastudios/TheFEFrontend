<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import { PostPagination, Posts } from '~/types/posts'
import { CategoryViewsChild } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'CategoryViewsReview',

  props: {
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: '/',
    },
    ads: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
  },

  setup() {
    const { $axios, i18n } = useContext()

    const target = ref(null)
    const loading = ref(false)

    const posts = ref<Posts[]>([])
    const morePosts = ref<Posts[]>([])
    const nextPageUrl = ref(`api/en/category/views/reviews`)
    const hasPages = ref(true)
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const response: CategoryViewsChild =
          await $axios.$get<CategoryViewsChild>(
            `api/${lang}/category/views/reviews`
          )

        nextPageUrl.value = `api/${lang}/category/views/sub-more/reviews/${response.id}`
        posts.value = [response.featured, ...response.posts]
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

    const loadMore = async () => {
      if (!loading.value && hasPages.value) {
        loading.value = true
        try {
          const response: PostPagination = await $axios.$get<PostPagination>(
            nextPageUrl.value
          )

          morePosts.value = [...morePosts.value, ...response.items]
          nextPageUrl.value = response.nextPageUrl
          hasPages.value = response.hasPages
        } finally {
          loading.value = false
        }
      }
    }

    return {
      target,
      loading,
      posts,
      hasPages,
      morePosts,
      loadMore,
    }
  },
})
</script>

<template>
  <div id="reviews" ref="target" class="py-4">
    <v-container>
      <div class="grid grid-cols-12 xl:grid-cols-16 gap-4 pb-8">
        <div class="col-auto xl:col-span-3">
          <!-- heading -->
          <v-heading
            :level="2"
            class="font-bold uppercase text-xl xl:text-2xl leading-6 text-h3-light dark:text-h3-dark mb-4"
          >
            <nuxt-link :to="localePath(url)">{{ subcategory }}</nuxt-link>
          </v-heading>
          <!-- heading -->
        </div>
        <!-- news -->
        <div
          class="col-auto xl:col-span-12 grid grid-cols-1 xl:grid-cols-12 gap-x-4 gap-y-4 xl:gap-y-8 place-content-stretch"
        >
          <div class="col-auto xl:col-span-12">
            <div class="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <!-- Left column (50%) - only first post -->
              <article
                v-if="posts.length"
                class="xl:col-span-4 flex flex-col border-t-2 border-bg7-light dark:border-bg7-dark"
              >
                <nuxt-link :to="localePath(posts[0].slug)">
                  <figure v-if="posts[0].image">
                    <v-img :src="posts[0].image" :alt="posts[0].caption" />
                  </figure>
                </nuxt-link>
                <div class="bg-bg2-light dark:bg-bg2-dark p-2 flex-1">
                  <v-heading
                    class="font-semibold text-h3-light dark:text-h3-dark text-base xl:text-xl leading-6 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
                  >
                    <nuxt-link
                      :to="localePath(posts[0].slug)"
                      class="line-clamp-2"
                    >
                      {{ posts[0].title }}
                    </nuxt-link>
                  </v-heading>
                  <!-- <p v-if="posts[0].subtitle" class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {{ posts[0].subtitle }}
                </p> -->
                </div>
              </article>

              <!-- Right side (25% + 25%) - rest of posts -->
              <div class="xl:col-span-8 grid grid-cols-1 xl:grid-cols-2 gap-4">
                <article
                  v-for="post in posts.slice(1)"
                  :key="post.id"
                  class="flex flex-col border-t-2 border-bg7-light dark:border-bg7-dark"
                >
                  <div
                    class="flex items-center bg-bg2-light dark:bg-bg2-dark p-2"
                  >
                    <nuxt-link
                      :to="localePath(post.slug)"
                      class="flex-shrink-0 mr-3"
                    >
                      <figure v-if="post.image">
                        <v-img
                          :src="post.image"
                          :alt="post.caption"
                          class="rounded-full w-20 h-20 object-cover"
                        />
                      </figure>
                    </nuxt-link>
                    <v-heading
                      class="font-semibold text-h3-light dark:text-h3-dark text-base xl:text-lg leading-6 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
                    >
                      <nuxt-link
                        :to="localePath(post.slug)"
                        class="line-clamp-2"
                      >
                        {{ post.title }}
                      </nuxt-link>
                    </v-heading>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <div
              class="grid grid-cols-1 xl:grid-cols-12 gap-4 place-content-stretch mb-4"
            >
              <article
                v-for="post in morePosts"
                :key="post.id"
                class="col-auto xl:col-span-3 flex flex-col border-t-2 border-bg7-light dark:border-bg7-dark"
              >
                <nuxt-link v-if="post.image" :to="localePath(post.slug)">
                  <figure>
                    <v-img :src="post.image" :alt="post.caption" />
                  </figure>
                </nuxt-link>
                <div class="bg-bg2-light dark:bg-bg2-dark p-2 flex-1">
                  <v-heading
                    class="font-semibold text-h3-light dark:text-h3-dark text-base xl:text-xl transition-colors hover:text-rose-600 dark:hover:text-rose-600"
                  >
                    <nuxt-link
                      :to="localePath(post.slug)"
                      class="line-clamp-3"
                      >{{ post.title }}</nuxt-link
                    >
                  </v-heading>
                </div>
              </article>
            </div>
            <button
              v-if="hasPages && posts.length"
              type="button"
              class="font-bold rounded-2xl bg-bg7-light dark:bg-bg7-dark text-white text-xl leading-6 py-2 px-16 hover:ring-2"
              :disabled="loading"
              @click.stop="loadMore"
            >
              <font-awesome-icon :icon="['fas', 'plus']" class="mr-1" />
              {{ $t('buttons.load_more') }}
            </button>
          </div>
        </div>
        <!-- news -->
      </div>
      <div>
        <v-ads v-if="ads" :ads="ads" />
        <client-only v-else>
          <Adsense
            data-ad-client="ca-pub-3438694616169600"
            data-ad-slot="2838794797"
            data-full-width-responsive="yes"
            is-new-ads-code="yes"
            data-ad-format="rectangle"
          />
        </client-only>
      </div>
    </v-container>
  </div>
</template>
