<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Reporter } from '~/types/posts'

export default defineComponent({
  name: 'CategoryMediaLeftRight',

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
    headingFont: {
      type: String,
      default: 'text-sm leading-4',
    },
    reporter: {
      type: Object as PropType<Reporter>,
      default: null,
    },
  },
})
</script>

<template>
  <article class="grid grid-cols-5 gap-x-4">
    <nuxt-link v-if="imageLeft" :to="localePath(url)" :class="imageLeft ? 'col-span-2' : ''">
      <figure>
        <v-img :src="imageLeft" :alt="title" />
      </figure>
    </nuxt-link>
    <div :class="[imageLeft ? 'col-span-3' : 'col-span-2']">
      <v-heading
        class="font-semibold text-h3-light dark:text-h3-dark mb-2 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
        :class="[headingFont]">
        <nuxt-link :to="localePath(url)" class="line-clamp-2">
          {{ title }}
        </nuxt-link>
      </v-heading>
      <p v-if="reporter" class="text-p-light dark:text-p-dark text-xs opacity-90">
        <nuxt-link :to="'/'">
          {{ reporter.name }}
        </nuxt-link>
      </p>
      <p v-if="text" class="text-p-light dark:text-p-dark text-base leading-5 line-clamp-3 merriweather-sans-normal" v-html="text"></p>
    </div>
    <nuxt-link v-if="imageRight" :to="localePath(url)" :class="imageLeft ? '' : 'col-span-2'">
      <figure>
        <v-img :src="imageRight" :alt="title" />
      </figure>
    </nuxt-link>
  </article>
</template>
