<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  PropType,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import { Posts } from '~/types/posts'
import CategoryHeading from '~/components/home/CategoryHeading.vue'
import CategoryPostTitle from '~/components/home/CategoryPostTitle.vue'
import { CategoryFinance } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategoryFinance',
  components: {
    CategoryHeading,
    CategoryPostTitle,
  },
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
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en';

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategoryFinance = await $axios.$get<CategoryFinance>(
          `api/${lang}/home/category-personal-finance`
        )
        name.value = category.name
        slug.value = category.slug

        lead.value = category.featured
        column2.value = category.posts.slice(1, 3)
        column3.value = category.posts.slice(3, 9)
        column4.value = category.titles
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
      name,
      slug,
    }
  },
})
</script>

<template>
  <div id="home-category-finance" ref="target" class="bg-bg1-light dark:bg-bg1-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="name" :url="slug" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4 pb-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-6">
          <article v-if="lead" class="grid grid-rows-4 mb-4">
            <div class="row-span-2 row-end-3 col-span-full z-10 w-5/6 mx-auto">
              <figure v-if="lead.image">
                <v-img :src="lead.image" />
              </figure>
            </div>
            <div
              class="bg-bg2-light dark:bg-bg2-dark row-span-3 row-start-2 col-span-full flex flex-col justify-end items-start p-3 pt-20">
              <v-category-time text="Economy" to="/" color="blue" class="justify-center" />
              <v-heading class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-2xl line-clamp-3">
                <nuxt-link :to="localePath(`${lead.slug}`)">
                  {{ lead.title }}
                </nuxt-link>
              </v-heading>
              <p class="text-p-light dark:text-p-dark text-base leading-5 merriweather-sans-normal" v-html="lead.excerpt"></p>
            </div>
          </article>

          <v-card v-for="post in column2" :key="post.id" :category="post.category" :title="post.title"
            :text="post.excerpt" class="mb-4 last:mb-0" />
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-6 grid grid-rows-3 grid-cols-2 gap-x-4">
          <v-card v-for="post in column3" :key="post.id" :title="post.title" :category="post.category" :image="post.image"
            :text="post.excerpt" class="mb-4 last:mb-0" />
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <category-post-title :posts="column4" class="bg-bg2-light dark:bg-bg2-dark col-auto xl:col-span-3" />
        <!-- column 3 -->
      </div>
      <!-- news -->
      <!-- ads -->
      <div class="mt-8">
        <v-ads v-if="ads" :ads="ads" />
        <client-only v-else>
          <Adsense data-ad-client="ca-pub-3438694616169600" data-ad-slot="2838794797" data-full-width-responsive="yes"
            is-new-ads-code="yes" data-ad-format="auto" ins-class="text-center mt-8" />
        </client-only>
      </div>
      <!-- ads -->
    </v-container>
  </div>
</template>
