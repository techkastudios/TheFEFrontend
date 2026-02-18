<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useWindowSize } from '@vueuse/core'
import { useAdsHomeStore } from '~/store/ads/home'

export default defineComponent({
  name: 'Home',

  setup() {
    const adsHomeStore = useAdsHomeStore()
    const { i18n } = useContext()
    const selectedLanuage = i18n?.locale === 'bangla' ? 'bn' : 'en'
    const { width } = useWindowSize()

    // load ads
    adsHomeStore.getHomePageAds()
    return {
      adsHomeStore,
      selectedLanuage,
      width
    }
  },
  mounted() {

    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      if (window.scrollY > 100) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      window.addEventListener('beforeunload', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  },
})
</script>

<template>
  <!-- Notice: Undermaintanance mode -->
    <div class="py-5">
      <v-container>
        <div
          class="text-4xl text-center py-2"
        >We are currently performing maintenance to improve system performance and stability.
During this time, the website may be temporarily unavailable.
We expect to restore full access shortly.</div>
        <div class="text-7xl text-center">Thank you for your continued support and understanding.</div>
      </v-container>
    </div>
  <div>
    <!-- ads 1 -->
    <!-- <v-container class="hidden md:block"> -->
    <v-container>
      <div v-if="width >= 512" class="grid mt-4">
        <v-ads v-if="adsHomeStore.bellowMainMenuAds1" :ads="adsHomeStore.bellowMainMenuAds1" />
        <client-only v-else>
          <Adsense
            style="display: block; height: 90px;"
            data-ad-client="ca-pub-3438694616169600"
            data-ad-slot="2838794797"
            data-full-width-responsive="yes"
            is-new-ads-code="yes"
            data-ad-format="horizontal"
          />
        </client-only>
      </div>
      <div v-else>
          <v-ads v-if="adsHomeStore.bellowMainMenuAds1" :ads="adsHomeStore.bellowMainMenuAds1" />
          <client-only v-else>
            <!-- <Adsense
            data-ad-client="ca-pub-3438694616169600"
            data-ad-slot="3025948319"
            data-full-width-responsive="yes"
            is-new-ads-code="yes"
            data-ad-format="auto"
            ins-class="text-center mb-4"
            /> -->
          </client-only>
      </div>
    </v-container>
    <!-- ads 1 -->
    <template v-if="selectedLanuage === 'bn'">
      <!-- Bangla Category -->
      <div class="mt-4">
        <LazyHomeCategoryBangla
          :ads1="adsHomeStore.banglaAds1"
          :ads2="adsHomeStore.banglaAds2"
          :ads3="adsHomeStore.banglaAds3"
        />
      </div>
      <div class="py-5">
        <v-container>
          <div
            class="text-4xl text-center py-2"
          >আমাদের "বাংলা" ওয়েবসাইটের কাজ চলমান রয়েছে শীঘ্রই এটি পাঠকের জন্য উন্মুক্ত করে দেয়া হবে।</div>
          <div class="text-7xl text-center">ধন্যবাদ</div>
        </v-container>
      </div>
      <!-- Bangla Category -->
    </template>
    <template v-else>
      <LazyJustInPost />

      <v-container>
        <div class="grid xl:grid-cols-15 gap-4 mb-4 min-h-screen py-4">
          <!-- column 1 -->
          <LazyHomeMainLeftColumn
            class="col-auto xl:col-span-3 order-2 xl:order-none grid grid-flow-row"
            :ads="adsHomeStore.heroLeftBottom"
          />
          <!-- column 1 -->

          <!-- column 2 -->
          <section class="col-auto xl:col-span-6 order-1 xl:order-none">
            <!-- section 1 -->
            <LazyHomeMainSlider />
            <!-- section 1 -->
            <!-- ads 2 -->
            <div class="py-4 overflow-hidden">
              <v-ads-carousel
                v-if="adsHomeStore.heroUnderSlider"
                :ads="adsHomeStore.heroUnderSlider"
              />
              <client-only v-else>
                <Adsense
                  data-ad-client="ca-pub-3438694616169600"
                  data-ad-slot="2838794797"
                  data-full-width-responsive="yes"
                  is-new-ads-code="yes"
                  data-ad-format="horizontal"
                />
              </client-only>
            </div>
            <!-- ads 2 -->

            <!-- section 2 -->
            <LazyHomeMainColumnTwo />
            <!-- section 2 -->
          </section>
          <!-- column 2 -->

          <!-- column 3 -->
          <section class="col-auto xl:col-span-3 order-3 xl:order-none grid grid-flow-row">
            <!-- live -->
            <LazyHomeMainLiveMedia />
            <!-- live -->
            <LazyHomeMainColumnThree :ads="adsHomeStore.hero3rdColumnBottom" />
          </section>
          <!-- column 3 -->

          <!-- column 4 -->
          <LazyHomeMainRightColumn :ads1="adsHomeStore.heroRightTop" :ads2="adsHomeStore.heroRightBottom" />
          <!-- column 4 -->
        </div>

        <!-- ads -->
        <div class="grid xl:grid-cols-15 gap-4 mb-8">
          <div class="col-auto xl:col-span-6 mr-4 xl:mr-0">
            <div class="flex justify-center items-center">
              <v-ads
                v-if="adsHomeStore.underHeroSectionAd1"
                :ads="adsHomeStore.underHeroSectionAd1"
                class="h-[6.25rem] overflow-hidden flex inline-block align-middle items-center"
              />
              <client-only v-else>
                <Adsense
                  style="min-width: 300px; width: 100%; min-height:100px;"
                  data-ad-client="ca-pub-3438694616169600"
                  data-ad-slot="2838794797"
                  data-full-width-responsive="yes"
                  is-new-ads-code="yes"
                  data-ad-format="horizontal"
                  ins-class="text-center"
                />
              </client-only>
            </div>
          </div>
          <div class="col-auto mr-4 xl:col-span-3 xl:mr-0">
            <div>
              <!-- today's headline -->
              <nuxt-link
                :to="localePath('/all-news')"
                class="bg-red-600 flex items-center rounded shadow-md px-8 space-x-5 h-[3.25rem] justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                >
                  <image
                    id="newspaper"
                    width="28"
                    height="28"
                    xlink:href="data:image/png;base64,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"
                  />
                </svg>
                <v-heading
                  :level="1"
                  class="text-white font-semibold font-heading text-lg align-middle"
                >{{ $t('headings.todays_news') }}</v-heading>
              </nuxt-link>
              <!-- today's headline -->
            </div>
            <div>
              <!--- Google play and app store -->
              <div class="grid grid-flow-col gap-2 mt-2">
                <div class="col-auto">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.financialexpress.financialexpress&pcampaignid=web_share"
                    target="_blank"
                    class="block"
                  >
                    <img src="~/assets/images/android.png" alt />
                  </a>
                </div>
                <div class="col-auto">
                  <a
                    href="https://apps.apple.com/us/app/the-financial-express-bd/id1294491434"
                    target="_blank"
                    class="block"
                  >
                    <img src="~/assets/images/ios.png" alt />
                  </a>
                </div>
              </div>
              <!--- Google play and app store -->
            </div>
          </div>
          <div class="col-auto xl:col-span-6">
            <div class="flex justify-center">
              <v-ads
                v-if="adsHomeStore.underHeroSectionAd2"
                :ads="adsHomeStore.underHeroSectionAd2"
                class="h-[6.25rem] overflow-hidden"
              />
              <client-only v-else>
                <Adsense
                  style="min-width: 300px; width: 100%; min-height:100px;"
                  data-ad-client="ca-pub-3438694616169600"
                  data-ad-slot="2838794797"
                  data-full-width-responsive="yes"
                  is-new-ads-code="yes"
                  data-ad-format="horizontal"
                  ins-class="text-center"
                />
              </client-only>
            </div>
          </div>
        </div>
        <!-- ads -->
      </v-container>

      <!-- Economy Category -->
      <LazyHomeCategoryEconomy :ads="adsHomeStore.economyAds" />
      <!-- Economy Category -->

      <!-- Stock Category -->
      <LazyHomeCategoryStock :ads="adsHomeStore.stockAds" />
      <!-- Stock Category -->

      <!-- Trade Category -->
      <LazyHomeCategoryTrade
        :ads1="adsHomeStore.trade1Ads"
        :ads2="adsHomeStore.trade2Ads"
        :ads3="adsHomeStore.trade3Ads"
      />
      <!-- Trade Category -->

      <!-- National Category -->
      <LazyHomeCategoryNational :ads="adsHomeStore.nationalAds" />
      <!-- National Category -->

      <!-- Bangla Category -->
      <LazyHomeCategoryBangla
        :ads1="adsHomeStore.banglaAds1"
        :ads2="adsHomeStore.banglaAds2"
        :ads3="adsHomeStore.banglaAds3"
      />
      <!-- Bangla Category -->
      <LazyHomeCategoryViewsViews />

      <!-- Views Category -->
      <LazyHomeCategoryViews />
      <!-- Views Category -->

      <!-- Media Category -->
      <LazyHomeMedia :ads="adsHomeStore.mediaAds" />
      <!-- Media Category -->

      <!-- Sport Category -->
      <LazyHomeCategorySport :ads="adsHomeStore.sportsAds" />
      <!-- Sport Category -->

      <!-- Education Category -->
      <LazyHomeCategoryEducation
        :ads1="adsHomeStore.education1Ads"
        :ads2="adsHomeStore.education2Ads"
      />
      <!-- Education Category -->

      <!-- YouthExpress Category -->
      <LazyHomeCategoryYouthExpress :ads="adsHomeStore.youthExpressAds" />
      <!-- LifeStyle Category -->
      <LazyHomeCategoryLifeStyle :ads="adsHomeStore.lifestyleAds" />
      <!-- LifeStyle Category -->

      <!-- World Category -->
      <LazyHomeCategoryWorld
        :ads1="adsHomeStore.world1Ads"
        :ads2="adsHomeStore.world2Ads"
        :ads3="adsHomeStore.world3Ads"
      />
      <!-- World Category -->

      <!-- Finance Category -->
      <!-- <LazyHomeCategoryFinance :ads="adsHomeStore.personalFinanceAds" /> -->
      <!-- Finance Category -->

      <!-- More Category -->
      <LazyHomeCategoryMore />
      <!-- More Category -->

      <!-- Most Read -->
      <LazyHomeMostRead :ads="adsHomeStore.mostReadAds" />
      <!-- Most Read -->
    </template>
  </div>
</template>
