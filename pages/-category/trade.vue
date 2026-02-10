<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryTrade',

  setup() {},
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategorySingleParent category="trade" />
    <!-- Category Home -->

    <!-- More Category -->
    <LazyCategoryMore category="trade" />
    <!-- More Category -->
  </div>
</template>
