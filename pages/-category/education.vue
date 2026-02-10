<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAdsCategoryStore } from '~/store/ads/category'

export default defineComponent({
  name: 'CategoryEducation',

  setup() {
    const adsStore = useAdsCategoryStore()

    return {
      ads1: computed(() => adsStore.adsChild1),
    }
  },
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategoryHome category="education" />
    <!-- Category Home -->

    <!-- Sub Category 1 -->
    <LazyCategorySubChild category="education" subcategory="article" url="/page/education/article" :ads="ads1" />
    <!-- Sub Category 1 -->

    <!-- More Category -->
    <LazyCategoryMore category="education" />
    <!-- More Category -->
  </div>
</template>
