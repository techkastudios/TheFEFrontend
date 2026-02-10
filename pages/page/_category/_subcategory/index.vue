<script lang="ts">
import {
  computed,
  defineComponent,
  useRoute,
  useContext,
  ref,
  useFetch,
  watchEffect,
} from '@nuxtjs/composition-api'
import {
  useIntersectionObserver,
  useWindowScroll,
  useWindowSize,
} from '@vueuse/core'
import { SubCategory } from '~/types/category'
import { PostPagination, Posts } from '~/types/posts'

export default defineComponent({
  name: 'SubCategory',
  setup() {
    const route = useRoute()
    const category = computed(() => route.value.params.category)
    const subcategory = computed(() => route.value.params.subcategory)
    const target = ref()
    const loading = ref(false)

    const { $axios, i18n } = useContext()
    const name = ref()
    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])

    const morePosts = ref<Array<Posts[]>>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    useFetch(async () => {
      const url = `api/${lang}/subcategory/home?slug=${category.value}/${subcategory.value}`
      const item: SubCategory = await $axios.$get(url)

      name.value = item.name
      lead.value = item.featured
      posts.value = item.posts
    })

    const nextPageUrl = ref('')
    const hasPages = ref(false)

    const fetch = async () => {
      loading.value = true
      try {
        const url = `api/${lang}/subcategory/more?slug=${category.value}/${subcategory.value}`
        const response = await $axios.$get<PostPagination>(url)

        morePosts.value.push(response.items)
        nextPageUrl.value =
          response.nextPageUrl + `&slug=${category.value}/${subcategory.value}`
        hasPages.value = response.hasPages
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

    const { y } = useWindowScroll()
    const { height } = useWindowSize()
    watchEffect(async () => {
      const targetBottom =
        (target.value?.clientHeight || 0) + (target.value?.offsetTop || 0)
      const windowBottom = height.value + y.value

      if (targetBottom - windowBottom <= 100) {
        if (!loading.value && hasPages.value) {
          loading.value = true
          try {
            const res: PostPagination = await $axios.$get(nextPageUrl.value)
            morePosts.value.push(res.items)
            nextPageUrl.value =
              res.nextPageUrl + `&slug=${category.value}/${subcategory.value}`
            hasPages.value = res.hasPages
          } catch (e) {
          } finally {
            loading.value = false
          }
        }
      }
    })

    return {
      name,
      lead,
      posts,
      target,
      morePosts,
    }
  },
})
</script>

<template>
  <div id="subcategory" class="py-8">
    <div class="shadow-2xl">
      <v-container class="pb-8">
        <v-heading :level="2" class="font-bold font-heading uppercase text-xl text-white bg-gray py-2 px-5 mb-4">
          {{ name }}
        </v-heading>

        <article v-if="lead" class="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <figure v-if="lead.image">
            <v-img :src="lead.image" :alt="lead.title" />
          </figure>
          <div class="bg-bg2-light dark:bg-bg2-dark p-2">
            <v-category :category="lead.category" class="mb-4" />
            <v-heading class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-4xl">
              <nuxt-link :to="localePath(lead.slug)" class="line-clamp-3">
                {{ lead.title }}
              </nuxt-link>
            </v-heading>
            <p class="text-p-light dark:text-p-dark text-base leading-5 line-clamp-5 merriweather-sans-normal" v-html="lead.excerpt"></p>
          </div>
        </article>

        <hr class="border-bg5-light dark:border-bg5-dark my-8" />

        <!-- column 1 -->
        <section class="grid grid-cols-1 xl:grid-cols-4 gap-4">
          <article v-for="post in posts" :key="post.id" class="flex flex-col">
            <figure v-if="post.image">
              <v-img :src="post.image" :alt="post.title" />
            </figure>
            <div class="bg-bg2-light dark:bg-bg2-dark p-2 flex-auto">
              <v-category :category="post.category" class="mb-4" />
              <v-heading class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-xl">
                <nuxt-link :to="localePath(post.slug)" class="line-clamp-3">
                  {{ post.title }}
                </nuxt-link>
              </v-heading>
              <p class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal" v-html="post.excerpt"></p>
            </div>
          </article>
        </section>
        <!-- column 1 -->
      </v-container>
    </div>
    <!-- more posts -->
    <section ref="target">
      <div v-for="(items, i) in morePosts" :key="i" class="shadow-2xl">
        <v-container class="py-8">
          <LazySubCategoryMore :posts="items" />
        </v-container>
      </div>
    </section>
    <!-- more posts -->
  </div>
</template>
