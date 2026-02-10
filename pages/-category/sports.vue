<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'
import { useAdsCategoryStore } from '~/store/ads/category'
import CategoryPostTitle from '~/components/home/CategoryPostTitle.vue'
import CategoryMediaLeftRight from '~/components/category/MediaLeftRight.vue'
import { CategorySportPost, Posts } from '~/types/posts'
import VSlider from '~/components/VSlider.vue'

export default defineComponent({
  name: 'CategorySports',
  components: { CategoryPostTitle, CategoryMediaLeftRight, VSlider },
  setup() {
    const { $axios, i18n } = useContext()
    const adsStore = useAdsCategoryStore()

    const name = ref()
    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])

    const column1 = ref<Posts[]>([])
    const column2 = ref<Posts[]>([])

    const loading = ref(false)
    const moreLead = ref<Posts>()
    const morePosts = ref<Posts[]>([])

    const moreTarget = ref<HTMLElement | null>(null)
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'
    useFetch(async () => {
      const url = `api/${lang}/category/sports/home`
      const category: CategorySportPost = await $axios.$get(url)

      name.value = category.name
      lead.value = category.featured
      posts.value = category.displayed
      column1.value = category.posts
      column2.value = category.titles
    })

    const fetch = async () => {
      loading.value = true
      try {
        const url = `api/${lang}/category/sports/more`
        const response = await $axios.$get<CategorySportPost>(url)

        moreLead.value = response.featured
        morePosts.value = response.posts
      } finally {
        loading.value = false
      }
    }

    const { stop } = useIntersectionObserver(
      moreTarget,
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
      name,
      lead,
      posts,
      column1,
      column2,
      moreLead,
      morePosts,
      moreTarget,
      adsChild1: computed(() => adsStore.adsChild1),
      adsChild2: computed(() => adsStore.adsChild2),
      defaultSlideToShow: 2,
    }
  },
})
</script>

<template>
  <div id="category" class="bg-bg1-light dark:bg-bg1-dark">
    <div class="bg-black py-4">
      <v-container>
        <div class="grid grid-cols-1 xl:grid-cols-16 xl:grid-rows-2 xl:grid-flow-col-dense gap-4">
          <article v-for="(post, index) in posts" :key="post.id" :class="
            index === 2
              ? 'col-auto xl:col-span-8 xl:row-span-2'
              : 'col-auto xl:col-span-4'
          ">
            <nuxt-link :to="localePath(post.slug)">
              <figure v-if="post.image" class="relative">
                <v-img :src="post.image" :alt="post.caption || post.title" />
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
                <figcaption class="absolute bottom-3 left-0 right-0">
                  <v-heading
                    class="font-semibold text-white text-base xl:text-lg leading-5 text-center transition-colors hover:text-rose-600 dark:hover:text-rose-600 line-clamp-2 px-4">
                    {{ post.title }}
                  </v-heading>
                </figcaption>
              </figure>
            </nuxt-link>
          </article>
        </div>
      </v-container>
    </div>

    <v-container>
      <div class="w-full h-0.5 bg-bg5-light dark:bg-bg5-dark my-8" />

      <div class="grid grid-cols-1 xl:grid-cols-16 gap-4">
        <section class="col-auto xl:col-span-7">
          <article v-if="lead">
            <nuxt-link v-if="lead.image" :to="localePath(lead.slug)">
              <figure class="mb-2">
                <v-img :src="lead.image" :alt="lead.caption" />
              </figure>
            </nuxt-link>
            <v-heading
              class="font-semibold text-h3-light dark:text-h3-dark text-xl xl:text-2xl transition-colors hover:text-rose-600 dark:hover:text-rose-600">
              <nuxt-link :to="localePath(lead.slug)" class="line-clamp-3">
                {{ lead.title }}
              </nuxt-link>
            </v-heading>
          </article>
        </section>
        <section class="col-auto xl:col-span-5 divide-y-2 divide-bg5-light dark:divide-bg5-dark xl:divide-y-0">
          <category-media-left-right v-for="post in column1" :key="post.id" :title="post.title" :url="post.slug"
            :image-left="post.image" :reporter="post.reporter" class="py-2 xl:py-0 xl:mb-2 last:mb-0" />
        </section>
        <section class="col-auto xl:col-span-4">
          <header class="bg-bg5-light dark:bg-bg5-dark py-1.5 px-4 uppercase font-bold text-lg text-white">
            {{ $t('more') }}
          </header>
          <category-post-title :posts="column2" class="bg-bg2-light dark:bg-bg2-dark" />
        </section>
      </div>
      <div class="w-full h-0.5 bg-bg5-light dark:bg-bg5-dark my-8" />

      <!-- ads -->
      <v-ads v-if="adsChild1" :ads="adsChild1" class="mb-4" />
      <client-only v-else>
        <Adsense data-ad-client="ca-pub-3438694616169600" data-ad-slot="2838794797" data-full-width-responsive="yes"
          is-new-ads-code="yes" data-ad-format="auto" ins-class="text-center my-4" />
      </client-only>
      <!-- ads -->
    </v-container>

    <v-container>
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <LazyCategorySubChildInfinite title="Cricket" endpoint="sports/cricket" />
        <LazyCategorySubChildInfinite title="Football" endpoint="sports/football" />
      </div>

      <!-- ads -->
      <v-ads v-if="adsChild2" :ads="adsChild2" class="my-4" />
      <client-only v-else>
        <Adsense data-ad-client="ca-pub-3438694616169600" data-ad-slot="2838794797" data-full-width-responsive="yes"
          is-new-ads-code="yes" data-ad-format="auto" ins-class="text-center my-4" />
      </client-only>
      <!-- ads -->

      <div ref="moreTarget" class="pb-8">
        <header class="bg-black p-1.5 text-center uppercase font-bold text-lg text-white mb-5">
          <nuxt-link to="/page/sports/more-sports">More Sports</nuxt-link>
        </header>
        <div class="grid grid-cols-1 xl:grid-cols-16 gap-4">
          <div class="col-auto xl:col-span-7">
            <article v-if="moreLead">
              <nuxt-link v-if="moreLead.image" :to="localePath(moreLead.slug)">
                <figure class="mb-2">
                  <v-img :src="moreLead.image" :alt="moreLead.caption" />
                </figure>
              </nuxt-link>
              <div class="min-h-[5rem]">
                <v-heading
                  class="font-semibold text-h3-light dark:text-h3-dark text-xl xl:text-2xl transition-colors hover:text-rose-600 dark:hover:text-rose-600">
                  <nuxt-link :to="localePath(moreLead.slug)" class="line-clamp-3">
                    {{ moreLead.title }}
                  </nuxt-link>
                </v-heading>
                <p v-if="moreLead.reporter" class="text-p-light dark:text-p-dark text-xs opacity-90">
                  <nuxt-link :to="'/'">
                    {{ moreLead.reporter.name }}
                  </nuxt-link>
                </p>
              </div>
            </article>
          </div>
          <div class="col-auto xl:col-span-9">
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <article v-for="post in morePosts" :key="post.id" class="col-auto">
                <nuxt-link v-if="post.image" :to="localePath(post.slug)">
                  <figure class="mb-2">
                    <v-img :src="post.image" :alt="post.caption" />
                  </figure>
                </nuxt-link>
                <v-heading
                  class="font-semibold text-h3-light dark:text-h3-dark text-base transition-colors hover:text-rose-600 dark:hover:text-rose-600">
                  <nuxt-link :to="localePath(post.slug)" class="line-clamp-3">
                    {{ post.title }}
                  </nuxt-link>
                </v-heading>
                <p v-if="post.reporter" class="text-p-light dark:text-p-dark text-xs opacity-90">
                  <nuxt-link :to="'/'">
                    {{ post.reporter.name }}
                  </nuxt-link>
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </v-container>
    <v-container>
      <v-slider category="sports" :slidestoshow="defaultSlideToShow" />
    </v-container>
  </div>
</template>
