<script lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'VCategoryTimeSearch',

  props: {
    category: {
      type: String,
      default: null,
    },
    categorySlug: {
      type: String,
      default: '/',
    },
    publishedAt: {
      type: String,
      default: new Date().getTime(),
    },
  },

  setup(props) {
    dayjs.extend(relativeTime)
    dayjs.extend(updateLocale)

    const date = dayjs(props.publishedAt).fromNow()

    return {
      date,
    }
  },
})
</script>

<template>
  <div
    v-if="category"
    class="mb-2 flex items-center divide-x-2 divide-rose-600 dark:divide-rose-600 merriweather-sans-bold"
  >
    <router-link
      :to="categorySlug"
      class="pr-2 uppercase font-bold text-xs text-rose-600 hover:text-rose-900 transition-colors"
    >{{ category }}</router-link>
    <div class="pl-2 font-bold text-xs text-rose-600">{{ date }}</div>
  </div>
</template>