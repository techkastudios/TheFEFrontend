<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryEditorial',

  setup() {},
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategorySingleParent category="editorial" />
    <!-- Category Home -->

    <!-- More Category -->
    <LazyCategoryMore category="editorial" />
    <!-- More Category -->
  </div>
</template>
