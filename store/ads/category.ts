import { defineStore } from 'pinia'
import { AdsPosition } from '~/types/ads'

export interface AdsState {
  positions: AdsPosition[]
}

export const useAdsCategoryStore = defineStore('adsCategory', {
  state: (): AdsState => {
    return {
      positions: [],
    }
  },
  getters: {
    adsRight: (state) =>
      state.positions.find(
        (item) => item.section === 'main' && item.name === '2nd_column_1'
      )?.ads,
    adsMain: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'main' && item.name === 'ad_under_main_section'
      )?.ads,
    adsChild1: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'between_child_category' &&
          item.name === 'ad_between_child_category_section_1'
      )?.ads,
    adsChild2: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'between_child_category' &&
          item.name === 'ad_between_child_category_section_1'
      )?.ads,
    adsChild3: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'between_child_category' &&
          item.name === 'ad_between_child_category_section_1'
      )?.ads,
    adsChild4: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'between_child_category' &&
          item.name === 'ad_between_child_category_section_1'
      )?.ads,
    adsChild5: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'between_child_category' &&
          item.name === 'ad_between_child_category_section_1'
      )?.ads,
    adsMore: (state) =>
      state.positions.find(
        (item) =>
          item.section === 'more_section' && item.name === 'above_more_section'
      )?.ads,
  },
  actions: {
    // get home page ads
    async getCategoryPageAds() {
      try {
        const response = await fetch(`/api/revenue/category_with_child`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const { data } = await response.json()

        this.positions = data
      } catch (e) {}
    },
  },
})
