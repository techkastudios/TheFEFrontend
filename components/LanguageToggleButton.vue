<template>
  <div class="w-16 -mr-4 m-auto sm:ml-4">
    <label
      for="mLang"
      class="flex block cursor-pointer bg-gray-500 h-6 rounded-full sm:h-8"
      @change.prevent="seti18nLang(selectedLang)"
    >
      <div class="relative">
        <!-- input -->
        <input id="mLang" type="checkbox" name="lang" class="sr-only" :value="$i18n.locale" />
        <div
          v-if="$i18n.locale === 'en'"
          class="block uppercase text-white text-left en-text sm:leading-8"
        >BN</div>
        <div
          v-if="$i18n.locale === 'bangla'"
          class="block uppercase text-white text-right bn-text sm:leading-8"
        >EN</div>
        <div :class="`dot dot-${$i18n.locale}`"></div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'LanguageToggleButton',
  props: {},
  data() {
    return {
      selectedLang: this.$i18n.locale || 'en',
    }
  },
  mounted() {
    const defaultLang = this.$i18n.locale
    localStorage.setItem('lang', defaultLang)
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    seti18nLang(langCode) {

      // Redirect to the external website
      window.location.href = "https://bangla.thefinancialexpress.com.bd/";
      // let switchLang = 'en'

      // if (langCode === 'en') {
      //   switchLang = 'bangla'
      // }
      // let localLangPath = this.switchLocalePath(switchLang)

      // if (langCode === 'bangla') {
      //   localLangPath = '/'
      // } else {
      //   localLangPath = '/bangla'
      // }

      // if (switchLang === 'bangla') {
      //   localStorage.setItem('lang', 'bn')
      // } else {
      //   localStorage.setItem('lang', 'en')
      // }

      // this.$router.push(localLangPath)
      // this.selectedLang = switchLang
      // this.$i18n.locale = lang

      // if (switchLang === 'bangla') {
      //   localStorage.setItem('lang', 'bn')
      // } else {
      //   localStorage.setItem('lang', switchLang)
      // }
    },
  },
}
</script>
<style scoped>
@keyframes en_key {
  from {
    left: 5px;
  }

  to {
    left: 38px;
  }
}

@keyframes bn_key {
  from {
    left: 38px;
  }

  to {
    left: 5px;
  }
}

.dot {
  position: absolute;
  top: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.3s;
  background: #fff;
  transition: left 0.1s linear 0.1s;
  animation-duration: 0.1s;
}

/* input:checked ~ .dot {
  background-color: #48bb78;
} */

.en-text {
  margin-left: 14px;
  transition: margin 2s linear 0.1s;
}

.bn-text {
  margin-left: 30px;
  transition: margin 2s linear 1s;
}

.dot-bangla {
  left: 5px;
  animation-name: bn_key;
}

.dot-en {
  left: 38px;
  animation-name: en_key;
}

.min-lang-toggle .dot {
  top: 2px;
}
</style>
