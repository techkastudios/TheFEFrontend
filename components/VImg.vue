<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  PropType,
  toRef,
} from '@nuxtjs/composition-api'

export interface State {
  observer: IntersectionObserver | null
  intersected: boolean
  loaded: boolean
}

export default defineComponent({
  name: 'VImg',

  inheritAttrs: false,

  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'FE',
    },
    placeholder: {
      type: String,
      default: 'data:,',
    },
    srcset: {
      type: String,
      default: null,
    },
    intersectionOptions: {
      type: Object as PropType<IntersectionObserverInit>,
      default: () => ({}),
    },
    usePicture: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const root = ref()
    const state = reactive<State>({
      observer: null,
      intersected: false,
      loaded: false,
    })

    // Computed
    const srcImage = computed(() =>
      state.intersected && props.src ? props.src : props.placeholder
    )
    const srcsetImage = computed(() =>
      state.intersected && props.srcset ? props.srcset : false
    )

    // Methods
    const load = () => {
      if (root.value && root.value.getAttribute('src') !== props.placeholder) {
        state.loaded = true
        emit('load')
      }
    }
    const error = () => emit('error', root.value)

    // Hooks
    onMounted(() => {
      if ('IntersectionObserver' in window) {
        state.observer = new IntersectionObserver((entries) => {
          const image = entries[0]
          if (image.isIntersecting) {
            state.intersected = true
            state.observer?.disconnect()
            emit('intersect')
          }
        }, props.intersectionOptions)

        state.observer.observe(root.value as Element)
      }
    })

    onBeforeUnmount(() => {
      if ('IntersectionObserver' in window) {
        state.observer?.disconnect()
      }
    })

    const loaded = toRef(state, 'loaded')

    return {
      root,
      srcImage,
      srcsetImage,
      loaded,
      load,
      error,
    }
  },
})
</script>

<template>
  <img ref="root" :src="srcImage" :srcset="srcsetImage" :alt="alt"
    class="v-lazy-image aspect-w-3 aspect-h-2 pb-0 object-center object-cover mx-auto"
    :class="{ 'v-lazy-image-loaded': loaded }" @load="load" @error="error" />
</template>
