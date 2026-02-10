<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  PropType,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import { Posts } from '~/types/posts'
import { CategoryYouth } from '~/types/category'
import CategoryHeading from '~/components/home/CategoryHeading.vue'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategoryYouthExpress',
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

    const posts = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategoryYouth = await $axios.$get<CategoryYouth>(
          `api/${lang}/home/category-youth-and-entrepreneurship`
        )

        name.value = category.name
        slug.value = category.slug

        posts.value = category.posts
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
      posts,
      name,
      slug,
    }
  },
})
</script>

<template>
  <div id="home-category-youth-express" ref="target" class="bg-bg2-light dark:bg-bg2-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="name" :url="slug" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-flow-col gap-4 pb-4">
        <article v-for="post in posts" :key="post.id" class="grid grid-flow-row">
          <figure v-if="post.image">
            <v-img :src="post.image" :alt="post.title" />
          </figure>
          <div class="px-2 py-4 bg-gray-light dark:bg-gray-dark text-white">
            <v-category-time text="Youth Express" :to="'/'" color="lightpink" />
            <v-heading class="font-semibold text-white mb-2 text-xl line-clamp-5.5 line-clamp-3">
              <nuxt-link :to="localePath(post.slug)">{{
                post.title
              }}</nuxt-link>
            </v-heading>
            <p class="text-white text-base leading-5 line-clamp-3" v-html="post.excerpt"></p>
          </div>
        </article>
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
