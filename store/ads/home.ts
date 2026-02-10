import { useContext } from '@nuxtjs/composition-api'

import { defineStore } from 'pinia'
import { AdsPosition } from '~/types/ads'

export interface AdsState {
  positions: AdsPosition[]
}

export const useAdsHomeStore = defineStore('adsHome', {
  state: (): AdsState => {
    return {
      positions: [],
    }
  },
  getters: {
    heroLeftBottom: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'hero_section' &&
          item.name === 'hero_section_1st_column_bottom'
      )?.ads,
    hero3rdColumnBottom: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'hero_section' &&
          item.name === 'hero_section_3rd_column_bottom'
      )?.ads,
    heroRightTop: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'hero_section' &&
          item.name === 'hero_section_4th_column_top'
      )?.ads,
    heroRightBottom: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'hero_section' &&
          item.name === 'hero_section_4th_column_bottom'
      )?.ads,
    heroUnderSlider: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'hero_section' && item.name === 'under_main_slider'
      )?.ads,
    heroLeaderboard: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'hero_section' &&
          item.name === 'between_hero_and_economy_section'
      )?.ads,
    bellowMainMenuAds1: (state) =>
      state.positions.find(
        (item) => item.section === 'bellow_main_menu' && item.name === 'ads_1'
      )?.ads,
    bellowMainMenuAds2: (state) =>
      state.positions.find(
        (item) => item.section === 'bellow_main_menu' && item.name === 'ads_2'
      )?.ads,
    bellowMainMenuAds3: (state) =>
      state.positions.find(
        (item) => item.section === 'bellow_main_menu' && item.name === 'ads_3'
      )?.ads,
    bellowMainMenuAds4: (state) =>
      state.positions.find(
        (item) => item.section === 'bellow_main_menu' && item.name === 'ads_4'
      )?.ads,
    underHeroSectionAd1: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'hero_section' &&
          item.name === 'under_hero_section_ad_1'
      )?.ads,
    underHeroSectionAd2: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'hero_section' &&
          item.name === 'under_hero_section_ad_2'
      )?.ads,
    economyAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'economy' && item.name === 'under_economy_section'
      )?.ads,
    mostReadAds: (state) =>
      state.positions.find(
        (item) => item.section === 'most_read' && item.name === '4th_column_mr'
      )?.ads,
    stockAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'stock' && item.name === 'under_stock_section'
      )?.ads,
    banglaAds1: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'bangla' && item.name === 'bangla_4th_column_ad_1'
      )?.ads,
    banglaAds2: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'bangla' && item.name === 'bangla_4th_column_ad_2'
      )?.ads,
    banglaAds3: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'bangla' && item.name === 'under_bangla_section'
      )?.ads,
    trade1Ads: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'trade' && item.name === 'trade_4th_column_ad_1'
      )?.ads,
    trade2Ads: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'trade' && item.name === 'trade_4th_column_ad_2'
      )?.ads,
    trade3Ads: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'trade' && item.name === 'under_trade_section'
      )?.ads,
    nationalAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'national' && item.name === 'under_national_section'
      )?.ads,
    mediaAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'media' && item.name === 'under_media_section'
      )?.ads,
    sportsAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'sports' && item.name === 'under_sports_section'
      )?.ads,
    education1Ads: (state) =>
      state.positions.find(
        (item) => item.section === 'education' && item.name === '4th_column_edu'
      )?.ads,
    education2Ads: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'education' &&
          item.name === 'under_education_section'
      )?.ads,
    world1Ads: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'world' && item.name === 'world_4th_column_ad_1'
      )?.ads,
    world2Ads: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'world' && item.name === 'world_4th_column_ad_2'
      )?.ads,
    world3Ads: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'world' && item.name === 'under_world_section'
      )?.ads,
    youthExpressAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'youth_and_entrepreneurship' &&
          item.name === 'under_youth_section'
      )?.ads,
    lifestyleAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'lifestyle' &&
          item.name === 'under_lifestyle_section'
      )?.ads,
    personalFinanceAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'personal_finance' &&
          item.name === 'under_personal_finance_section'
      )?.ads,
  },
  actions: {
    // get home page ads
    async getHomePageAds() {
      try {
        // const response = await fetch(
        //   `https://api.thefinancialexpress.com.bd/api/revenue/home`
        //)
        // Use useRuntimeConfig from Nuxt 2 to access runtime config
        const { $config } = useContext()
        const baseUrl = $config.axios.browserBaseURL || ''
        const response = await fetch(`${baseUrl}/api/revenue/home`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const { data } = await response.json()

        this.positions = data
      } catch (e) {}
    },
  },
})
