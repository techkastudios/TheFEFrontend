<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Aboutus',
  data() {
    return {}
  },
})
</script>

<template>
  <div id="about-us" ref="target" class="py-8">
    <v-container>
      <v-heading
        :level="2"
        class="font-bold font-heading uppercase text-xl text-white bg-gray py-2 px-5 mb-4"
      >
        <div class="flex items-center">
          <span class="mr-5">{{ $t('headings.sitemap') }}</span>
        </div>
      </v-heading>
      
      <div class="sitemap">
        <div class="category">
            <h2 class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"><a href="https://thefinancialexpress.com.bd/">Home</a></h2>
        </div>
        <div class="category">
            <h2 class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"><a href="https://thefinancialexpress.com.bd/economy">Economy</a></h2>
            <ul>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/economy/bangladesh">Bangladesh</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/economy/global">Global</a></li>
            </ul>
        </div>
        <div class="category">
            <h2 class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"><a href="https://thefinancialexpress.com.bd/stock">Stock</a></h2>
            <ul>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/stock/bangladesh">Bangladesh</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/stock/global">Global</a></li>
            </ul>
        </div>
        <div class="category">
            <h2 class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"><a href="https://thefinancialexpress.com.bd/trade">Trade</a></h2>
        </div>
        <div class="category">
            <h2 class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"><a href="https://thefinancialexpress.com.bd/national">National</a></h2>
            <ul>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/national/politics">Politics</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/national/country">Country</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/national/law-order">Law & Order</a></li>
            </ul>
        </div>
        <div class="category">
            <h2 class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"><a href="https://thefinancialexpress.com.bd/world">World</a></h2>
            <ul>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/world/america">America</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/world/asia-south-asia">Asia/South Asia</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/world/europe">Europe</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/world/africa">Africa</a></li>
            </ul>
        </div>
        <div class="category">
            <h2 class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"><a href="https://thefinancialexpress.com.bd/editorial">Editorial</a></h2>
        </div>
        <div class="category">
            <h2 class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"><a href="https://thefinancialexpress.com.bd/views">Views</a></h2>
            <ul>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/views/reviews">Reviews</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/views/opinions">Opinions</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/views/columns">Columns</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/views/analysis">Analysis</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/views/letters">Letters</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/views/economic-trends-and-insights">Economic Trends and Insights</a></li>
            </ul>
        </div>
        <div class="category">
            <h2 class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-6.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600">More</h2>
            <div class="more-item-card">
                <h3 class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-3.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600"><a href="https://thefinancialexpress.com.bd/education">Education</a></h3>
                <ul>
                  <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/education/article">Article</a></li>
                </ul>
            </div>
            <div class="more-item-card">
                <h3><a class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-3.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/sports">Sports</a></h3>
                <ul>
                    <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/sports/cricket">Cricket</a></li>
                    <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/sports/football">Football</a></li>
                    <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/sports/more-sports">More Sports</a></li>
                </ul>
            </div>
            <div class="more-item-card">
                <h3><a class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-3.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/lifestyle">Lifestyle</a></h3>
                <ul>
                    <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/lifestyle/living">Living</a></li>
                    <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/lifestyle/entertainment">Entertainment</a></li>
                    <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/lifestyle/food">Food</a></li>
                    <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/lifestyle/culture">Culture</a></li>
                    <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/lifestyle/others">Others</a></li>
                </ul>
            </div>
            <div class="more-item-card">
                <h3><a class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-3.5 transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/youth-and-entrepreneurship">Youth and Entrepreneurs</a></h3>
                <ul>
                    <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/youth-and-entrepreneurs/startups">Startups</a></li>
                </ul>
            </div>
            <ul>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/media">Media</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/bangla">Bangla</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/sci-tech">Sci-Tech</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/health">Health</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/environment">Environment</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://thefinancialexpress.com.bd/jobs-and-opportunities">Jobs and Opportunities</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://today.thefinancialexpress.com.bd/">Today's FE</a></li>
                <li><a class="transition-colors hover:text-rose-600 dark:hover:text-rose-600" href="https://epaper.thefinancialexpress.com.bd/">E-Paper</a></li>
            </ul>
        </div>
    </div>


    </v-container>
  </div>
</template>


<style>
  .sitemap {
      display: flex;
      flex-wrap: wrap;
  }

  .sitemap .category {
      flex: 1 1 45%;
      margin: 10px;
      border: 1px solid #cccccc75;
      padding: 10px;
  }

  .more-item-card {
    background: #f2dfce47;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #dddddd85;
    border-radius: 4px;
  }

  .more-item-card h3 a {
    font-weight: 300 !important;
  }

  .more-item-card ul {
    list-style-type: none;
    padding: 0;
  }

  .more-item-card li {
    margin: 5px 0;
  }
</style>