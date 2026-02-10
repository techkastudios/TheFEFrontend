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
import { CategoryStock } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategoryStock',

  components: { CategoryHeading },

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

    const name = ref('')
    const slug = ref('/')

    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])
    const column1 = ref<Posts[]>([])
    // const column3 = ref<Posts[]>([])
    const column5 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategoryStock = await $axios.$get<CategoryStock>(
          `api/${lang}/home/category-stock`
        )
        name.value = category.name
        slug.value = category.slug

        lead.value = category.featured
        posts.value = category.posts
        column1.value = category.bangladesh
        column5.value = category.global
        // column3.value = category.oped
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
      name,
      slug,
      lead,
      posts,
      column1,
      // column3,
      column5,
    }
  },
})
</script>

<template>
  <div id="home-category-stock" ref="target" class="bg-bg2-light dark:bg-bg2-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="name" :url="slug" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-4 order-2 xl:order-none flex flex-col">
          <v-card
            v-for="post in column1"
            :key="post.id"
            :title="post.title"
            :url="post.slug"
            :image="post.image"
            :category="post.category"
            :datetime="post.datetime"
            :text="post.excerpt"
            class="mb-4 last:mb-0 flex-auto"
            textfixedheight="h-[8rem] clear-both overflow-hidden"
          ></v-card>
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-7 order-1 xl:order-none">
          <article v-if="lead" class="grid grid-rows-4">
            <div class="row-span-2 row-end-3 col-span-full z-10 w-5/6 mx-auto">
              <nuxt-link v-if="lead.image" :to="localePath(lead.slug)">
                <figure>
                  <v-img :src="lead.image" :alt="lead.title" />
                </figure>
              </nuxt-link>
            </div>
            <div
              class="bg-bg10-light dark:bg-bg10-dark px-8 xl:px-20 pb-20 pt-20 lg:pt-44 text-center row-span-3 row-start-2 col-span-full grid place-content-end"
            >
              <v-category :category="lead.category" class="justify-center mb-4" />
              <v-heading
                class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-4xl text-center line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
              >
                <nuxt-link :to="localePath(lead.slug)">{{ lead.title }}</nuxt-link>
              </v-heading>
              <p class="text-p-light dark:text-p-dark text-base leading-5 merriweather-sans-normal" v-html="lead.excerpt"></p>
            </div>
          </article>
          <div class="grid col-auto xl:grid-flow-col gap-4 xl:mt-4">
            <v-card
              v-for="post in posts"
              :key="post.id"
              :title="post.title"
              :url="post.slug"
              :image="post.image"
              :category="post.category"
              :datetime="post.datetime"
              :text="post.excerpt"
            ></v-card>
          </div>
        </section>
        <!-- column 4 -->

        <!-- column 5 -->
        <section class="col-auto xl:col-span-4 order-3 xl:order-none flex flex-col">
          <v-card
            v-for="post in column5"
            :key="post.id"
            :title="post.title"
            :url="post.slug"
            :image="post.image"
            :category="post.category"
            :datetime="post.datetime"
            :text="post.excerpt"
            class="mb-4 last:mb-0 flex-auto"
            textfixedheight="h-[8rem] clear-both overflow-hidden"
          ></v-card>
        </section>
        <!-- column 5 -->
      </div>
      <!-- news -->
      <div class="mt-8">
        <!-- ads -->
        <v-ads v-if="ads" :ads="ads" />
        <client-only v-else>
          <Adsense
            style="display:block"
            data-ad-client="ca-pub-3438694616169600"
            data-ad-slot="4227835290"
            data-ad-format="auto"
            data-full-width-responsive="yes"
            ins-class="text-center"
          />
        </client-only>
        <!-- ads -->
      </div>
    </v-container>
  </div>
</template>
