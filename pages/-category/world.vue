<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAdsCategoryStore } from '~/store/ads/category'

export default defineComponent({
  name: 'CategoryWorld',

  setup() {
    const adsStore = useAdsCategoryStore()

    return {
      ads1: computed(() => adsStore.adsChild1),
      ads2: computed(() => adsStore.adsChild2),
      ads3: computed(() => adsStore.adsChild3),
      ads4: computed(() => adsStore.adsChild4),
    }
  },
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategoryHome category="world" />
    <!-- Category Home -->

    <!-- Child Category -->
    <LazyCategorySubChild category="world" subcategory="asia" url="/page/world/asia" :ads="ads1" />
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="world" subcategory="america" url="/page/world/america" :ads="ads2" />
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="world" subcategory="europe" url="/page/world/europe" :ads="ads3" />
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="world" subcategory="africa" url="/page/world/africa" :ads="ads4" />
    <!-- Child Category -->

    <!-- More Category -->
    <LazyCategoryMore category="world" />
    <!-- More Category -->
  </div>
</template>
