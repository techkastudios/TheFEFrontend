<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import CategoryHeading from '~/components/home/CategoryHeading.vue'
import CategoryPostTitle from '~/components/home/CategoryPostTitle.vue'
import { Posts } from '~/types/posts'
import { CategoryEconomy } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategoryEconomy',

  components: { CategoryHeading, CategoryPostTitle },

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
    const column2 = ref<Posts[]>([])
    const column3 = ref<Posts[]>([])
    const column4 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategoryEconomy = await $axios.$get<CategoryEconomy>(
          `api/${lang}/home/category-economy`
        )
        name.value = category.name
        slug.value = category.slug

        lead.value = category.featured
        column2.value = category.posts
        column3.value = category.titles
        column4.value = category.oped
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
      column2,
      column3,
      column4,
    }
  },
})
</script>

<template>
  <div id="home-category-economy" ref="target" class="bg-bg2-light dark:bg-bg2-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="name" :url="slug" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-6 bg-bg10-light dark:bg-bg2-dark mt-32">
          <article v-if="lead" class="grid grid-rows-5">
            <div class="row-span-2 row-end-3 col-span-full z-10 w-5/6 mx-auto -mt-32">
              <nuxt-link v-if="lead.image" :to="localePath(lead.slug)">
                <figure>
                  <v-img :src="lead.image" :alt="lead.title" />
                </figure>
              </nuxt-link>
            </div>
            <div
              class="bg-bg10-light dark:bg-bg10-dark px-8 py-8 xl:px-20 xl:py-16 text-center row-span-4 row-start-2 col-span-full grid place-content-end"
            >
              <v-category :category="lead.category" class="justify-center mb-4" />
              <v-heading
                class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-4xl text-center line-clamp-2 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
              >
                <nuxt-link :to="localePath(lead.slug)">{{ lead.title }}</nuxt-link>
              </v-heading>
              <p
                class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal"
                v-html="lead.excerpt"
              ></p>
            </div>
          </article>
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-3">
          <v-card
            v-for="post in column2"
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
        <!-- column 2 -->

        <!-- column 3 -->
        <category-post-title
          :posts="column3"
          class="col-auto xl:col-span-3 bg-bg10-light dark:bg-bg10-dark"
        />
        <!-- column 3 -->

        <!-- column 4 -->
        <section class="col-auto xl:col-span-3 bg-op-light dark:bg-op-dark">
          <header
            class="bg-bg7-light dark:bg-bg7-dark p-1.5 text-center uppercase font-bold text-lg text-white"
          >{{ $t('op_ed') }} | {{ name }}</header>
          <div class="p-2">
            <v-card
              v-for="post in column4"
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
        </section>
        <!-- column 4 -->
      </div>
      <!-- news -->
      <div class="mt-8">
        <!-- ads -->
        <v-ads v-if="ads" :ads="ads" class="text-center mt-4" />
        <client-only v-else>
          <Adsense
            data-ad-client="ca-pub-3438694616169600"
            data-ad-slot="4227835290"
            data-full-width-responsive="yes"
            is-new-ads-code="yes"
            data-ad-format="auto"
            ins-class="text-center mt-4"
          />
        </client-only>
        <!-- ads -->
      </div>
    </v-container>
  </div>
</template>
