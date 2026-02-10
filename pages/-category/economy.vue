<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategoryEconomy',

  setup() {},
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategoryHome category="economy" />
    <!-- Category Home -->

    <!-- Sub Category 1 -->
    <LazyCategorySubOne category="economy" to="/page/economy/bangladesh" />
    <!-- Sub Category 1 -->

    <!-- Sub Category 2 -->
    <LazyCategorySubTwo category="economy" />
    <!-- Sub Category 2 -->

    <!-- More Category -->
    <LazyCategoryMore category="economy" />
    <!-- More Category -->
  </div>
</template>
