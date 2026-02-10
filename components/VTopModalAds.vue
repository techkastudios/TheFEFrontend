<!-- eslint-disable vue/require-default-prop -->
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
  name: 'VTopModalAds',
  props: {
    ads: {
      type: Object as PropType<Advertisement>,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      return: {
        isTopPopup: true
      }
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
      const element = document.getElementById('topPopupAd')
      if (element) {
        const isDown = element.classList.contains('top-popup-down')
        if (isDown) {
          element.classList.remove('top-popup-down')
        } else {
          element.classList.add('top-popup-down')
        }
      }
    },
  },
})
</script>

<template>
  <div>
    <template v-if="options && options.isTopPopup">
      <div id="topPopupAd" class="top-popup popup-ad-modal">
        <div class="popup-ads-container">
          <template v-if="image">
            <template v-if="ads.isExternal">
              <template v-if="isMobile && ads.hasMobileContent">
                <a :href="ads.mobileLink" target="_blank">
                  <img :src="ads.mobileContent" alt="modal ad" />
                </a>
              </template>
              <template v-else>
                <a :href="ads.link" target="_blank" @mousedown="handleAdClick">
                  <img :src="ads.content" alt="modal ad" />
                </a>
              </template>
            </template>
            <template v-else>
              <template v-if="isMobile && ads.hasMobileContent">
                <a :href="ads.mobileLink" target="_self" @mousedown="handleAdClick">
                  <img :src="ads.mobileContent" alt="modal ad" />
                </a>
              </template>
              <template v-else>
                <a :href="ads.link" target="_self" @mousedown="handleAdClick">
                  <img :src="ads.content" alt="modal ad" />
                </a>
              </template>
            </template>
          </template>
          <span>
            <button class="top-minimize-btn" @click="minimizeAds">
              <font-awesome-icon class="down" :icon="['fas', 'chevron-down']" />
              <font-awesome-icon class="up" :icon="['fas', 'chevron-up']" />
            </button>
          </span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="popup-ads-container">
        <template v-if="image">
          <template v-if="ads.isExternal">
            <template v-if="isMobile && ads.hasMobileContent">
              <a :href="ads.mobileLink" target="_blank">
                <img :src="ads.mobileContent" alt="modal ad" />
              </a>
            </template>
            <template v-else>
              <a :href="ads.link" target="_blank" @mousedown="handleAdClick">
                <img :src="ads.content" alt="modal ad" />
              </a>
            </template>
          </template>
          <template v-else>
            <template v-if="isMobile && ads.hasMobileContent">
              <a :href="ads.mobileLink" target="_self" @mousedown="handleAdClick">
                <img :src="ads.mobileContent" alt="modal ad" />
              </a>
            </template>
            <template v-else>
              <a :href="ads.link" target="_self" @mousedown="handleAdClick">
                <img :src="ads.content" alt="modal ad" />
              </a>
            </template>
          </template>
        </template>
      </div>
    </template>

  </div>
</template>
<style>
</style>