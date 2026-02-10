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
import { CategoryTrade } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategoryTrade',

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
    const { $axios, i18n } = useContext()
    const target = ref(null)
    const loading = ref(false)

    const name = ref('')
    const slug = ref('/')

    const lead = ref<Posts>()
    const column1 = ref<Posts[]>([])
    const column2 = ref<Posts[]>([])
    const column3 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategoryTrade = await $axios.$get<CategoryTrade>(
          `api/${lang}/home/category-trade`
        )
        name.value = category.name
        slug.value = category.slug

        lead.value = category.featured
        column1.value = category.posts
        column2.value = category.mostRead
        column3.value = category.oped
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
      column1,
      column2,
      column3,
    }
  },
})
</script>

<template>
  <div id="home-category-trade" ref="target" class="bg-bg2-light dark:bg-bg2-dark pb-8">
    <v-container class="pb-8">
      <!-- <hr class="border-bg6-light dark:border-bg6-dark" /> -->
    </v-container>
    <v-container>
      <!-- heading -->
      <category-heading :name="name" :url="slug" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4 pb-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-6 mr-4 xl:mr-0">
          <v-card
            v-if="lead"
            :title="lead.title"
            :url="lead.slug"
            :image="lead.image"
            :category="lead.category"
            :datetime="lead.datetime"
            :text="lead.excerpt"
            class="mb-4"
          ></v-card>
          <v-card
            v-for="post in column1"
            :key="post.id"
            :title="post.title"
            :url="post.slug"
            :category="post.category"
            :datetime="post.datetime"
            :text="post.excerpt"
            class="mb-4 last:mb-0"
          ></v-card>
        </section>
        <!-- column 1 -->

        <!-- column 2 -->
        <section class="col-auto xl:col-span-5 mr-4 xl:mr-0">
          <category-media-left-right
            v-for="post in column2"
            :key="post.id"
            :title="post.title"
            :url="post.slug"
            :image-left="post.image"
            :category="post.category"
            :datetime="post.datetime"
            :text="post.excerpt"
            class="mb-4 last:mb-0"
          />
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <section class="col-auto xl:col-span-4 grid grid-rows-2 gap-8">
          <v-ads v-if="ads1" :ads="ads1" />
          <client-only v-else>
            <Adsense
              ins-style="display:inline-block; width:100%; height: 450px;"
              data-ad-client="ca-pub-3438694616169600"
              data-ad-slot="2838794797"
              data-ad-format="fluid"
            />
          </client-only>
          <v-ads v-if="ads2" :ads="ads2" />
          <client-only v-else>
            <Adsense
              ins-style="display:inline-block; width:100%; height: 450px;"
              data-ad-client="ca-pub-3438694616169600"
              data-ad-slot="2838794797"
              data-ad-format="fluid"
            />
          </client-only>
        </section>
        <!-- column 3 -->
      </div>
      <!-- news -->

      <!-- news -->
      <header
        class="bg-bg7-light dark:bg-bg7-dark p-1.5 text-center uppercase font-bold text-lg text-white"
      >{{ $t('op_ed') }} | {{ name }}</header>
      <div class="grid xl:grid-cols-4 gap-4 pt-4 mb-4">
        <article v-for="post in column3" :key="post.id">
          <nuxt-link v-if="post.image" :to="localePath(post.slug)">
            <figure>
              <v-img :src="post.image" :alt="post.title" />
            </figure>
          </nuxt-link>
          <div class="bg-op-light dark:bg-op-dark p-2 h-[9rem] overflow-hidden">
            <v-category :category="post.category" />
            <v-heading
              class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-6 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
            >
              <nuxt-link :to="localePath(post.slug)" class="line-clamp-3 py-1.5 richmond-display-bold text-[21px]">{{ post.title }}</nuxt-link>
            </v-heading>
            <p
              class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal"
              v-html="post.excerpt"
            ></p>
          </div>
        </article>
      </div>
      <!-- news -->

      <!-- ads -->
      <v-ads v-if="ads3" :ads="ads3" />
      <client-only v-else>
        <Adsense
          data-ad-client="ca-pub-3438694616169600"
          data-ad-slot="2838794797"
          data-full-width-responsive="yes"
          is-new-ads-code="yes"
          data-ad-format="auto"
          ins-class="text-center mt-8"
        />
      </client-only>
      <!-- ads -->
    </v-container>
  </div>
</template>
