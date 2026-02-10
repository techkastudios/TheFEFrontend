<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAdsCategoryStore } from '~/store/ads/category'

export default defineComponent({
  name: 'CategoryNational',

  setup() {
    const adsStore = useAdsCategoryStore()

    return {
      ads1: computed(() => adsStore.adsChild1),
      ads2: computed(() => adsStore.adsChild2),
      ads3: computed(() => adsStore.adsChild3),
    }
  },
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategoryHome category="national" />
    <!-- Category Home -->

    <!-- Sub Category 1 -->
    <LazyCategorySubChild category="national" subcategory="politics" url="/page/national/politics" :ads="ads1" />
    <!-- Sub Category 1 -->

    <!-- Sub Category 2 -->
    <LazyCategorySubChild category="national" subcategory="country" url="/page/national/country" :ads="ads2" />
    <!-- Sub Category 2 -->

    <!-- Sub Category 2 -->
    <LazyCategorySubChild category="national" subcategory="crime" url="/page/national/crime" :ads="ads3" />
    <!-- Sub Category 2 -->

    <!-- More Category -->
    <LazyCategoryMore category="national" />
    <!-- More Category -->
  </div>
</template>
