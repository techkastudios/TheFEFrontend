<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryStock',

  setup() {},
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategoryHome category="stock" />
    <!-- Category Home -->

    <!-- Sub Category 1 -->
    <LazyCategorySubOne category="stock" to="/page/stock/bangladesh" />
    <!-- Sub Category 1 -->

    <!-- Sub Category 2 -->
    <LazyCategorySubTwo category="stock" />
    <!-- Sub Category 2 -->

    <!-- More Category -->
    <LazyCategoryMore category="stock" />
    <!-- More Category -->
  </div>
</template>
