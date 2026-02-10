<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  onMounted
} from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { Advertisement } from '~/types/ads'
import { useAdTrackStore } from '~/store/ads/adTrack'

export default defineComponent({
  name: 'VFooterModalAds',
  props: {
    ads: {
      type: Object as PropType<Advertisement>,
      required: true,
    },
  },

  setup(props) {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isShowModal = ref(false)
    const adTrackStore = useAdTrackStore()

    if (props.ads) {
      isShowModal.value = true
    }

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
      isShowModal,
      handleAdClick
    }
  },
  methods: {
    minimizeAds() {
      const element = document.getElementById('footerPopupAd')
      if (element) {
        const isDown = element.classList.contains('footer-popup-down')
        if (isDown) {
          element.classList.remove('footer-popup-down')
        } else {
          element.classList.add('footer-popup-down')
        }
      }
    },
  },
})
</script>

<template>
  <div class="popup-ads-container">
    <span>
      <button class="footer-minimize-btn" @click="minimizeAds">
        <font-awesome-icon class="down" :icon="['fas', 'chevron-down']" />
        <font-awesome-icon class="up" :icon="['fas', 'chevron-up']" />
      </button>
    </span>
    <template v-if="image">
      <template v-if="ads.isExternal">
        <template v-if="isMobile && ads.hasMobileContent">
          <a :href="ads.mobileLink" @mousedown="handleAdClick" target="_blank">
            <img :src="ads.mobileContent" alt="modal ad" />
          </a>
        </template>
        <template v-else>
          <a :href="ads.link" @mousedown="handleAdClick" target="_blank">
            <img :src="ads.content" alt="modal ad" />
          </a>
        </template>
      </template>
      <template v-else>
        <template v-if="isMobile && ads.hasMobileContent">
          <a :href="ads.mobileLink" @mousedown="handleAdClick" target="_self">
            <img :src="ads.mobileContent" alt="modal ad" />
          </a>
        </template>
        <template v-else>
          <a :href="ads.link" @mousedown="handleAdClick" target="_self">
            <img :src="ads.content" alt="modal ad" />
          </a>
        </template>
      </template>
    </template>
  </div>
</template>