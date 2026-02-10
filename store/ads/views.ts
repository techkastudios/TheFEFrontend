import { defineStore } from 'pinia'
import { AdsPosition } from '~/types/ads'

export interface AdsState {
  positions: AdsPosition[]
}

export const useAdsViewsStore = defineStore('adsViews', {
  state: (): AdsState => {
    return {
      positions: [],
    }
  },
  getters: {
    mainAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'main' && item.name === 'under_views_main_section'
      )?.ads,
    reviewsAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'reviews' && item.name === 'under_review_section'
      )?.ads,
    opinionsAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'opinions' && item.name === 'under_opinion_section'
      )?.ads,
    columnsAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'columns' && item.name === 'under_column_section'
      )?.ads,
    analysisAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'analysis' && item.name === 'under_analysis_section'
      )?.ads,
    lettersAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'letters' && item.name === 'under_letter_section'
      )?.ads,
    economicTrendsAndInsightsAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'economic_trends_and_insights' &&
          item.name === 'under_economic_trends_and_insights_section'
      )?.ads,
  },
  actions: {
    // get home page ads
    async getViewsPageAds() {
      try {
        const response = await fetch(
          `https://api.thefinancialexpress.com.bd/api/revenue/views`
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const { data } = await response.json()

        this.positions = data
      } catch (e) {}
    },
  },
})
