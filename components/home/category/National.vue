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
import CategoryColumnHeading from '~/components/home/CategoryColumnHeading.vue'
import CategoryPostTitle from '~/components/home/CategoryPostTitle.vue'
import { CategoryNational } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategoryNational',

  components: { CategoryHeading, CategoryColumnHeading, CategoryPostTitle },

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
    const column1 = ref<Posts[]>([])
    const column3 = ref<Posts[]>([])
    const column4 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en';

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategoryNational = await $axios.$get<CategoryNational>(
          `api/${lang}/home/category-national`
        )

        name.value = category.name
        slug.value = category.slug

        column1.value = category.national
        lead.value = category.featured
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
      column1,
      lead,
      column3,
      column4,
    }
  },
})
</script>

<template>
  <div id="home-category-national" ref="target" class="bg-bg1-light dark:bg-bg1-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="name" :url="slug" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4 pb-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-3 divide-y divide-bg2-light dark:divide-bg2-dark">
          <v-card v-for="post in column1" :key="post.id" :title="post.title" :url="post.slug" :category="post.category"
            :datetime="post.datetime" :text="post.excerpt" class="pt-4 pb-4 first:pt-0 last:pb-0"></v-card>
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-6">
          <div class="mt-4 px-4">
            <category-column-heading name="Politics" />
            <v-card v-if="lead" :key="lead.id" :title="lead.title" :url="lead.slug" :image="lead.image"
              :category="lead.category" :datetime="lead.datetime" :text="lead.excerpt" class="mb-4 last:mb-0"></v-card>
          </div>
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <section class="col-auto xl:col-span-3 bg-bg2-light dark:bg-bg2-dark">
          <v-heading :level="2" class="font-bold uppercase text-xl text-blue-850 dark:text-white py-2 px-5">
            <nuxt-link to="/" class="flex items-center">
              <span class="mr-5">{{ $t('buttons.country_Crime') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="21" viewBox="0 0 16 21" class="fill-current">
                <path id="Polygon_2" data-name="Polygon 2" d="M10.5,0,21,16H0Z" transform="translate(16) rotate(90)" />
              </svg>
            </nuxt-link>
          </v-heading>
          <category-post-title :posts="column3" />
        </section>
        <!-- column 3 -->

        <!-- column 5 -->
        <section class="col-auto xl:col-span-3 bg-op-light dark:bg-op-dark">
          <header class="bg-bg7-light dark:bg-bg7-dark p-1.5 text-center uppercase font-bold text-lg text-white">
            {{ $t('op_ed') }} | {{ name }}
          </header>
          <div v-if="column4.length > 0" class="p-2">
            <v-card :title="column4[0].title" :url="column4[0].slug" :image="column4[0].image"
              :category="column4[0].category" :datetime="column4[0].datetime" :text="column4[0].excerpt"
              class="mb-4"></v-card>
            <template v-if="column4[1]">
              <v-card :title="column4[1].title" :url="column4[1].slug" :category="column4[1].category"
                :datetime="column4[1].datetime" :text="column4[1].excerpt"></v-card>
            </template>
          </div>
        </section>
        <!-- column 5 -->
      </div>
      <!-- news -->

      <!-- ads -->
      <v-ads v-if="ads" :ads="ads" />
      <client-only v-else>
        <Adsense data-ad-client="ca-pub-3438694616169600" data-ad-slot="2838794797" data-full-width-responsive="yes"
          is-new-ads-code="yes" data-ad-format="auto" ins-class="text-center mt-8" />
      </client-only>
      <!-- ads -->
    </v-container>
  </div>
</template>
