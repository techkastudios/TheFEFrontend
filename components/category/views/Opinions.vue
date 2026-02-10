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
  name: 'CategoryViewsOpinions',

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

    const posts1 = ref<Posts[]>([])
    const posts2 = ref<Posts[]>([])
    const posts = ref<Posts[]>([])
    const nextPageUrl = ref(`api/en/category/views/opinions`)
    const hasPages = ref(true)
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const response: CategoryViewsChild =
          await $axios.$get<CategoryViewsChild>(
            `api/${lang}/category/views/opinions`
          )

        nextPageUrl.value = `api/${lang}/category/views/sub-more/opinions/${response.id}`
        const items: Posts[] = [response.featured, ...response.posts]
        posts1.value = items.slice(0, 2)
        posts2.value = items.slice(2, 4)
        posts.value = items.slice(4, 8)
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

          posts.value = [...posts.value, ...response.items]
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
      posts1,
      posts2,
      hasPages,
      posts,
      loadMore,
    }
  },
})
</script>

<template>
  <div id="opinions" ref="target" class="py-4">
    <v-container>
      <div class="grid grid-cols-1 xl:grid-cols-16 gap-4 pb-8">
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
          class="col-auto xl:col-span-12 grid grid-cols-1 xl:grid-cols-12 gap-4 place-content-stretch"
        >
          <div class="col-span-full">
            <div class="grid grid-cols-1 xl:grid-cols-12 xl:grid-rows-2 gap-4">
              <article
                v-for="post in posts1"
                :key="post.id"
                class="col-auto xl:col-span-3 xl:row-span-2 flex flex-col border-t-2 border-bg7-light dark:border-bg7-dark"
              >
                <div class="bg-bg2-light dark:bg-bg2-dark p-2 flex-1">
                  <v-heading
                    class="font-semibold text-h3-light dark:text-h3-dark text-base xl:text-xl leading-6 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
                  >
                    <figure v-if="post.image">
                      <v-img :src="post.image" :alt="post.caption" class="" />
                    </figure>
                    <nuxt-link
                      :to="localePath(post.slug)"
                      class="line-clamp-4"
                      >{{ post.title }}</nuxt-link
                    >
                  </v-heading>
                  <div v-if="post.reporter">
                    <p
                      class="text-h2-light dark:text-h2-dark text-xs xl:text-xl"
                    >
                      <nuxt-link :to="'/'">{{ post.reporter.name }}</nuxt-link>
                    </p>
                  </div>
                </div>
              </article>
              <article
                v-for="post in posts2"
                :key="post.id"
                class="col-auto xl:col-span-6 xl:row-span-1 border-t-2 border-bg7-light dark:border-bg7-dark"
              >
                <div class="bg-bg2-light dark:bg-bg2-dark p-4 flex">
                  <figure v-if="post.image" class="float-right mr-4">
                    <v-img
                      :src="post.image"
                      :alt="post.caption"
                      class="rounded-full w-20 h-20"
                    />
                  </figure>
                  <div>
                    <v-heading
                      class="font-semibold text-h3-light dark:text-h3-dark text-base xl:text-xl leading-6 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
                    >
                      <nuxt-link
                        :to="localePath(post.slug)"
                        class="line-clamp-4"
                        >{{ post.title }}</nuxt-link
                      >
                    </v-heading>
                    <p
                      v-if="post.reporter"
                      class="text-h2-light dark:text-h2-dark text-xs xl:text-xl"
                    >
                      <nuxt-link :to="'/'">{{ post.reporter.name }}</nuxt-link>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div
            class="col-span-full w-full h-0.5 bg-bg5-light dark:bg-bg5-dark my-4"
          />
          <div class="col-span-full">
            <div
              class="grid grid-cols-1 xl:grid-cols-12 gap-4 place-content-stretch mb-4"
            >
              <article
                v-for="post in posts"
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
                  <p
                    v-if="post.reporter"
                    class="text-h2-light dark:text-h2-dark text-xs xl:text-xl"
                  >
                    <nuxt-link :to="'/'">{{ post.reporter.name }}</nuxt-link>
                  </p>
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
