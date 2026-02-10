<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryMediaTopLeft',

  props: {
    title: {
      type: String,
      default: 'The Financial Express',
    },
    url: {
      type: String,
      default: '/',
    },
    media: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: null,
    },
    categoryLink: {
      type: String,
      default: '/',
    },
    categoryColor: {
      type: String,
      default: '#000000',
    },
    bgColor: {
      type: String,
      default: 'bg-bg1-light dark:bg-bg1-dark',
    },
  },
})
</script>

<template>
  <article class="grid grid-rows-4">
    <div class="row-span-2 row-end-3 col-span-full z-10 w-5/6">
      <nuxt-link v-if="media" :to="localePath(url)">
        <figure>
          <v-img :src="media" :alt="title" />
        </figure>
      </nuxt-link>
    </div>
    <div class="row-span-3 row-start-2 col-span-full flex flex-col justify-end items-start p-3 pt-20" :class="bgColor">
      <v-category-time v-if="category" :text="category" :to="categoryLink" :color="categoryColor" />
      <v-heading
        class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-2xl line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600">
        <nuxt-link :to="localePath(url)">{{ title }}</nuxt-link>
      </v-heading>
      <p v-if="text" class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal" v-html="text"></p>
    </div>
  </article>
</template>
