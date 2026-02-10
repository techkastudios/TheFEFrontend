<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { useIntersectionObserver, useInfiniteScroll } from '@vueuse/core'
import CategoryMediaLeftRight from '~/components/category/MediaLeftRight.vue'
import { Posts } from '~/types/posts'
import { CategorySportChild } from '~/types/category'

export default defineComponent({
  name: 'CategorySubChildInfinite',

  components: { CategoryMediaLeftRight },

  props: {
    title: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { $axios, i18n } = useContext()

    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])

    const target = ref<HTMLElement>()
    const scrollTarget = ref<HTMLElement | null>(null)
    const loading = ref(false)

    const nextPageUrl = ref('')
    const hasPages = ref(false)
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en';

    const fetch = async () => {
      loading.value = true
      try {
        const response = await $axios.$get<CategorySportChild>(
          `api/${lang}/category/${props.endpoint}`
        )

        lead.value = response.featured
        posts.value = response.posts?.items
        nextPageUrl.value = response.posts?.nextPageUrl
        hasPages.value = response.posts.hasPages
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

    useInfiniteScroll(
      scrollTarget,
      async () => {
        if (!loading.value && nextPageUrl.value) {
          loading.value = true
          try {
            const response = await $axios.$get<CategorySportChild>(
              nextPageUrl.value
            )
            posts.value = [...posts.value, ...response.posts?.items]
            nextPageUrl.value = response.posts?.nextPageUrl
            hasPages.value = response.posts?.hasPages
          } catch (e) {
          } finally {
            loading.value = false
          }
        }
      },
      { distance: 50 }
    )

    return {
      lead,
      posts,
      target,
      scrollTarget,
    }
  },
})
</script>

<template>
  <div ref="target">
    <header class="bg-black p-1.5 text-center uppercase font-bold text-lg text-white mb-6">
      <nuxt-link :to="localePath('/page/' + endpoint)">
        {{ title }}
      </nuxt-link>
    </header>
    <article v-if="lead">
      <div class="min-h-[5rem]">
        <v-heading
          class="font-semibold text-h3-light dark:text-h3-dark text-xl xl:text-2xl transition-colors hover:text-rose-600 dark:hover:text-rose-600">
          <nuxt-link :to="localePath(lead.slug)" class="line-clamp-3">
            {{ lead.title }}
          </nuxt-link>
        </v-heading>
        <p v-if="lead.reporter" class="text-p-light dark:text-p-dark text-xs opacity-90">
          <nuxt-link :to="'/'">
            {{ lead.reporter.name }}
          </nuxt-link>
        </p>
      </div>

      <nuxt-link v-if="lead.image" :to="localePath(lead.slug)">
        <figure class="mt-4">
          <v-img :src="lead.image" :alt="lead.caption" />
        </figure>
      </nuxt-link>
    </article>

    <div class="w-full h-0.5 bg-bg5-light dark:bg-bg5-dark my-4" />

    <section ref="scrollTarget"
      class="divide-y-2 divide-bg5-light dark:divide-bg5-dark max-h-[46rem] overflow-y-scroll overflow-x-hidden">
      <category-media-left-right v-for="post in posts" :key="post.id" :title="post.title" :url="post.slug"
        :image-left="post.image" :reporter="post.reporter" heading-font="text-lg leading-5" class="py-2" />
    </section>
  </div>
</template>
