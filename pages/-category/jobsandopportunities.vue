<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryJobsAndOpportunities',

  setup() {},
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategorySingleParent category="jobs-and-opportunities" />
    <!-- Category Home -->

    <!-- More Category -->
    <LazyCategoryMore category="jobs-and-opportunities" />
    <!-- More Category -->
  </div>
</template>
