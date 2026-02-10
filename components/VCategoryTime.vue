<script lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'VCategoryTime',

  props: {
    category: {
      type: [String, Object],
      default: null,
    },
    time: {
      type: String,
      default: new Date('2021-09-11').toISOString(),
    },
  },

  setup(props) {
    dayjs.extend(relativeTime)
    dayjs.extend(updateLocale)

    const date = dayjs(props.time).fromNow()

    return {
      date,
    }
  },
})
</script>

<template>
  <div v-if="category" class="mb-2 flex items-center divide-x-2 divide-rose-600 dark:divide-rose-600 merriweather-sans-bold">
    <router-link v-if="category.parent_id" :to="localePath('/page' + category.slug)"
      class="pr-2 uppercase font-bold text-xs text-rose-600 hover:text-rose-900 transition-colors" v-bind="$attrs">
      {{ category.name }}
    </router-link>
    <router-link v-else :to="localePath(category.slug)"
      class="pr-2 uppercase font-bold text-xs text-rose-600 hover:text-rose-900 transition-colors" v-bind="$attrs">
      {{ category.name }}
    </router-link>
    <div class="pl-2 font-bold text-xs text-rose-600">
      {{ date }}
    </div>
  </div>
</template>
