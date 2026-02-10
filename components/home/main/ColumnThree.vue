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
import { LiveMedia } from '~/types/media'

export default defineComponent({
  name: 'HomeMainColumnThree',
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

    const lead:any = ref<Posts>()
    const posts:any = ref<Posts[]>([])
    const media: any = ref<LiveMedia>()
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      const url = `api/${lang}/home/post/column3`
      try {
        const items: Posts[] = await $axios.$get(url)
        const mediaUrl = `api/${lang}/live-media/featured`
        media.value = await $axios.$get(mediaUrl)

        lead.value = items[0]
        posts.value = items.slice(1, 5)
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
      lead,
      posts,
      media
    }
  },
})
</script>

<template>
  <div id="home-main-column-three" ref="target" class="overflow-hidden">
    <v-card
      v-if="lead"
      :title="lead.title"
      :url="lead.slug"
      :image="Object.keys(media).length == 0 ? lead.image : ''"
      :category-only="false"
      :category="lead.category"
      :datetime="lead.datetime"
      :text="lead.excerpt"
      :custom-class="{textClamp: 'line-clamp-4'}"
      class="mb-4"
    ></v-card>
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
      :class="index === 3? '':'mb-4'"
    ></v-card>

    <!-- <v-ads v-if="ads" :ads="ads" class="h-[15.6rem] overflow-hidden flex justify-center items-center sm:flex-none sm:justify-center sm:items-start" />
    <client-only v-else>
      <Adsense
        data-ad-client="ca-pub-3438694616169600"
        data-ad-slot="2838794797"
        data-full-width-responsive="yes"
        is-new-ads-code="yes"
        data-ad-format="rectangle"
      />
    </client-only> -->
  </div>
</template>
