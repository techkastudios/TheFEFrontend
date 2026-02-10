<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'

import { Posts } from '~/types/posts'

export default defineComponent({
  name: 'ReporterMore',

  props: {
    posts: {
      type: Array as PropType<Posts[]>,
      required: true,
    },
  },

  setup(props) {
    const lead = ref<Posts>()

    const rowPosts = ref<Posts[]>([])
    const columnPosts = ref<Posts[]>([])

    if (props.posts.length) {
      columnPosts.value = props.posts
    }
    return {
      lead,
      rowPosts,
      columnPosts,
    }
  },
})
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-4 gap-4">
    <div
      v-for="post in columnPosts"
      :key="post.id"
      class="col-auto xl:col-[span_1_/_span_4] xl:row-[span_2_/_span_5]"
    >
      <v-card
        :title="post.title"
        :url="post.slug"
        :image="post.image"
        :category="post.category"
        :datetime="post.datetime"
        :text="post.excerpt"
        class="bg-bg11-light dark:bg-bg11-dark p-2"
      />
    </div>
  </div>
</template>
