<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'

import { Slider } from '~/types/slider'

export default defineComponent({
  name: 'HomeMainSlider',

  setup() {
    const { $axios, i18n } = useContext()

    const sliders = ref<Slider[]>([])

    const sliderSettings = ref({
      dots: true,
      infinite: true,
      rows: 1,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      pauseOnDotsHover: true,
      pauseOnFocus: true,
      pauseOnHover: true,
    })
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    useFetch(async () => {
      // const url = `api/${lang}/slider`
      // sliders.value = await $axios.$get<Slider[]>(url)
    })

    onMounted(async () => {
      const url = `api/${lang}/slider`
      sliders.value = await $axios.$get<Slider[]>(url)
    })

    return {
      sliderSettings,
      sliders,
    }
  },
})
</script>

<template>
  <div class="overflow-hidden main-slider-container pb-4">
    <client-only v-if="sliders.length">
      <VueSlickCarousel v-bind="sliderSettings">
        <nuxt-link v-for="slider in sliders" :key="slider.id" :to="localePath(slider.link)">
          <figure v-if="slider.content" class="relative">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
            <v-img :src="slider.content" :alt="slider.title" />
            <figcaption class="absolute bottom-3 left-0 right-0">
              <v-heading
                class="font-semibold text-white text-xl xl:text-[1.7rem] leading-7 text-center transition-colors hover:text-rose-600 dark:hover:text-rose-600 line-clamp-2 px-4 py-1"
              >{{ slider.title }}</v-heading>
            </figcaption>
          </figure>
        </nuxt-link>
      </VueSlickCarousel>
    </client-only>
  </div>
</template>
