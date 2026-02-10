<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  PropType
} from '@nuxtjs/composition-api'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'VElectionCountDown',
  props: {
    ads: {
      type: Object as PropType<Advertisement>,
      default: null,
    }
  },
  setup() {
    const daysLeft = ref<number | null>(null)
    const timeLeft = ref<string>('00:00:00')
    let interval: any = null

    const calculateTime = () => {
      const target = new Date('2026-02-12T00:00:00').getTime()
      const now = new Date().getTime()
      const diff = target - now

      if (diff <= 0) {
        daysLeft.value = 0
        timeLeft.value = '00:00:00'
        return
      }

      // Days
      daysLeft.value = Math.floor(diff / (1000 * 60 * 60 * 24))

      // Remaining time
      const remainder = diff % (1000 * 60 * 60 * 24)

      const hours = Math.floor(remainder / (1000 * 60 * 60))
      const minutes = Math.floor((remainder % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((remainder % (1000 * 60)) / 1000)

      timeLeft.value = `${String(hours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    onMounted(() => {
      calculateTime()
      interval = setInterval(calculateTime, 1000)
    })

    onBeforeUnmount(() => {
      if (interval) clearInterval(interval)
    })

    return { daysLeft, timeLeft }
  },
})
</script>

<template>
  <div class="grid grid-flow-row mb-4">
    <!-- Header -->
    <header
      class="bg-bg7-light dark:bg-bg7-dark p-1.5 text-center uppercase font-bold text-lg text-white"
    >
      Countdown to <br />
      <span class="text-xl"> National Election 2026 </span>
    </header>

    <!-- Countdown Body -->
    <div class="bg-white p-4 relative flex flex-col items-center justify-center gap-0">
      <!-- Days -->
      <div class="relative text-center">
        <span
          v-if="daysLeft !== null"
          class="text-[100px] leading-none text-red-600 font-bold"
        >
          {{ daysLeft }}
        </span>
        <span
          class="absolute bottom-1 text-md text-red-600 font-semibold uppercase"
        >
          Days
        </span>
      </div>

      <!-- Time HH:MM:SS -->
      <div class="text-center">
        <div class="text-4xl font-bold text-red-600">
          {{ timeLeft }}
        </div>
      </div>
    </div>

    <!-- Optional Ad Section -->
    <v-ads v-if="ads" :ads="ads" />
  </div>
</template>
