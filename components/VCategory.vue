<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'VCategory',

  props: {
    category: {
      type: [String, Object],
      default: null,
    },
  },

  setup() { },
})
</script>

<template>
  <div v-if="category" class="mb-2 flex items-center">
    <router-link v-if="category.parent_id" :to="localePath('/page' + category.slug)" class="
        uppercase
        font-bold
        text-xs text-rose-600
        hover:text-rose-900
        transition-colors
      " v-bind="$attrs">
      {{ category.name }}
    </router-link>
    <router-link v-else :to="localePath(category.slug)" class="
        uppercase
        font-bold
        text-xs text-rose-600
        hover:text-rose-900
        transition-colors
      " v-bind="$attrs">
      {{ category.name }}
    </router-link>
  </div>
</template>