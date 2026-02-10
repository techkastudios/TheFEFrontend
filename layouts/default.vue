<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useAdsCategoryStore } from '~/store/ads/category'
import { useAdsGlobalStore } from '~/store/ads/global'
import TheScrollBar from '~/components/TheScrollBar.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: { TheScrollBar },
  setup() {
    const adsStore = useAdsGlobalStore()
    const adsCategoryStore = useAdsCategoryStore()
    // load ads
    adsStore.getGlobalPageAds()
    onMounted(() => adsCategoryStore.getCategoryPageAds())
    return {
      adsStore,
    }
  },
  head() {
    return {
      ...this.$nuxtI18nHead({ addSeoAttributes: true }),
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'http://schema.org',
            '@type': 'Newspaper',
            name: 'The Financial Express',
            url: 'https://thefinancialexpress.com.bd',
            sameAs: [
              'https://www.facebook.com/febdonline',
              'https://www.linkedin.com/company/thefebd',
              'https://twitter.com/febdonline',
              'https://www.youtube.com/channel/UCZOy7ocZF1VLDXEvqIlQPiA',
              'https://www.instagram.com/financial.express.bd',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress:
                'Tropicana Tower (4th floor), 45, Topkhana Road, GPO Box : 2526',
              addressRegion: 'Dhaka',
              postalCode: '1000',
              addressCountry: 'BD',
            },
          },
        },
      ],
    }
  },
})
</script>

<template>
  <div>
    <!-- ads -->
    <div class="my-6 text-center" style="display: none">
      <div class="max-w-3xl mx-auto">
        <v-ads v-if="adsStore.globalLeaderboard" :ads="adsStore.globalLeaderboard" />
        <client-only v-else>
          <Adsense
            data-ad-client="ca-pub-3438694616169600"
            data-ad-slot="2838794797"
            data-full-width-responsive="yes"
            data-ad-format
            is-new-ads-code="yes"
            ins-style="display: inline-block; height: 90px; width: 720px;"
          />
        </client-only>
      </div>
    </div>
    <!-- ads -->
    <TheHeader />

    <TheSidebar />
    <main>
      <Nuxt />
    </main>
    <TheScrollBar />
    <TheFooter />
  </div>
</template>
