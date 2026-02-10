<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType
} from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { Advertisement } from '~/types/ads'
import { useAdTrackStore } from '~/store/ads/adTrack'

export default defineComponent({
  name: 'VAds',

  props: {
    ads: {
      type: Object as PropType<Advertisement>,
      required: true,
    },
  },

  setup(props) {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const adTrackStore = useAdTrackStore()

    // Track view when the component mounts
    onMounted(() => {
      adTrackStore.trackAdView(props.ads.id)
    })

    // Track click on ad
    const handleAdClick = () => {
      adTrackStore.trackAdClick(props.ads.id)
    }

    return {
      image: computed(() => props.ads.type === 'image'),
      video: computed(() => props.ads.type === 'video'),
      document: computed(() => props.ads.type === 'document'),
      iframe: computed(() => props.ads.type === 'iframe'),
      isMobile: breakpoints.smaller('sm'),
      handleAdClick
    }
  },
})
</script>

<template>
  <div>
    <!-- IMAGE ADS -->
    <template v-if="image">
      <template v-if="ads.isExternal">
        <template v-if="isMobile && ads.hasMobileContent">
          <a
            :href="ads.mobileLink"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
            @mousedown="handleAdClick"
          >
            <figure>
              <v-img :src="ads.mobileContent" />
            </figure>
          </a>
        </template>

        <template v-else>
          <a
            :href="ads.link"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
            @mousedown="handleAdClick"
          >
            <figure>
              <v-img :src="ads.content" />
            </figure>
          </a>
        </template>
      </template>

      <template v-else>
        <template v-if="isMobile && ads.hasMobileContent">
          <a
            :href="ads.mobileLink"
            target="_self"
            rel="noopener noreferrer"
            class="block"
            @mousedown="handleAdClick"
          >
            <figure>
              <v-img :src="ads.mobileContent" />
            </figure>
          </a>
        </template>

        <template v-else>
          <a
            :href="ads.link"
            target="_self"
            rel="noopener noreferrer"
            class="block"
            @mousedown="handleAdClick"
          >
            <figure>
              <v-img :src="ads.content" />
            </figure>
          </a>
        </template>
      </template>
    </template>


    <!-- ######################################################## -->
    <!-- ####################### VIDEO ADS ####################### -->
    <!-- ######################################################## -->

    <template v-if="video">

      <!-- EXTERNAL LINK -->
      <template v-if="ads.isExternal">

        <!-- MOBILE VIDEO -->
        <template v-if="isMobile && ads.hasMobileContent">
          <a
            :href="ads.mobileLink"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
            @mousedown="handleAdClick"
          >
            <video controls autoplay muted playsinline class="w-full">
              <source :src="ads.mobileContent" type="video/mp4" />
            </video>
          </a>
        </template>

        <!-- DESKTOP VIDEO -->
        <template v-else>
          <a
            :href="ads.link"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
            @mousedown="handleAdClick"
          >
            <video controls autoplay muted playsinline class="w-full">
              <source :src="ads.content" type="video/mp4" />
            </video>
          </a>
        </template>
      </template>

      <!-- INTERNAL LINK -->
      <template v-else>

        <!-- MOBILE VIDEO -->
        <template v-if="isMobile && ads.hasMobileContent">
          <a
            :href="ads.mobileLink"
            target="_self"
            rel="noopener noreferrer"
            class="block"
            @mousedown="handleAdClick"
          >
            <video controls autoplay muted playsinline class="w-full">
              <source :src="ads.mobileContent" type="video/mp4" />
            </video>
          </a>
        </template>

        <!-- DESKTOP VIDEO -->
        <template v-else>
          <a
            :href="ads.link"
            target="_self"
            rel="noopener noreferrer"
            class="block"
            @mousedown="handleAdClick"
          >
            <video controls autoplay muted playsinline class="w-full">
              <source :src="ads.content" type="video/mp4" />
            </video>
          </a>
        </template>

      </template>

    </template>
  </div>
</template>
