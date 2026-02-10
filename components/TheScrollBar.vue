<template>
  <div :class="[
    isScrolable ? 'is-loaded' : '',
    'scrollup bg-bg7-light dark:bg-bg7-dark',
  ]" @click="handleSetScroll">
    <svg width="30px" height="30px" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M6.837 18.163C6.471 17.797 6.471 17.203 6.837 16.837L14.337 9.337C14.703 8.971 15.297 8.971 15.663 9.337L23.163 16.837C23.529 17.203 23.529 17.797 23.163 18.163C22.797 18.529 22.203 18.529 21.837 18.163L15 11.326L8.163 18.163C7.797 18.529 7.203 18.529 6.837 18.163Z"
        fill="#030D45" />
    </svg>
  </div>
</template>

<script>
export default {
  ssr: false,
  data() {
    return {
      isScrolable: false,
    }
  },
  created() {
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed() {
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    handleScroll() {
      // eslint-disable-next-line nuxt/no-globals-in-created
      if (window.scrollY > 100) {
        this.isScrolable = true
      } else {
        this.isScrolable = false
      }
    },
    handleSetScroll() {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style>
@keyframes fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeout {
  100% {
    opacity: 0;
  }

  0% {
    opacity: 1;
  }
}

.scrollup {
  /* background: rgba(0, 0, 0, 0.7); */
  border-radius: 50%;
  font-size: 0;
  line-height: 0;
  padding: 0;
  position: fixed;
  bottom: 100px;
  z-index: 9999;
  height: 50px;
  width: 50px;
  right: 50px;
  cursor: pointer;
  opacity: 0;
  animation: fadeout 2s;
}

.is-loaded {
  opacity: 1;
  animation: fadein 2s;
}

.scrollup svg {
  margin: 10px;
}

.scrollup svg path {
  fill: #fff;
}
</style>
