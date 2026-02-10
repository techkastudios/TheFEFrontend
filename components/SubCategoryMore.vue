<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

import { Posts } from '~/types/posts'
import CategoryMediaLeftRight from '~/components/home/CategoryMediaLeftRight.vue'

export default defineComponent({
  name: 'SubCategoryMore',

  components: { CategoryMediaLeftRight },

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
      lead.value = props.posts[0]
      rowPosts.value = props.posts.slice(1, 4)
      columnPosts.value = props.posts.slice(4, 8)
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
    <div class="col-auto xl:col-span-2 xl:row-[span_3_/_span_5]">
      <article v-if="lead" class="grid grid-rows-5 xl:grid-rows-4">
        <div v-if="lead.image" class="row-span-2 row-end-3 col-span-full z-10 w-5/6 mx-auto">
          <figure>
            <v-img :src="lead.image" :alt="lead.title" />
          </figure>
        </div>
        <div
          class="bg-bg11-light dark:bg-bg11-dark px-4 xl:px-16 pb-4 xl:pb-8 xl:pt-5 text-center row-span-5 xl:row-span-3 row-start-2 xl:row-start-2 xl:row-end-5 col-span-full grid place-content-end">
          <v-category :category="lead.category" class="justify-center mb-4" />
          <v-heading class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-4xl text-center line-clamp-3">
            <nuxt-link :to="localePath(lead.slug)"> {{ lead.title }}</nuxt-link>
          </v-heading>
          <p class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal" v-html="lead.excerpt"></p>
        </div>
      </article>
    </div>

    <div v-for="post in rowPosts" :key="post.id"
      class="col-auto xl:col-span-2 xl:row-[span_1_/_span_5] bg-bg11-light dark:bg-bg11-dark p-2">
      <category-media-left-right :title="post.title" :url="post.slug" :image-left="post.image" :category="post.category"
        :datetime="post.datetime" :text="post.excerpt" />
    </div>

    <div v-for="post in columnPosts" :key="post.id" class="col-auto xl:col-[span_1_/_span_4] xl:row-[span_2_/_span_5]">
      <v-card :title="post.title" :url="post.slug" :image="post.image" :category="post.category" :datetime="post.datetime"
        :text="post.excerpt" class="bg-bg11-light dark:bg-bg11-dark p-2" />
    </div>
  </div>
</template>
