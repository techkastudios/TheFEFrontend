<script lang="ts">
import {
  computed,
  defineComponent,
  useRoute,
  useContext,
  ref,
  watchEffect,
  onMounted,
} from '@nuxtjs/composition-api'
import {
  useIntersectionObserver,
  useWindowScroll,
  useWindowSize,
} from '@vueuse/core'
import { PostPagination, Posts } from '~/types/posts'

export default defineComponent({
  name: 'ReporterPost',
  setup() {
    const route = useRoute()
    const reporterName = computed(() => route.value.params.username)
    const target = ref()
    const loading = ref(false)

    const { $axios, i18n } = useContext()
    const name = ref()
    const email = ref()
    const avatar = ref()
    const posts = ref<Posts[]>([])

    const morePosts = ref<Array<Posts[]>>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    onMounted(async () => {
      const url = `api/${lang}/reporter/${reporterName.value}`
      const item = await $axios.$get(url)

      name.value = item.name
      email.value = item.email
      avatar.value = item.avatar
      posts.value = item.posts
    })

    const nextPageUrl = ref('')
    const hasPages = ref(false)

    const fetch = async () => {
      loading.value = true
      try {
        const url = `api/${lang}/reporter/${reporterName.value}/more`
        const response = await $axios.$get<PostPagination>(url)

        morePosts.value.push(response.items)
        nextPageUrl.value = response.nextPageUrl
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
            nextPageUrl.value = res.nextPageUrl
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
      email,
      avatar,
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
      </v-container>
    </div>
    <!-- more posts -->
    <section ref="target">
      <div v-for="(items, i) in morePosts" :key="i" class="shadow-2xl">
        <v-container class="py-8">
          <LazyReporterMore :posts="items" />
        </v-container>
      </div>
    </section>
    <!-- more posts -->
  </div>
</template>
