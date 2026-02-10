<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostTitleOnly',

  props: {
    posts: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
})
</script>

<template>
  <section class="px-4 divide-y divide-bg5-light dark:divide-bg5-dark bg-gray">
    <v-heading
      v-for="post in posts"
      :key="post.id"
      class="font-semibold text-h3-dark line-clamp-3 py-4 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
    >
      <nuxt-link :to="localePath(post.slug || '/')">{{ post.title }}</nuxt-link>
    </v-heading>
  </section>
</template>
