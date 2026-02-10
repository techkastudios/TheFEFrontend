<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAdsCategoryStore } from '~/store/ads/category'

export default defineComponent({
  name: 'CategoryYouthAndEntrepreneurship',

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
    <LazyCategoryHome category="youth-and-entrepreneurship" />
    <!-- Category Home -->

    <!-- Child Category -->
    <!-- <LazyCategorySubChild category="youth-and-entrepreneurship" subcategory="youth" url="/page/youth-and-entrepreneurship/youth" :ads="ads1" /> -->
    <!-- Child Category -->

    <!-- Child Category -->
    <!-- <LazyCategorySubChild category="youth-and-entrepreneurship" subcategory="entrepreneurship" url="/page/youth-and-entrepreneurship/entrepreneurship" :ads="ads2" /> -->
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="youth-and-entrepreneurship" subcategory="startups"
      url="/page/youth-and-entrepreneurship/startups" :ads="ads3" />
    <!-- Child Category -->

    <!-- More Category -->
    <LazyCategoryMore category="youth-and-entrepreneurship" />
    <!-- More Category -->
  </div>
</template>
