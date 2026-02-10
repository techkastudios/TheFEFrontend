<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import { Posts } from '~/types/posts'

export default defineComponent({
  name: 'HomeMainColumnTwo',

  setup() {
    const { $axios, i18n } = useContext()
    const target = ref(null)

    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    // const { fetch } = useFetch(async () => {
    // const url = `api/${lang}/home/post/column2`
    // const items: Posts[] = await $axios.$get(url)
    // lead.value = items[0]
    // posts.value = items.slice(1, 4)
    // })

    const fetch = async () => {
      const url = `api/${lang}/home/post/column2`
      const items: Posts[] = await $axios.$get(url)

      lead.value = items[0]
      posts.value = items.slice(1, 4)
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
      lead,
      posts,
    }
  },
})
</script>

<template>
  <div id="home-main-column-two" ref="target">
    <article v-if="lead" class="mb-4">
      <v-category-time :category="lead.category" :time="lead.datetime" />
      <v-heading
        class="font-semibold text-h3-light dark:text-h3-dark py-2 text-xl line-clamp-2 transition-colors hover:text-rose-600 dark:hover:text-rose-600 md:text-4xl md:text-4xl md:font-normal"
      >
        <nuxt-link :to="localePath(lead.slug)">{{ lead.title }}</nuxt-link>
      </v-heading>
      <p
        class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-5 merriweather-sans-normal"
        v-html="lead.excerpt"
      ></p>
    </article>

    <article
      v-for="post in posts"
      :key="post.id"
      class="grid xl:grid-cols-2 gap-x-4 mb-5 last:mb-0"
    >
      <nuxt-link v-if="post.image" :to="localePath(post.slug)" class="overflow-hidden w-fit">
        <figure class="mb-2 xl:mb-0">
          <v-img :src="post.image" :alt="post.title" />
        </figure>
      </nuxt-link>
      <div class="clear-both overflow-hidden">
        <v-category-time :category="post.category" :time="post.datetime" />
        <v-heading
          class="font-semibold text-h3-light dark:text-h3-dark mb-2 text-xl leading-5.5 line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
        >
          <nuxt-link :to="localePath(post.slug)">{{ post.title }}</nuxt-link>
        </v-heading>
        <p
          class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal"
          v-html="post.excerpt"
        ></p>
      </div>
    </article>
  </div>
</template>
