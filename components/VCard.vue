<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'VCard',

  props: {
    tag: {
      type: String,
      default: 'article',
    },
    title: {
      type: String,
      default: 'The Financial Express',
    },
    titleClass: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
      default: '/',
    },
    image: {
      type: String,
      default: null,
    },
    imageClass: {
      type: Array,
      default: () => [],
    },
    text: {
      type: String,
      default: '',
    },
    categoryOnly: {
      type: Boolean,
      default: true,
    },
    category: {
      type: [String, Object],
      default: null,
    },
    datetime: {
      type: String,
      default: new Date('2021-09-11').toISOString(),
    },
    textfixedheight: {
      type: String,
      default: '',
    },
    customClass: {
      type: Object,
      default: null,
    }
  },
})
</script>

<template>
  <component :is="tag">
    <nuxt-link v-if="image" :to="localePath(url)">
      <figure class="mb-2" :class="imageClass">
        <v-img :src="image" :alt="title" />
      </figure>
    </nuxt-link>
    <div :class="textfixedheight">
      <template v-if="categoryOnly">
        <v-category v-if="category" :category="category" />
      </template>
      <template v-else>
        <v-category-time v-if="category" :category="category" :time="datetime" />
      </template>
      <v-heading v-if="title"
        class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
        :class="titleClass">
        <nuxt-link :to="localePath(url)" class="line-clamp-3 py-1.5 richmond-display-bold text-[21px]">
          {{ title }}
        </nuxt-link>
      </v-heading>
      <p v-if="text" class="text-p-light dark:text-p-dark text-base leading-6 merriweather-sans-normal"
        :class="(customClass && customClass.textClamp) ? customClass.textClamp : 'line-clamp-3'" v-html="text"></p>
    </div>
  </component>
</template>
