import { defineStore } from 'pinia'
import { AdsPosition } from '~/types/ads'

export interface AdsState {
  positions: AdsPosition[]
}

export const useAdsModalStore = defineStore('adsModal', {
  state: (): AdsState => {
    return {
      positions: [],
    }
  },
  getters: {
    topModalAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'top_modal' && item.name === 'top_modal_ad'
      )?.ads,
    centerModalAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'center_modal' && item.name === 'center_modal_ad'
      )?.ads,
    footerModalAds: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'footer_modal' && item.name === 'footer_modal_ad'
      )?.ads,
  },
  actions: {
    // get home page ads
    async getModalPageAds() {
      try {
        const response = await fetch(
          `https://api.thefinancialexpress.com.bd/api/revenue/modal_ad`
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
