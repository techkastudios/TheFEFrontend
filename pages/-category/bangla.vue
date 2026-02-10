<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryBangla',

  setup() {},
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategorySingleParent category="bangla" />
    <!-- Category Home -->

    <!-- More Category -->
    <LazyCategoryMore category="bangla" />
    <!-- More Category -->
  </div>
</template>
