<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'GoogleSearch',
})
</script>
<template>
  <v-container>
    <script async src="https://cse.google.com/cse.js?cx=3432ec95775964de5"></script>
    <div class="gcse-search"></div>
  </v-container>
</template>