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
import CategoryMediaLeftRight from '~/components/home/CategoryMediaLeftRight.vue'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategoryBangla',

  components: {
    CategoryHeading,
    CategoryMediaLeftRight,
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
    const { $axios, $config } = useContext()
    const target = ref(null)
    const loading = ref(false)

    // section heading → Bangla
    const name = ref<string>('Bangla')

    // Use runtime config - no hardcoded URLs
    const banglaBaseUrl = $config?.banglaAppUrl
    const banglaApiUrl = $config?.banglaApiUrl

    // news data
    const lead = ref<Posts>()
    const column1 = ref<Posts[]>([]) // features
    const column2 = ref<Posts[]>([]) // latest_news
    const column3 = ref<Posts[]>([]) // reserved

    // Function to create Bangla article URL: baseUrl/category-slug/article-slug
    const createBanglaArticleUrl = (post: Posts): string => {
      if (!post || !banglaBaseUrl) return '#'

      // Use category.slug directly from API
      let categorySlug ;

      let articleSlug = post.slug || 'article'
      // Remove leading slash if present
      if (articleSlug.startsWith('/')) {
        articleSlug = articleSlug.substring(1)
      }
      // Remove any existing domain parts
      articleSlug = articleSlug.replace(/https?:\/\/[^/]+\//, '')

      return `${banglaBaseUrl}/${categorySlug}/${articleSlug}`
    }

    // Function to create Bangla category URL: baseUrl/category-slug
    const createBanglaCategoryUrl = (category: any): string => {
      if (!category || !banglaBaseUrl) return '#'

      // Use category.slug directly from API
      const categorySlug = category.slug || 'news'

      return `${banglaBaseUrl}/${categorySlug}`
    }

    // Function to handle external redirect for articles
    const redirectToBanglaArticle = (post: Posts) => {
      const banglaUrl = createBanglaArticleUrl(post)
      if (banglaUrl !== '#') {
        window.open(banglaUrl, '_blank')
      }
    }

    // Function to handle external redirect for categories
    const redirectToBanglaCategory = (category: any) => {
      const categoryUrl = createBanglaCategoryUrl(category)
      if (categoryUrl !== '#') {
        window.open(categoryUrl, '_blank')
      }
    }

    // Function to redirect to main Bangla site
    const redirectToMainBangla = () => {
      if (banglaBaseUrl) {
        window.open(banglaBaseUrl, '_blank')
      }
    }

    const fetch = async () => {
      if (!banglaApiUrl) {
        console.error('Bangla API URL is not configured')
        return
      }

      loading.value = true
      try {
        const res = await $axios.$get(
          `${banglaApiUrl}/api/bn/home/top-story`
        )

        const data = res.original || {}

        // Process posts - we'll handle URLs in the template
        lead.value = data.leads && data.leads.length ? data.leads[0] : null
        column1.value = data.features || []
        column2.value = data.latest_news || []
        column3.value = data.reserved || []

      } catch (e) {
        console.error('Bangla section fetch failed:', e)
      } finally {
        loading.value = false
      }
    }

    // fetch only when visible
    const { stop } = useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting && banglaApiUrl) {
          fetch()
          stop()
        }
      },
      { rootMargin: '100px' }
    )

    return {
      target,
      loading,
      name,
      banglaBaseUrl,
      lead,
      column1,
      column2,
      column3,
      redirectToBanglaArticle,
      redirectToBanglaCategory,
      redirectToMainBangla,
      createBanglaArticleUrl,
      createBanglaCategoryUrl
    }
  },
  methods:{
    getContent: (post: Posts) => {
      return post.excerpt || post.content || ''
    }
  },
})
</script>

<template>
  <div
    id="home-category-bangla"
    ref="target"
    class="bg-bg2-light dark:bg-bg2-dark pb-8 pt-4"
  >
    <v-container>
      <!-- heading -->
      <div class="cursor-pointer" @click="redirectToMainBangla">
        <category-heading
          :name="name"
          :url="banglaBaseUrl || '#'"
        />
      </div>
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4 pb-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-6 mr-4 xl:mr-0 2xl:mr-0">
          <div v-if="lead" class="cursor-pointer" @click="redirectToBanglaArticle(lead)">
            <v-card
              :title="lead.title"
              :url="createBanglaArticleUrl(lead)"
              :image="lead.image"
              :category="lead.category"
              :datetime="lead.datetime"
              :text="getContent(lead)"
              class="mb-4"
            />
          </div>

          <div
            v-for="post in column1"
            :key="post.id"
            class="cursor-pointer"
            @click="redirectToBanglaArticle(post)"
          >
            <v-card
              :title="post.title"
              :url="createBanglaArticleUrl(post)"
              :category="post.category"
              :datetime="post.datetime"
              :text="getContent(post)"
              class="mb-4 last:mb-0"
            />
          </div>
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-6 mr-4 xl:mr-0 2xl:mr-0">
          <div
            v-for="post in column2"
            :key="post.id"
            class="cursor-pointer"
            @click="redirectToBanglaArticle(post)"
          >
            <category-media-left-right
              :title="post.title"
              :url="createBanglaArticleUrl(post)"
              :image-left="post.image"
              :category="post.category"
              :datetime="post.datetime"
              :text="getContent(post)"
              class="mb-4 last:mb-0"
            />
          </div>
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <section class="col-auto xl:col-span-3 grid grid-rows-1 gap-8">
          <v-ads v-if="ads1" :ads="ads1" />
          <client-only v-else>
            <Adsense
              ins-style="display:inline-block; width:100%; height: 400px;"
              data-ad-client="ca-pub-3438694616169600"
              data-ad-slot="2838794797"
              data-ad-format="auto"
            />
          </client-only>
        </section>
        <!-- column 3 -->
      </div>
      <!-- news -->

      <!-- extra section for column3 -->
      <div class="grid xl:grid-cols-4 gap-4 pt-4 mb-4">
        <article
          v-for="post in column3"
          :key="post.id"
          class="cursor-pointer"
          @click="redirectToBanglaArticle(post)"
        >
          <figure v-if="post.image">
            <v-img :src="post.image" :alt="post.title" />
          </figure>
          <div
            class="bg-op-light dark:bg-op-dark p-2 h-[9.3rem] overflow-hidden"
          >
            <div class="inline-block cursor-pointer" @click.stop="redirectToBanglaCategory(post.category)">
              <v-category :category="post.category" />
            </div>
            <v-heading
              class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
            >
              <span class="line-clamp-3 py-1.5 richmond-display-bold text-[21px]">
                {{ post.title }}
              </span>
            </v-heading>
            <p
              class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal"
              v-html="getContent(post)"
            ></p>
          </div>
        </article>
      </div>
    </v-container>
  </div>
</template>
