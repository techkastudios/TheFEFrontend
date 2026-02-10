<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategorySciTech',

  setup() {},
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategorySingleParent category="sci-tech" />
    <!-- Category Home -->

    <!-- More Category -->
    <LazyCategoryMore category="sci-tech" />
    <!-- More Category -->
  </div>
</template>
