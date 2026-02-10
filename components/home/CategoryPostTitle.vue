<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryPostTitle',

  props: {
    posts: {
      type: Array,
      required: true,
      default: () => [],
    },
    headingClass: {
      type: Array,
      default: () => ['text-h3-light', 'dark:text-h3-dark'],
    },
  },
})
</script>

<template>
  <section v-if="posts.length > 0" class="px-4 divide-y divide-bg5-light dark:divide-bg5-dark">
    <v-heading v-for="post in posts" :key="post.id"
      class="font-semibold py-4 transition-colors hover:text-rose-600 dark:hover:text-rose-600" :class="headingClass">
      <nuxt-link :to="localePath(post.slug || '/')" class="line-clamp-3">
        {{ post.title }}
      </nuxt-link>
    </v-heading>
  </section>
</template>
