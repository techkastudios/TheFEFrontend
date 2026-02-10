<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryEnvironment',

  setup() {},
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategorySingleParent category="environment" />
    <!-- Category Home -->

    <!-- More Category -->
    <LazyCategoryMore category="environment" />
    <!-- More Category -->
  </div>
</template>
