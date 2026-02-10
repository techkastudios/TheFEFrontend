<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import { CategoryPost } from '~/types/posts'
import CategoryHeading from '~/components/home/CategoryHeading.vue'

export default defineComponent({
  name: 'HomeCategoryMore',
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
          `api/${lang}/home/category-more`
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
  <div id="home-category-more" ref="target" class="bg-bg2-light dark:bg-bg2-dark py-8">
    <v-container>
      <!-- news -->
      <div class="grid grid-cols-1 xl:grid-cols-4 grid-flow-row gap-4 pb-4">
        <section v-for="(item, i) in items" :key="i" class="flex flex-col">
          <!-- heading -->
          <category-heading :name="item.name" :url="item.slug" class="more-column-heading" />
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
                  class="font-semibold mb-2 text-xl leading-5.5 line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
                >
                  <nuxt-link :to="localePath(post.slug)">
                    {{
                    post.title
                    }}
                  </nuxt-link>
                </v-heading>
                <p class="text-base leading-5 line-clamp-3" v-html="post.excerpt"></p>
              </div>
            </article>
          </div>
        </section>
      </div>
      <!-- news -->
      <!-- ads -->
      <div class="text-center mt-8">
        <Adsense
          data-ad-client="ca-pub-3438694616169600"
          data-ad-slot="2838794797"
          data-ad-format="auto"
          data-full-width-responsive="yes"
        />
      </div>
      <!-- ads -->

      <!-- ads -->
      <!-- <client-only>
        <Adsense
          data-ad-client="ca-pub-3438694616169600"
          data-ad-slot="2838794797"
          data-full-width-responsive="yes"
          is-new-ads-code="yes"
          data-ad-format="auto"
          ins-class="text-center mt-8"
        />
      </client-only>-->
      <!-- ads -->
    </v-container>
  </div>
</template>
