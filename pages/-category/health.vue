<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryHealth',

  setup() { },
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategorySingleParent category="health" />
    <!-- Category Home -->

    <!-- More Category -->
    <LazyCategoryMore category="health" />
    <!-- More Category -->
  </div>
</template>
