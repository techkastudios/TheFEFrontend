<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useContext,
  computed,
  watch,
} from '@nuxtjs/composition-api'
import { Posts } from '~/types/posts'
import { CategoryEconomy } from '~/types/category'
import { useAdsCategoryStore } from '~/store/ads/category'
import { useAdTrackStore } from '~/store/ads/adTrack'

export default defineComponent({
  name: 'CategoryHome',

  props: {
    category: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { $axios, i18n } = useContext()
    const adsStore = useAdsCategoryStore()
    const adTrackStore = useAdTrackStore()

    const name = ref()
    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

        // Track ad views when ads are loaded or change
    const trackAdViews = () => {
      if (adsStore.adsRight) {
        adTrackStore.trackAdView(Number(adsStore.adsRight.id))
      }
      if (adsStore.adsMain) {
        adTrackStore.trackAdView(Number(adsStore.adsMain.id))
      }
    }

    // Watch for ads changes
    watch(
      () => [adsStore.adsRight, adsStore.adsMain],
      () => {
        trackAdViews()
      }
    )

    useFetch(async () => {
      const category: CategoryEconomy = await $axios.$get(
        `api/${lang}/category/${props.category}/home`
      )
      name.value = category.name
      lead.value = category.featured
      posts.value = category.posts
      
      // Initial tracking after data is loaded
      trackAdViews()
    })

    // In your setup function:
    const handleAdClick = (adId: Number) => {
      adTrackStore.trackAdClick(Number(adId)) // Convert string to number
    }


    return {
      name,
      lead,
      posts,
      adsRight: computed(() => adsStore.adsRight),
      adsMain: computed(() => adsStore.adsMain),
      handleAdClick,
    }
  },
})
</script>

<template>
  <div id="category-home" class="bg-body-light dark:bg-body-dark py-8">
    <v-container>
      <!-- heading -->
      <v-heading :level="1" class="flex items-center font-bold uppercase text-3xl text-h2-light dark:text-h2-dark mb-4">
        {{ name }}
      </v-heading>
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-12">
          <article v-if="lead" class="grid grid-rows-3 xl:grid-rows-3">
            <div v-if="lead.image"
              class="row-span-2 row-end-3 col-span-full z-10 w-5/6 mx-auto ml-[1.3rem] xl:ml-[auto] xl:w-3/6">
              <nuxt-link :to="localePath(lead.slug)">
                <figure>
                  <v-img :src="lead.image" :alt="lead.title" />
                </figure>
              </nuxt-link>
            </div>
            <div
              class="bg-bg2-light dark:bg-bg2-dark px-4 mr-4 xl:mr-0 xl:px-16 text-center row-span-5 xl:row-span-3 row-start-2 xl:row-start-2 xl:row-end-4 col-span-full grid place-content-end justify-center">
              <div class="mt-24 xl:mt-40">
                <v-category :category="lead.category" class="justify-center mb-4" />
                <v-heading
                  class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-2xl xl:text-3xl text-center transition-colors hover:text-rose-600 dark:hover:text-rose-600">
                  <nuxt-link :to="localePath(lead.slug)" class="line-clamp-3">
                    {{ lead.title }}
                  </nuxt-link>
                </v-heading>
                <p class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-2 mb-4 merriweather-sans-normal" v-html="lead.excerpt"></p>
              </div>
            </div>
          </article>
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-3">
          <v-ads 
            v-if="adsRight" 
            :ads="adsRight" 
            @click="handleAdClick(adsRight.id)" 
          />
          <client-only v-else>
            <Adsense 
              data-ad-client="ca-pub-3438694616169600" 
              data-ad-slot="3025948319" 
              data-full-width-responsive="yes"
              is-new-ads-code="yes" 
              data-ad-format="auto" 
              ins-class="text-center mb-4" 
            />
          </client-only>
        </section>
        <!-- column 2 -->
      </div>
      <!-- news -->
      <div class="grid xl:grid-cols-4 gap-4 mt-4">
        <v-card v-for="post in posts" :key="post.id" :title="post.title" :url="post.slug" :image="post.image"
          :category="post.category" :datetime="post.datetime" :text="post.excerpt" class="mb-4 last:mb-0"></v-card>
      </div>

      <!-- ads -->
      <v-ads 
        v-if="adsMain" 
        :ads="adsMain" 
        @click="handleAdClick(adsMain.id)" 
      />
      <client-only v-else>
        <Adsense 
          data-ad-client="ca-pub-3438694616169600" 
          data-ad-slot="2838794797" 
          data-full-width-responsive="yes"
          is-new-ads-code="yes" 
          data-ad-format="auto" 
          ins-class="text-center mt-4" 
        />
      </client-only>
      <!-- ads -->
    </v-container>
  </div>
</template>