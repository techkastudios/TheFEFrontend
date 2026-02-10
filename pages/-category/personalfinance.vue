<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAdsCategoryStore } from '~/store/ads/category'

export default defineComponent({
  name: 'CategoryPersonalFinance',

  setup() {
    const adsStore = useAdsCategoryStore()

    return {
      ads1: computed(() => adsStore.adsChild1),
      ads2: computed(() => adsStore.adsChild2),
      ads3: computed(() => adsStore.adsChild3),
      ads4: computed(() => adsStore.adsChild4),
      ads5: computed(() => adsStore.adsChild5),
    }
  },
})
</script>

<template>
  <div id="category">
    <!-- Category Home -->
    <LazyCategoryHome category="personal-finance" />
    <!-- Category Home -->

    <!-- Child Category -->
    <LazyCategorySubChild category="personal-finance" subcategory="tax" url="/page/personal-finance/tax" :ads="ads1" />
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="personal-finance" subcategory="mutual-funds" url="/page/personal-finance/mutual-funds"
      :ads="ads2" />
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="personal-finance" subcategory="invest" url="/page/personal-finance/invest"
      :ads="ads3" />
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="personal-finance" subcategory="save" url="/page/personal-finance/save" :ads="ads4" />
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="personal-finance" subcategory="news" url="/page/personal-finance/news" :ads="ads5" />
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="personal-finance" subcategory="spend" url="/page/personal-finance/spend"
      :ads="ads1" />
    <!-- Child Category -->

    <!-- Child Category -->
    <LazyCategorySubChild category="personal-finance" subcategory="calculators" url="/page/personal-finance/calculators"
      :ads="ads2" />
    <!-- Child Category -->

    <!-- More Category -->
    <LazyCategoryMore category="personal-finance" />
    <!-- More Category -->
  </div>
</template>
