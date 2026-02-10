<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
// import { useAdsViewsStore } from '~/store/ads/views'
import { useAdsCategoryStore } from '~/store/ads/category'
import CategoryViewsReview from '~/components/category/views/Review.vue'
import CategoryViewsOpinions from '~/components/category/views/Opinions.vue'
import CategoryViewsColumns from '~/components/category/views/Columns.vue'
import CategoryViewsAnalysis from '~/components/category/views/Analysis.vue'
import CategoryViewsLetters from '~/components/category/views/Letters.vue'
import CategoryViewsEconomicTrends from '~/components/category/views/EconomicTrends.vue'
import { Posts, CategorySportPost } from '~/types/posts'

export default defineComponent({
  name: 'CategoryViews',

  components: {
     CategoryViewsReview,
    CategoryViewsOpinions,
    CategoryViewsColumns,
    CategoryViewsAnalysis,
    CategoryViewsLetters,
    CategoryViewsEconomicTrends,
  },

  setup() {
    const { $axios, i18n } = useContext()
    // const adsStore = useAdsViewsStore()
    const adsStore = useAdsCategoryStore()

    // load ads
    // adsStore.getViewsPageAds()

    const name = ref()
    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    useFetch(async () => {
      const url = `api/${lang}/category/views/home`
      const category: CategorySportPost = await $axios.$get(url)

      name.value = category.name
      lead.value = category.featured
      posts.value = category.posts
    })

    return {
      lead,
      posts,
      adsChild1: computed(() => adsStore.adsChild1),
      adsChild2: computed(() => adsStore.adsChild2),
      adsChild3: computed(() => adsStore.adsChild3),
      adsChild4: computed(() => adsStore.adsChild4),
      adsChild5: computed(() => adsStore.adsChild5),
      // mainAds: computed(() => adsStore.mainAds),
      // reviewsAds: computed(() => adsStore.reviewsAds),
      // opinionsAds: computed(() => adsStore.opinionsAds),
      // columnsAds: computed(() => adsStore.columnsAds),
      // analysisAds: computed(() => adsStore.analysisAds),
      // lettersAds: computed(() => adsStore.lettersAds),
      // economicTrendsAndInsightsAds: computed(
      //   () => adsStore.economicTrendsAndInsightsAds
      // ),
      childs: [
        {
          id: 1,
          title: 'Views',
          key: 'views',
          slug: '/page/views/views',
        },
        {
          id: 2,
          title: 'Reviews',
          key: 'reviews',
          slug: '/page/views/reviews',
        },
        {
          id: 3,
          title: 'Opinions',
          key: 'opinions',
          slug: '/page/views/opinions',
        },
        {
          id: 4,
          title: 'Columns',
          key: 'columns',
          slug: '/page/views/columns',
        },
        {
          id: 5,
          title: 'Analysis',
          key: 'analysis',
          slug: '/page/views/analysis',
        },
        {
          id: 6,
          title: 'Letters',
          key: 'letters',
          slug: '/page/views/letters',
        },
        {
          id: 7,
          title: 'Economic Trends and Insights',
          key: 'economic-trends-and-insights',
          slug: '/page/views/economic-trends-and-insights',
        },
      ],
    }
  },
})
</script>

<template>
  <div id="category" class="py-11">
    <v-container>
      <div class="grid grid-cols-1 xl:grid-cols-16 gap-4 pb-8">
        <div class="col-auto xl:col-span-3">
          <ul class="space-y-1.5">
            <li v-for="child in childs" :key="child.id">
              <a
                :href="`#${child.key}`"
                class="block font-bold text-xs uppercase px-2 py-2 bg-bg2-light dark:bg-bg2-dark"
                >{{ child.title }}</a
              >
            </li>
          </ul>
        </div>
        <div
          class="col-auto xl:col-span-12 grid grid-cols-1 xl:grid-cols-12 gap-x-4 gap-y-4 xl:gap-y-8 place-content-stretch"
        >
          <article
            v-if="lead"
            class="col-auto xl:col-span-9 grid grid-cols-1 xl:grid-cols-9 border-t-2 border-bg7-light dark:border-bg7-dark"
          >
            <div
              class="col-auto xl:col-span-3 bg-bg2-light dark:bg-bg2-dark p-2"
            >
              <v-heading
                class="font-semibold text-h3-light dark:text-h3-dark text-xl xl:text-2xl transition-colors hover:text-rose-600 dark:hover:text-rose-600"
              >
                <nuxt-link :to="localePath(lead.slug)" class="line-clamp-6">{{
                  lead.title
                }}</nuxt-link>
              </v-heading>
              <p
                class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal"
                v-html="lead.excerpt"
              ></p>
            </div>

            <nuxt-link
              v-if="lead.image"
              :to="localePath(lead.slug)"
              class="col-auto xl:col-span-6"
            >
              <figure>
                <v-img :src="lead.image" :alt="lead.caption" />
              </figure>
            </nuxt-link>
          </article>
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
                <nuxt-link :to="localePath(post.slug)" class="line-clamp-3">{{
                  post.title
                }}</nuxt-link>
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
      </div>
      <div>
        <v-ads v-if="adsChild1" :ads="adsChild1" />
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
    <!-- <div class="w-full h-0.5 bg-bg5-light dark:bg-bg5-dark mt-3" /> -->

    <!-- Child Category -->
    <!-- <category-views-views
      category="views"
      subcategory="views"
      url="/page/views/views"
      :ads="adsChild2"
    /> -->
    <div class="w-full h-0.5 bg-bg5-light dark:bg-bg5-dark mt-3" />

    <!-- Child Category -->
    <category-views-review
      category="views"
      subcategory="reviews"
      url="/page/views/reviews"
      :ads="adsChild2"
    />
    <!-- Child Category -->

    <div class="w-full h-0.5 bg-bg5-light dark:bg-bg5-dark" />

    <!-- Child Category -->
    <category-views-opinions
      category="opinions"
      subcategory="opinions"
      url="/page/views/opinions"
      :ads="adsChild3"
    />
    <!-- Child Category -->

    <div class="w-full h-0.5 bg-bg5-light dark:bg-bg5-dark" />

    <!-- Child Category -->
    <category-views-columns
      category="columns"
      subcategory="columns"
      url="/page/views/columns"
      :ads="adsChild4"
    />
    <!-- Child Category -->

    <div class="w-full h-0.5 bg-bg5-light dark:bg-bg5-dark" />

    <!-- Child Category -->
    <category-views-analysis
      category="analysis"
      subcategory="analysis"
      url="/page/views/analysis"
      :ads="adsChild5"
    />
    <!-- Child Category -->

    <div class="w-full h-0.5 bg-bg5-light dark:bg-bg5-dark" />

    <!-- Child Category -->
    <category-views-letters
      category="letters"
      subcategory="letters"
      url="/page/views/letters"
      :ads="adsChild1"
    />
    <!-- Child Category -->

    <div class="w-full h-0.5 bg-bg5-light dark:bg-bg5-dark" />

    <!-- Child Category -->
    <category-views-economic-trends
      category="economic-trends-and-insights"
      subcategory="Economic Trends and Insights"
      url="/page/views/economic-trends-and-insights"
      :ads="adsChild4"
    />
    <!-- Child Category -->
  </div>
</template>
