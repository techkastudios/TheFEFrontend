<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAdsCategoryStore } from '~/store/ads/category'

export default defineComponent({
  name: 'CategorySpecialIssues',

  setup() {
    const adsStore = useAdsCategoryStore()

    return {
      ads1: computed(() => adsStore.adsChild1),
      ads2: computed(() => adsStore.adsChild2),
    }
  },
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategoryHome category="special-issues" />
    <!-- Category Home -->

    <!-- Child Category -->
    <LazyCategorySubChild category="special-issues" subcategory="budget-2022" url="/page/special-issues/budget-2022"
      :ads="ads1" />
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="special-issues" subcategory="important-days" url="/page/special-issues/important-days"
      :ads="ads2" />
    <!-- Child Category -->

    <!-- More Category -->
    <LazyCategoryMore category="special-issues" />
    <!-- More Category -->
  </div>
</template>
