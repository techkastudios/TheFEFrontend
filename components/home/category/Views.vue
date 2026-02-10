<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import { CategoryPost } from '~/types/posts'
import CategoryHeading from '~/components/home/CategoryHeading.vue'

export default defineComponent({
  name: 'HomeCategoryViews',
  components: { CategoryHeading },

  setup() {
    const { $axios, i18n } = useContext()
    const target = ref(null)
    const loading = ref(false)

    const items = ref<CategoryPost[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        items.value = await $axios.$get<CategoryPost[]>(
          `api/${lang}/home/category-views`
        )
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
      items,
    }
  },
})
</script>

<template>
  <div id="home-category-views" ref="target" class="bg-bg1-light dark:bg-bg1-dark py-8">
    <v-container>
      <!-- news -->
      <div class="grid grid-cols-1 xl:grid-cols-4 grid-flow-row gap-4 pb-4">
        <section v-for="(item, i) in items" :key="i" class="flex flex-col">
          <!-- heading -->
          <category-heading :name="item.name" :url="'/page' + item.slug" class="more-column-heading" />
          <!-- heading -->
          <div class="grid grid-rows-4 gap-y-4 flex-auto bg-bg1-light dark:bg-bg1-dark">
            <article v-for="post in item.posts" :key="post.id" class="flex flex-col">
              <nuxt-link v-if="post.image" :to="localePath(post.slug)">
                <figure>
                  <v-img :src="post.image" :alt="post.title" />
                </figure>
              </nuxt-link>
              <div class="px-2 py-4 flex-auto">
                <v-category :category="post.category" />
                <v-heading
                  class="font-semibold mb-2 text-xl leading-5.5 line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600">
                  <nuxt-link :to="localePath(post.slug)">{{
                    post.title
                  }}</nuxt-link>
                </v-heading>
                <p class="text-base leading-5 line-clamp-3" v-html="post.excerpt"></p>
              </div>
            </article>
          </div>
        </section>
      </div>
      <!-- news -->
    </v-container>
  </div>
</template>
