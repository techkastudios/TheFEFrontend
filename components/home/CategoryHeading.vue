<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryHeading',

  props: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: '/all-news',
    },
  },
})
</script>

<template>
  <v-heading :level="2" class="font-bold uppercase text-3xl text-h2-light dark:text-h2-dark mb-4">
    <nuxt-link :to="localePath(url)" class="flex items-center">
      <span class="mr-5">{{ name }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="21" viewBox="0 0 16 21" class="fill-current">
        <path id="Polygon_2" data-name="Polygon 2" d="M10.5,0,21,16H0Z" transform="translate(16) rotate(90)" />
      </svg>
    </nuxt-link>
  </v-heading>
</template>
