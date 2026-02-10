<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import { Posts } from '~/types/posts'
import { CategoryEconomy } from '~/types/category'
import { useAdsCategoryStore } from '~/store/ads/category'

export default defineComponent({
  name: 'CategorySingleParent',

  props: {
    category: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { $axios, i18n } = useContext()
    const adsStore = useAdsCategoryStore()

    const name = ref()
    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])

    const column1 = ref<Posts[]>([])
    const column2 = ref<Posts>()
    const column3 = ref<Posts[]>([])
    let lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    // For now 'en' will be selected language for bangla category all time.
    if (props.category === 'bangla') {
      lang = 'en'
    }

    useFetch(async () => {
      const category: CategoryEconomy = await $axios.$get(
        `api/${lang}/category/${props.category}/home`
      )

      name.value = category.name
      lead.value = category.featured
      posts.value = category.posts.slice(0, 4)

      column1.value = category.posts.slice(4, 6)
      column2.value = category.posts[6]
      column3.value = category.posts.slice(7, 9)
    })

    return {
      name,
      lead,
      posts,
      column1,
      column2,
      column3,
      adsRight: computed(() => adsStore.adsRight),
      adsMain: computed(() => adsStore.adsMain),
    }
  },
})
</script>

<template>
  <div id="category-Single-Parent" class="bg-body-light dark:bg-body-dark py-8">
    <v-container>
      <!-- heading -->
      <v-heading
        :level="1"
        class="flex items-center font-bold uppercase text-3xl text-h2-light dark:text-h2-dark mb-4"
      >{{ name }}</v-heading>
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4 mb-8">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-12">
          <!-- Lead post -->
          <div v-if="lead" class="pr-4 xl:pr-0">
            <div class="mx-auto z-10 w-5/6 xl:w-3/6">
              <nuxt-link v-if="lead.image" :to="localePath(lead.slug)">
                <figure>
                  <v-img :src="lead.image" :alt="lead.title" />
                </figure>
              </nuxt-link>
            </div>
            <div
              class="bg-bg2-light dark:bg-bg2-dark text-center z-20 -mt-48 px-4 xl:px-12 pb-8 pt-56"
            >
              <v-category :category="lead.category" class="justify-center mb-4" />
              <v-heading
                class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-2xl xl:text-4xl text-center transition-colors hover:text-rose-600 dark:hover:text-rose-600"
              >
                <nuxt-link :to="localePath(lead.slug)" class="line-clamp-3 py-1.5 richmond-display-bold text-[21px]">{{ lead.title }}</nuxt-link>
              </v-heading>
              <p
                class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal"
                v-html="lead.excerpt"
              ></p>
            </div>
          </div>
          <!-- Lead post -->
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-3">
          <v-ads v-if="adsRight" :ads="adsRight" />
          <client-only v-else>
            <Adsense
              data-ad-client="ca-pub-3438694616169600"
              data-ad-slot="2838794797"
              data-full-width-responsive="yes"
              is-new-ads-code="yes"
              data-ad-format="auto"
              ins-class="text-center mb-4"
            />
          </client-only>
        </section>
        <!-- column 2 -->
      </div>
      <div class="grid xl:grid-cols-4 gap-4 mt-4">
        <v-card
          v-for="post in posts"
          :key="post.id"
          :title="post.title"
          :url="post.slug"
          :image="post.image"
          :category="post.category"
          :datetime="post.datetime"
          :text="post.excerpt"
          class="mb-4 last:mb-0"
        ></v-card>
      </div>
      <!-- news -->

      <hr class="border-bg5-light dark:border-bg5-dark mt-8" />

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4 pb-4 mt-8">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-3">
          <v-card
            v-for="post in column1"
            :key="post.id"
            :title="post.title"
            :url="post.slug"
            :image="post.image"
            :category="post.category"
            :datetime="post.datetime"
            :text="post.excerpt"
            class="mb-4 last:mb-0"
          ></v-card>
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-9">
          <article v-if="column2" class="grid grid-rows-4">
            <div class="row-span-2 row-end-3 col-span-full z-10 w-5/6 mx-auto">
              <nuxt-link v-if="column2.image" :to="localePath(column2.slug)">
                <figure>
                  <v-img :src="column2.image" :alt="column2.title" />
                </figure>
              </nuxt-link>
            </div>
            <div
              class="bg-bg1-light dark:bg-bg1-dark px-4 xl:px-14 text-center col-span-full grid place-content-end"
            >
              <v-category :category="column2.category" class="justify-center mb-4" />
              <v-heading
                class="font-semibold text-h3-light dark:text-h3-dark text-xl xl:text-4xl text-center transition-colors hover:text-rose-600 dark:hover:text-rose-600"
              >
                <nuxt-link :to="column2.slug" class="line-clamp-3">{{ column2.title }}</nuxt-link>
              </v-heading>
              <p
                class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal"
              >{{ column2.excerpt }}</p>
            </div>
          </article>
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <section class="col-auto xl:col-span-3">
          <v-card
            v-for="post in column3"
            :key="post.id"
            :title="post.title"
            :url="post.slug"
            :image="post.image"
            :category="post.category"
            :datetime="post.datetime"
            :text="post.excerpt"
            class="mb-4 last:mb-0"
          ></v-card>
        </section>
        <!-- column 3 -->
      </div>
      <!-- news -->

      <!-- ads -->
      <div class="mt-8">
        <v-ads v-if="adsMain" :ads="adsMain" />
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
      </div>
      <!-- ads -->
    </v-container>
  </div>
</template>
