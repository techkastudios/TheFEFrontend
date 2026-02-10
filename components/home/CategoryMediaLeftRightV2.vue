<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryMediaLeftRightV2',

  props: {
    title: {
      type: String,
      default: 'The Financial Express',
    },
    url: {
      type: String,
      default: '/',
    },
    imageLeft: {
      type: String,
      default: null,
    },
    imageRight: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: '',
    },
    category: {
      type: [String, Object],
      default: null,
    },
    datetime: {
      type: String,
      default: new Date('2021-09-11').toISOString(),
    },
  },
})
</script>

<template>
  <article>
    <div class="grid grid-cols-2 gap-x-4 mb-4">
      <nuxt-link v-if="imageLeft" :to="localePath(url)">
        <figure>
          <v-img :src="imageLeft" :alt="title" />
        </figure>
      </nuxt-link>
      <div>
        <v-category v-if="category" :category="category" />
        <v-heading
          class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600">
          <nuxt-link :to="url">{{ title }}</nuxt-link>
        </v-heading>
        <p v-if="text" class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal" v-html="text"></p>
      </div>
      <nuxt-link v-if="imageRight" :to="localePath(url)">
        <figure>
          <v-img :src="imageRight" :alt="title" />
        </figure>
      </nuxt-link>
    </div>
  </article>
</template>
