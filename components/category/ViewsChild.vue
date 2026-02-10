<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
  onMounted,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import CategoryHeading from '~/components/home/CategoryHeading.vue'
import CategoryPostTitle from '~/components/home/CategoryPostTitle.vue'
import { Posts } from '~/types/posts'
import { CategoryViews } from '~/types/category'
import { Advertisement } from '~/types/ads'
import { useAdTrackStore } from '~/store/ads/adTrack'

export default defineComponent({
  name: 'ViewsChild',

  components: { CategoryHeading, CategoryPostTitle },

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

  setup(props) {
    const { $axios, i18n } = useContext()

    const target = ref(null)
    const loading = ref(false)

    const lead = ref<Posts>()
    const column2 = ref<Posts[]>([])
    const column3 = ref<Posts[]>([])
    const column4 = ref<Posts[]>([])
    const leadBottom = ref<Posts>()
    const column5 = ref<Posts[]>([])
    const column6 = ref<Posts[]>([])
    const column7 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const adTrackStore = useAdTrackStore()

    // Track view when the component mounts
    onMounted(() => {
      if (props.ads?.id != null) {
        adTrackStore.trackAdView(props.ads.id)
      }
    })

    // Track click on ad
    const handleAdClick = (adId: Number) => {
      adTrackStore.trackAdClick(Number(adId)) // Convert string to number
    }

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategoryViews = await $axios.$get(
          `api/${lang}/category/${props.category}/${props.subcategory}`
        )

        lead.value = category.featured
        column2.value = category.posts.slice(0, 2)
        column3.value = category.titles.slice(0, 7)
        column4.value = category.mostread
        if (category.posts.length > 2) {
          leadBottom.value = category.posts[2]
        }
        column5.value = category.titles.slice(7, 12)
        column6.value = category.titles.slice(12, 17)
        column7.value = category.titles.slice(17, 21)
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
      lead,
      column2,
      column3,
      column4,
      leadBottom,
      column5,
      column6,
      column7,
      handleAdClick,
    }
  },
})
</script>

<template>
  <div id="sub-category-one" ref="target" class="bg-bg2-light dark:bg-bg2-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="subcategory" :url="url" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4 pb-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-6">
          <article v-if="lead" class="grid grid-rows-4">
            <div class="row-span-2 row-end-3 col-span-full z-10 w-5/6 mx-auto">
              <nuxt-link v-if="lead.image" :to="localePath(lead.slug)">
                <figure>
                  <v-img :src="lead.image" :alt="lead.title" />
                </figure>
              </nuxt-link>
            </div>
            <div
              class="bg-bg1-light dark:bg-bg1-dark px-4 xl:px-16 pb-4 xl:pb-8 text-center row-span-3 row-start-2 col-span-full grid place-content-end">
              <v-category :category="lead.category" class="justify-center mb-4" />
              <v-heading
                class="font-semibold text-h3-light dark:text-h3-dark text-xl xl:text-4xl text-center transition-colors hover:text-rose-600 dark:hover:text-rose-600">
                <nuxt-link :to="localePath(lead.slug)" class="line-clamp-3">
                  {{ lead.title }}
                </nuxt-link>
              </v-heading>
            </div>
          </article>
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-3">
          <v-card v-for="post in column2" :key="post.id" :title="post.title" :url="post.slug" :image="post.image"
            :category="post.category" :datetime="post.datetime" :text="post.excerpt" class="mb-4 last:mb-0"></v-card>
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <category-post-title :posts="column3" class="col-auto xl:col-span-3 bg-bg1-light dark:bg-bg1-dark" />
        <!-- column 3 -->

        <!-- column 4 -->
        <section class="col-auto xl:col-span-3 bg-op-light dark:bg-op-dark">
          <header class="bg-bg7-light dark:bg-bg7-dark p-1.5 text-center uppercase font-bold text-lg text-white">
            {{ $t('headings.most_read') }}
          </header>
          <div class="p-2">
            <v-card v-for="post in column4" :key="post.id" :title="post.title" :url="post.slug" :image="post.image"
              :category="post.category" :datetime="post.datetime" :text="post.excerpt" class="mb-4 last:mb-0"></v-card>
          </div>
        </section>
        <!-- column 4 -->
      </div>
      <!-- news -->

      <hr class="border-bg5-light dark:border-bg5-dark" />

      <!-- news -->
      <div class="grid xl:grid-cols-4 grid-flow-row gap-4 pt-4">
        <!-- column 1 -->
        <section>
          <article v-if="leadBottom" class="grid grid-rows-5 xl:grid-rows-5">
            <div class="row-span-2 row-end-3 col-span-full z-10 w-11/12">
              <nuxt-link v-if="leadBottom.image" :to="localePath(leadBottom.slug)">
                <figure>
                  <v-img :src="leadBottom.image" :alt="leadBottom.title" />
                </figure>
              </nuxt-link>
            </div>
            <div
              class="bg-bg1-light dark:bg-bg1-dark px-2 pb-4 text-center row-span-4 row-start-2 col-span-full grid place-content-end">
              <v-category :category="leadBottom.category" class="justify-center mb-4" />
              <v-heading
                class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-2xl transition-colors hover:text-rose-600 dark:hover:text-rose-600">
                <nuxt-link :to="localePath(leadBottom.slug)" class="line-clamp-3">
                  {{ leadBottom.title }}
                </nuxt-link>
              </v-heading>
              <p class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal" v-html="leadBottom.excerpt"></p>
            </div>
          </article>
        </section>
        <!-- column 2 -->

        <!-- column 2 -->
        <category-post-title :posts="column5" class="bg-bg1-light dark:bg-bg1-dark" />
        <!-- column 2 -->

        <!-- column 3 -->
        <category-post-title :posts="column6" class="bg-bg1-light dark:bg-bg1-dark" />
        <!-- column 3 -->

        <!-- column 4 -->
        <category-post-title :posts="column7" class="bg-bg1-light dark:bg-bg1-dark" />
        <!-- column 4 -->
      </div>
      <!-- news -->

      <!-- ads -->
      <div class="mt-8">
        <v-ads v-if="ads" :ads="ads" @click="handleAdClick(ads.id)" />
        <client-only v-else>
          <Adsense data-ad-client="ca-pub-3438694616169600" data-ad-slot="2838794797" data-full-width-responsive="yes"
            is-new-ads-code="yes" data-ad-format="auto" ins-class="text-center mt-4" />
        </client-only>
      </div>
      <!-- ads -->
    </v-container>
  </div>
</template>
