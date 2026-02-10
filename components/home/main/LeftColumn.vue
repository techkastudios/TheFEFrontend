<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'
import { Advertisement } from '~/types/ads'

import { Posts } from '~/types/posts'

export default defineComponent({
  name: 'HomeMainLeftColumn',

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

    const posts = ref<Posts[]>([])

    const fetch = async () => {
      loading.value = true
      try {
        const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

        const url = `api/${lang}/home/post/column1`
        posts.value = await $axios.$get(url)
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
    }
  },
})
</script>

<template>
  <section id="home-main-left-column" ref="target" class="xl:flex xl:flex-col">
    <v-card
      v-for="(post, index) in posts"
      :key="post.id"
      :title="post.title"
      :url="post.slug"
      :category-only="false"
      :category="post.category"
      :datetime="post.datetime"
      :text="post.excerpt"
      :custom-class="{ textClamp: index === 3? 'line-clamp-4': 'line-clamp-3'}"
      class="mb-4 last:mb-0"
    ></v-card>
    <!-- ads 3 -->
    <!-- <v-ads v-if="ads" :ads="ads" /> -->
    <v-ads-carousel v-if="ads" :ads="ads" />
    <client-only v-else>
      <Adsense
        data-ad-client="ca-pub-3438694616169600"
        data-ad-slot="2838794797"
        data-full-width-responsive="yes"
        is-new-ads-code="yes"
        data-ad-format="rectangle"
      />
    </client-only>
    <!-- ads 3 -->
  </section>
</template>
