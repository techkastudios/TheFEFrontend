// store/ads/adTrack.ts
import { defineStore } from 'pinia';

export const useAdTrackStore = defineStore('adTrack', {
  actions: {
    // Track view count for an ad
    async trackAdView(adId: number) {
      try {
        await fetch(`https://api.thefinancialexpress.com.bd/api/ads/${adId}/view`, { method: 'POST' });
      } catch (error) {
        console.error("Error tracking ad view:", error);
      }
    },

    // Track click count for an ad
    async trackAdClick(adId: number) {
      try {
        await fetch(`https://api.thefinancialexpress.com.bd/api/ads/${adId}/click`, { method: 'POST' });
      } catch (error) {
        console.error("Error tracking ad click:", error);
      }
    },
  },
});
