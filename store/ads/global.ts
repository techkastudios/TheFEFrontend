import { defineStore } from 'pinia'
import { AdsPosition } from '~/types/ads'

export interface AdsState {
  positions: AdsPosition[]
}

export const useAdsGlobalStore = defineStore('adsGlobal', {
  state: (): AdsState => {
    return {
      positions: [],
    }
  },
  getters: {
    globalLeaderboard: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'global' && item.name === 'header_ad_above_the_logo'
      )?.ads,
  },
  actions: {
    // get home page ads
    async getGlobalPageAds() {
      try {
        const response = await fetch(
          `https://api.thefinancialexpress.com.bd/api/revenue/global`
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
