<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryEntertainment',

  setup() {},
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategorySingleParent category="entertainment" />
    <!-- Category Home -->

    <!-- More Category -->
    <LazyCategoryMore category="entertainment" />
    <!-- More Category -->
  </div>
</template>
