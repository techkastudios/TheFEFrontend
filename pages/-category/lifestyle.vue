<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useAdsCategoryStore } from '~/store/ads/category'

export default defineComponent({
  name: 'CategoryLifestyles',

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
    <LazyCategoryLifestyleHome category="lifestyle" />
    <!-- Category Home -->

    <!-- Entertainment Child Category -->
    <LazyCategoryLifestyleEntertainment category="lifestyle" subcategory="entertainment"
      url="/page/lifestyle/entertainment" />
    <!-- Entertainment Child Category -->

    <!-- Living Child Category -->
    <LazyCategoryLifestyleLiving category="lifestyle" subcategory="living" url="/page/lifestyle/living" />
    <!-- Living Child Category -->

    <!--- Food Child Category --->
    <lazyCategoryLifestyleFood category="lifestyle" subcategory="food" url="/page/lifestyle/food" />
    <!--- Food Child Category --->

    <!--- Gallery Child Category --->
    <!-- <lazyCategoryLifestyleGallery
      category="lifestyle"
      subcategory="gallery"
      url="/page/lifestyle/gallery"
    /> -->
    <!--- Gallery Child Category --->

    <!--- Culture Child Category --->
    <lazyCategoryLifestyleCulture category="lifestyle" subcategory="culture" url="/page/lifestyle/culture" />
    <!--- Culture Child Category --->

    <!--- Others Child Category --->
    <lazyCategoryLifestyleOthers category="lifestyle" subcategory="others" url="/page/lifestyle/others" />
    <!--- Others Child Category --->
  </div>
</template>
