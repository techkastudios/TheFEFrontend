<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  onMounted,
} from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { Advertisement } from '~/types/ads'
import { useAdTrackStore } from '~/store/ads/adTrack'

export default defineComponent({
  name: 'VModalAds',

  props: {
    ads: {
      type: Object as PropType<Advertisement>,
      required: true,
    },
  },

  setup(props) {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isShowModal = ref(true)
    const adTrackStore = useAdTrackStore()

    // Track view when the component mounts
    onMounted(() => {
      adTrackStore.trackAdView(props.ads.id)
    })

    // Track click on ad
    const handleAdClick = () => {
      adTrackStore.trackAdClick(props.ads.id)
    }

    // if (props.ads) {
    //   isShowModal.value = true
    // }

    return {
      image: computed(() => props.ads.type === 'image'),
      video: computed(() => props.ads.type === 'video'),
      document: computed(() => props.ads.type === 'document'),
      iframe: computed(() => props.ads.type === 'iframe'),
      isMobile: breakpoints.smaller('sm'),
      isShowModal,
      handleAdClick,
    }
  },
  methods: {
    toggleModal() {
      this.isShowModal = !this.isShowModal
      this.$emit('toggleModal', this.isShowModal)
    },
  },
})
</script>

<template>
  <div>
    <div class="overlay"></div>
    <!-- Start modal -->
    <div
      v-if="isShowModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-full h-auto max-w-2xl">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Start modal header -->
          <div
            class="flex items-start justify-between rounded-t dark:border-gray-600 absolute right-0"
          >
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:text-white rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-white"
              data-modal-hide="staticModal"
              @click="toggleModal"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <!-- End modal header -->
          <!-- Start modal body -->
          <div class="space-y-6">
            <p
              v-if="ads"
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              <template v-if="image">
                <template v-if="ads.isExternal">
                  <template v-if="isMobile && ads.hasMobileContent">
                    <a
                      :href="ads.mobileLink"
                      @mousedown="handleAdClick"
                      target="_blank"
                    >
                      <img
                        :src="ads.mobileContent"
                        width="100%"
                        alt="modal ad"
                      />
                    </a>
                  </template>
                  <template v-else>
                    <a
                      :href="ads.link"
                      @mousedown="handleAdClick"
                      target="_blank"
                    >
                      <img :src="ads.content" width="100%" alt="modal ad" />
                    </a>
                  </template>
                </template>
                <template v-else>
                  <template v-if="isMobile && ads.hasMobileContent">
                    <a
                      :href="ads.mobileLink"
                      @mousedown="handleAdClick"
                      target="_self"
                    >
                      <img
                        :src="ads.mobileContent"
                        width="100%"
                        alt="modal ad"
                      />
                    </a>
                  </template>
                  <template v-else>
                    <a
                      :href="ads.link"
                      @mousedown="handleAdClick"
                      target="_self"
                    >
                      <img :src="ads.content" width="100%" alt="modal ad" />
                    </a>
                  </template>
                </template>
              </template>
            </p>
          </div>
          <!-- End modal body -->
        </div>
      </div>
    </div>
    <!-- End modal -->
  </div>
</template>
<style>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 6;
  cursor: pointer;
  user-select: none;
}
</style>