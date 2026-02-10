<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useFetch,
  useContext,
  onMounted,
  useMeta,
  watch,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver, useWindowScroll } from '@vueuse/core'

import { Post, Posts } from '~/types/posts'
import CategoryPostTitle from '~/components/home/CategoryPostTitle.vue'
import CategoryMediaTopLeft from '~/components/home/CategoryMediaTopLeft.vue'
import { AdsPosition } from '~/types/ads'

export default defineComponent({
  name: 'PostSingle',

  components: { CategoryPostTitle, CategoryMediaTopLeft },

  setup() {
    const { $axios, params, i18n, $config } = useContext()
    const slug = computed(() => params.value.slug)

    const positions = ref<AdsPosition[]>([])

    const target = ref(null)
    const loading = ref(false)
    const post = ref<Post>()

    const relatedPosts = ref<Posts[]>([])
    const morePosts = ref<Posts[]>([])
    const posts = ref<Posts[]>([])
    const leadBottom = ref<Posts>()
    const column3 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'
    const category = params && params.value ? params.value.category : ''

    let apiUrl = `api/${lang}/post/${slug.value}`

    // TODO: Only bn category post call from 'en' API
    if (lang === 'bn' && category === 'bn') {
      apiUrl = `api/en/post/${slug.value}`
    }

    useFetch(async () => {
      post.value = await $axios.$get(apiUrl)
    })

    let baseUrl = `${$config.baseURL}`

    if (lang === 'bn') {
      baseUrl += '/bangla'
    }

    useMeta(() => ({
      title: `${post.value?.title} | The Financial Express`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: post.value?.excerpt || '',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: baseUrl + `${post.value?.slug}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: post.value?.meta_title || post.value?.title || '',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: post.value?.meta_description || post.value?.excerpt || '',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
          post.value?.metaImage || post.value?.image ||
            `${$config.baseURL}/the-financial-express.jpg`,
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '1200',
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '630',
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: baseUrl + `${post.value?.slug}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: post.value?.title || '',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: post.value?.excerpt || '',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content:
            post.value?.image || `${$config.baseURL}/the-financial-express.jpg`,
        },
      ],
    }))

    // section hendreller
    const { y } = useWindowScroll()
    watch(y, () => {
      // Visible handle of related single news
      const scrollHeight = y.value
      const element = document.getElementsByClassName('shadow-2xl')
      let nextIndex = 0
      let newContainerHeight = 0
      // calculation for visible next related news section
      Array.prototype.forEach.call(element, function (el, index) {
        const hasRelatedClass = el.classList.contains('related-news')
        if (!hasRelatedClass) {
          newContainerHeight = newContainerHeight + el.offsetHeight
          if (nextIndex === index) {
            // if (nextIndex > 0) {
            //   containerHeight = (el.offsetHeight - 800) * (index + 2)
            // }
            if (newContainerHeight - 800 < scrollHeight) {
              const nextElement = document.getElementById(
                'related-news-' + index
              )
              if (nextElement) {
                nextElement.classList.remove('related-news')
              }
            }
          }
          nextIndex = index + 1
        } else {
          return false
        }
      })
    })

    onMounted(async () => {
      const { data } = await $axios.$get(`api/revenue/single_news_page`)
      positions.value = data
      let morePostUrl = `api/${lang}/post-more/${slug.value}`

      // TODO: Only bn category post call from 'en' API
      if (lang === 'bn' && category === 'bn') {
        morePostUrl = `api/en/post-more/${slug.value}`
      }

      const items = await $axios.$get<Posts[]>(morePostUrl)
      relatedPosts.value = items
      posts.value = items.slice(0, 4)

      const mostReadPostUrl = `api/${lang}/post-most-read`

      // TODO: Only bn category post call from 'en' API
      // if (lang === 'bn' && category === 'bn') {
      //   mostReadPostUrl = `api/en/post-most-read`
      // }

      morePosts.value = await $axios.$get<Posts[]>(mostReadPostUrl)

      // Intersection Observer 'each article title' for single page
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            const postSlug = entry.target.getAttribute('slug') || ''
            const postTitle = entry.target.getAttribute('title') || ''

            // prevents browser from storing history with each change
            if (window.history.replaceState) {
              window.history.replaceState({}, postTitle, postSlug)
            }
          }
        })
      })
      // observe section header
      document.querySelectorAll('article h1').forEach((section) => {
        observer.observe(section)
      })
    })

    const fetch = async () => {
      loading.value = true
      try {
        const items: Posts[] = await $axios.$get('api-fake/posts?_limit=6')

        leadBottom.value = items[0]
        column3.value = items.slice(1, 6)
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

    const getAds = (array: AdsPosition[], section: string, name: string) =>
      array.find((_) => _.section === section && _.name === name)?.ads

    return {
      target,
      post,
      relatedPosts,
      morePosts,
      posts,
      leadBottom,
      column3,
      adsUnderSocialShare: computed(() =>
        getAds(positions.value, '1st_column', 'ad_under_social_share')
      ),
      adsUnderMainImage: computed(() =>
        getAds(positions.value, '2nd_column', 'under_the_post_image')
      ),
      adsInsideNews: computed(() => {
        return getAds(
          positions.value,
          '2nd_column',
          'inside_the_article_text_body'
        )
      }),
      adsBottomNews1: computed(() =>
        getAds(positions.value, '2nd_column', 'ad_at_the_end_of_the_article')
      ),
      adsBottomNews2: computed(() =>
        getAds(
          positions.value,
          '2nd_column',
          'ad_at_the_second_last_row_bottom_of_the_page'
        )
      ),
      adsBottomNews3: computed(() =>
        getAds(
          positions.value,
          '2nd_column',
          'ad_at_the_last_row_bottom_of_the_page'
        )
      ),
      adsRightSide1: computed(() =>
        getAds(positions.value, '3rd_column', 'above_more_news_section')
      ),
      adsRightSide2: computed(() => {
        return getAds(
          positions.value,
          '3rd_column',
          'ad_between_more_news_and_most_read_news'
        )
      }),
      adsRightSide3: computed(() =>
        getAds(positions.value, '3rd_column', 'ad_at_the_bottom_of_the_row')
      ),
    }
  },
  head: {},
})
</script>

<template>
  <div>
    <!-- Load Post -->
    <div class="shadow-2xl">
      <v-container class="pb-8 pt-4 xl:pt-8">
        <Post
          :post="post"
          :related-posts="relatedPosts"
          :more-posts="morePosts"
          post-type="main_single"
          :ads-under-social-share="adsUnderSocialShare"
          :ads-under-main-image="adsUnderMainImage"
          :ads-inside-news="adsInsideNews"
          :ads-bottom-news1="adsBottomNews1"
          :ads-bottom-news2="adsBottomNews2"
          :ads-bottom-news3="adsBottomNews3"
          :ads-right-side1="adsRightSide1"
          :ads-right-side2="adsRightSide2"
          :ads-right-side3="adsRightSide3"
        />
      </v-container>
    </div>
    <!-- Load Post -->

    <div
      v-for="(item, i) in posts"
      :key="i"
      class="shadow-2xl related-news"
      :id="'related-news-'+i"
    >
      <v-container class="py-8">
        <Post
          :post="item"
          :related-posts="relatedPosts"
          :more-posts="morePosts"
          :hide-in-mobile="true"
          :ads-under-social-share="adsUnderSocialShare"
          :ads-under-main-image="adsUnderMainImage"
          :ads-inside-news="adsInsideNews"
          :ads-bottom-news1="adsBottomNews1"
          :ads-bottom-news2="adsBottomNews2"
          :ads-bottom-news3="adsBottomNews3"
          :ads-right-side1="adsRightSide1"
          :ads-right-side2="adsRightSide2"
          :ads-right-side3="adsRightSide3"
        />
      </v-container>
    </div>

    <v-container ref="target">
      <!-- news -->
      <div class="hidden grid xl:grid-cols-4 gap-4 py-4">
        <!-- column 1 -->
        <section>
          <category-media-top-left
            v-if="leadBottom"
            :title="leadBottom.title"
            :media="`https://picsum.photos/300?random=${leadBottom.id}`"
            :text="leadBottom.body"
            bg-color="bg-bg2-light dark:bg-bg2-dark"
            class="mb-4 last:mb-0"
          />
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section>
          <category-media-top-left
            v-if="leadBottom"
            :title="leadBottom.title"
            :media="`https://picsum.photos/300?random=${leadBottom.id}`"
            :text="leadBottom.body"
            bg-color="bg-bg2-light dark:bg-bg2-dark"
            class="mb-4 last:mb-0"
          />
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <category-post-title :posts="column3" class="bg-bg2-light dark:bg-bg2-dark" />
        <!-- column 3 -->

        <!-- column 4 -->
        <section>
          <v-heading
            :level="2"
            class="font-bold uppercase text-lg xl:text-xl text-white bg-red-900 py-2 px-5 text-center"
          >
            <nuxt-link to="/">{{ $t('buttons.job_opportunities') }}</nuxt-link>
          </v-heading>
          <category-post-title
            :posts="column3"
            :heading-class="['text-h3-dark', 'dark:text-h3-dark']"
            class="bg-red-850"
          />
        </section>
        <!-- column 4 -->
      </div>
      <!-- news -->
    </v-container>

    <!-- YouthExpress Category -->
    <!-- <LazyHomeCategoryYouthExpress /> -->
    <!-- YouthExpress Category -->
  </div>
</template>

<style scoped>
.related-news {
  display: none;
}
</style>
