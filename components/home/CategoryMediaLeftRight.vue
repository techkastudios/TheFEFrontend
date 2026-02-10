<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Reporter } from '~/types/posts'

export default defineComponent({
  name: 'HomeCategoryMediaLeftRight',

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
      default: new Date().toISOString(),
    },
    reporter: {
      type: Object as PropType<Reporter>,
      default: null,
    },
  },
})
</script>

<template>
  <article class="grid xl:grid-cols-2 gap-x-4">
    <nuxt-link v-if="imageLeft" :to="localePath(url)">
      <figure>
        <v-img :src="imageLeft" :alt="title" />
      </figure>
    </nuxt-link>
    <div class="mt-4 xl:mt-0" :class="[reporter ? 'flex flex-col justify-between' : '']">
      <template v-if="categoryOnly">
        <v-category v-if="category" :category="category" />
      </template>
      <template v-else>
        <v-category-time v-if="category" :category="category" :time="datetime" />
      </template>
      <v-heading
        class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600">
        <nuxt-link :to="localePath(url)">{{ title }}</nuxt-link>
      </v-heading>
      <p v-if="reporter" class="text-p-light dark:text-p-dark text-xs opacity-90">
        <nuxt-link :to="'/'">
          {{ reporter.name }}
        </nuxt-link>
      </p>
      <p v-if="text" class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal" v-html="text"></p>
    </div>
    <nuxt-link v-if="imageRight" :to="localePath(url)">
      <figure>
        <v-img :src="imageRight" :alt="title" />
      </figure>
    </nuxt-link>
  </article>
</template>
