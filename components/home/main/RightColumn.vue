<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'
import VElectionCountDown from '~/components/VElectionCountDown.vue'
import { Advertisement } from '~/types/ads'

import { Posts } from '~/types/posts'

export default defineComponent({
  name: 'HomeMainRightColumn',
  components: { VElectionCountDown },

  props: {
    ads1: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    ads2: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
  },

  setup() {
    const { $axios, i18n } = useContext()
    const target = ref(null)
    const loading = ref(false)

    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const url = `api/${lang}/home/post/column4`
        const items: Posts[] = await $axios.$get(url)

        lead.value = items[0]
        posts.value = items.slice(1, 3)
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

    const customClass = { textClamp: 'line-clamp-3' }

    return {
      target,
      loading,
      lead,
      posts,
      customClass,
    }
  },
})
</script>

<template>
  <section
    id="home-main-right-column"
    ref="target"
    class="col-auto xl:col-span-3 order-4 xl:order-none"
  >
    <!-- Optional Ad Section -->
    <v-ads v-if="ads" :ads="ads1" />
      
    <div class="bg-op-light dark:bg-op-dark grid grid-flow-row mb-4">
      <header
        class="bg-bg7-light dark:bg-bg7-dark p-1.5 text-center uppercase font-bold text-lg text-white"
      >{{ $t('editorial_op_ed') }}</header>
      <div class="p-2 grid grid-flow-row">
        <v-card
          v-if="lead"
          :title="lead.title"
          :url="lead.slug"
          :image="lead.image"
          :category-only="false"
          :category="lead.category"
          :datetime="lead.datetime"
          :text="lead.excerpt"
          class="mb-4"
          :custom-class="customClass"
        ></v-card>
        <v-card
          v-for="post in posts"
          :key="post.id"
          :title="post.title"
          :url="post.slug"
          :category-only="false"
          :category="post.category"
          :datetime="post.datetime"
          :text="post.excerpt"
          class="mb-4 last:mb-0"
          :custom-class="customClass"
        ></v-card>
      </div>
    </div>
    <!-- ads 3 -->
    <!-- <v-ads v-if="ads" :ads="ads" /> -->
    <v-ads-carousel v-if="ads2" :ads="ads2" />
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
