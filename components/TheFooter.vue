<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  watch,
  onMounted,
} from '@nuxtjs/composition-api'
import { useAdsModalStore } from '~/store/ads/modal'

export default defineComponent({
  name: 'TheFooter',

  setup() {
    const adsStore = useAdsModalStore()
    adsStore.getModalPageAds()
    const year = new Date().getFullYear()
    const showModal = ref(false)
    const showToastModal = ref(false)
    const { $axios, i18n } = useContext()
    const tostMessage = ref('')

    const menus1 = ref([
      {
        id: 1,
        title: 'home',
        slug: '/',
      },
      {
        id: 2,
        title: 'economy',
        slug: '/economy',
      },
      {
        id: 3,
        title: 'stock',
        slug: '/stock',
      },
      {
        id: 4,
        title: 'trade',
        slug: '/trade',
      },
      {
        id: 5,
        title: 'national',
        slug: '/national',
      },
      {
        id: 6,
        title: 'world',
        slug: '/world',
      },
      {
        id: 7,
        title: 'views',
        slug: '/views',
      },
    ])

    const menus2 = ref([
      {
        id: 1,
        title: 'education',
        slug: '/education',
      },
      {
        id: 2,
        title: 'sci_tech',
        slug: '/sci-tech',
      },
      {
        id: 3,
        title: 'health',
        slug: '/health',
      },
      {
        id: 4,
        title: 'sports',
        slug: '/sports',
      },
      {
        id: 5,
        title: 'lifestyle',
        slug: '/lifestyle',
      },
      {
        id: 6,
        title: 'environment',
        slug: '/environment',
      },
    ])

    const menus3 = ref([
      {
        id: 1,
        title: 'politics',
        slug: '/page/national/politics',
      },
      {
        id: 2,
        title: 'country',
        slug: '/page/national/country',
      },
      {
        id: 3,
        title: 'crime',
        slug: '/page/national/crime',
      },
      {
        id: 4,
        title: 'reviews',
        slug: '/page/views/reviews',
      },
      {
        id: 5,
        title: 'Opinions',
        slug: '/page/views/opinions',
      },
      {
        id: 6,
        title: 'columns',
        slug: '/page/views/columns',
      },
      {
        id: 7,
        title: 'analysis',
        slug: '/page/views/analysis',
      },
      {
        id: 8,
        title: 'letters',
        slug: '/page/views/letters',
      },
      {
        id: 9,
        title: 'economic_trends_and_insights',
        slug: '/page/views/economic-trends-and-insights',
      },
    ])

    const menus4 = ref([
      {
        id: 1,
        title: 'all_news',
        slug: '/all-news',
      },
      // {
      //   id: 2,
      //   title: 'Life Style',
      //   slug: '/',
      // },
      // {
      //   id: 3,
      //   title: 'Youth Express',
      //   slug: '/',
      // },
      // {
      //   id: 4,
      //   title: 'Others',
      //   slug: '/others',
      // },
    ])

    const menus5 = ref([
      {
        id: 1,
        title: 'today_fe',
        slug: 'https://today.thefinancialexpress.com.bd/',
      },
      {
        id: 2,
        title: 'epaper',
        slug: 'https://epaper.thefinancialexpress.com.bd/',
      },
      {
        id: 3,
        title: 'online_rates',
        slug: 'https://fe-bd.sgp1.cdn.digitaloceanspaces.com/files/FE-Online-Rate-Card.pdf',
      },
    ])

    const footerMenus = ref([
      {
        id: 41,
        title: 'about_us',
        slug: '/about-us',
      },
      {
        id: 42,
        title: 'contact_us',
        slug: '/contact-us',
      },
      {
        id: 43,
        title: 'terms_of_Service',
        slug: '/terms-of-Service',
      },
      {
        id: 44,
        title: 'privacy_policy',
        slug: '/privacy-policy',
      },
    ])

    function getMenuStr(title: any) {
      return 'menus.' + title
    }

    // Newsletter handeller
    const isSubscribeTrigger = ref<boolean>(false)
    const subscribeEmail = ref<string>('')
    watch(isSubscribeTrigger, async () => {
      await subscribeNewsletter()
    })

    const subscribeNewsletter = async () => {
      if (isSubscribeTrigger.value) {
        try {
          const email = subscribeEmail.value
          if (email) {
            const url = `api/${i18n.locale}/newsletter/subscribe`
            const { message } = await $axios.$post(url, { email })
            if (message) {
              subscribeEmail.value = ''
              tostMessage.value = message
              showToastModal.value = true

              setTimeout(function () {
                showToastModal.value = false
              }, 4000)
            }
          }
        } catch (error) {
          console.log('Subscribe error: ', error)
        }
        isSubscribeTrigger.value = false
      }
    }
    // Popup ads show
    const isFooterModalAds = ref(false)
    const isTopModalAds = ref(false)
    const footerModalAd = ref()
    const topModalAd = ref()
    onMounted(() => {
      setTimeout(function () {
        // Top modal ad
        const topModalAds = adsStore.topModalAds
        if (topModalAds && topModalAds.isModal) {
          const popupElement = document.querySelector('.adsbygoogle-noablate')
          if (popupElement) {
            popupElement.setAttribute('style', 'display:none !important')
          }
          topModalAd.value = topModalAds
          isTopModalAds.value = true
        }

        // Footer modal ad
        const footerModalAds = adsStore.footerModalAds
        if (footerModalAds && footerModalAds.isModal) {
          const popupElement = document.querySelector('.adsbygoogle-noablate')
          if (popupElement) {
            popupElement.setAttribute('style', 'display:none !important')
          }

          footerModalAd.value = footerModalAds
          isFooterModalAds.value = true
        }
      }, 2000)
    })

    return {
      year,
      menus1,
      menus2,
      menus3,
      menus4,
      menus5,
      footerMenus,
      getMenuStr,
      showModal,
      showToastModal,
      subscribeEmail,
      isSubscribeTrigger,
      tostMessage,
      isFooterModalAds,
      footerModalAd,
      topModalAd,
      isTopModalAds,
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    toggleToasterModal() {
      this.showToastModal = !this.showToastModal
    },
    showTariff() {
      this.showModal = true
    },
    creatSubscribe() {
      // TODO: temp hide newsletter click event
      // const email = this.subscribeEmail
      // if (email) {
      //   this.isSubscribeTrigger = true
      // }
    },
  },
})
</script>

<template>
  <footer class="bg-footer-bottom-light">
    <section class="py-4 xl:pt-14 xl:pb-4">
      <v-container
        tag="div"
        class="grid grid-cols-1 xl:grid-cols-16 gap-4 text-p-dark opacity-90 divide-y-2 xl:divide-y-0"
      >
        <div class="col-auto xl:col-span-6">
          <h4 class="font-bold text-xl">
            {{ $t('editor') }}: {{ $t('editor_name') }}
          </h4>
          <address
            class="mt-4 xl:text-lg font-semibold not-italic"
            v-html="$t('published_info')"
          ></address>
          <p class="font-semibold text-base xl:text-lg mt-4">
            {{ $t('PABX') }} : 02223389780 (Hunting)
          </p>
          <p class="font-semibold text-base xl:text-lg">
            {{ $t('mobile') }}:
            <a href="tel:+8801917231083">01917231083</a>
          </p>
          <p class="font-semibold text-base xl:text-lg">
            {{ $t('fax') }} : 880-2-02223387049
          </p>
          <!-- <p class="font-semibold text-base xl:text-lg">
            {{ $t('chattogram_office') }}:
            <a href="tel:02333368533">02333368533</a>
          </p>-->
          <h1 class="font-bold text-xl pt-2">For Advertisement</h1>
          <p class="font-semibold text-base xl:text-lg">
            {{ $t('phone') }}:
            <a href="tel:+8801323723397">01323723397</a>
          </p>

          <p class="flex items-center font-semibold text-base xl:text-lg">
            <!-- <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-envelope"
    viewBox="0 0 16 16"
  >
    <path
      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
    />
  </svg> -->
            {{ $t('email') }}:
            <a href="mailto:feadvt93@gmail.com" class="ml-1"
              >feadvt93@gmail.com</a
            >
          </p>

          <table class="mt-4">
            <tbody>
              <tr>
                <td class="font-semibold text-base xl:text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                    />
                  </svg>
                </td>
                <td class="font-semibold text-base xl:text-lg px-2">
                  {{ $t('email') }}:
                  <a href="mailto:editor@thefinancialexpress.com.bd"
                    >editor@thefinancialexpress.com.bd</a
                  >
                </td>
              </tr>
              <tr>
                <td></td>
                <td class="font-semibold text-base xl:text-lg px-2">
                  <a href="mailto:fexpress68@gmail.com">fexpress68@gmail.com</a>
                </td>
              </tr>
              <tr>
                <td></td>
                <td class="font-semibold text-base xl:text-lg px-2">
                  <a href="mailto:feonline99@gmail.com">feonline99@gmail.com</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-auto xl:col-span-6">
          <div class="grid grid-cols-2 xl:grid-cols-3 gap-4">
            <div class="col-auto xl:col-span-2 pt-4 xl:pt-0 space-y-3">
              <div class="flex flex-col xl:flex-row">
                <div class="xl:basis-1/2">
                  <h3 class="font-bold text-xl mb-4 uppercase">
                    {{ $t('quick_links') }}
                  </h3>
                  <ul class="space-y-2">
                    <li v-for="menu in menus1" :key="menu.id">
                      <nuxt-link
                        :to="localePath(menu.slug)"
                        class="font-semibold text-base xl:text-lg py-3"
                        >{{ $t(`menus.${menu.title}`) }}</nuxt-link
                      >
                    </li>
                  </ul>
                </div>
                <div class="xl:basis-1/2">
                  <h3 class="font-bold text-xl mb-4 hidden xl:block">
                    --------
                  </h3>
                  <ul class="space-y-2">
                    <li v-for="menu in menus2" :key="menu.id">
                      <nuxt-link
                        :to="localePath(menu.slug)"
                        class="font-semibold text-base xl:text-lg py-3"
                        >{{ $t(getMenuStr(menu.title)) }}</nuxt-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-auto xl:col-span-1 pt-4 xl:pt-0 space-y-3">
              <h3 class="font-bold text-xl mb-4">--------</h3>
              <ul class="space-y-2">
                <li v-for="menu in menus4" :key="menu.id">
                  <nuxt-link
                    :to="localePath(menu.slug)"
                    class="font-semibold text-base xl:text-lg py-3"
                    >{{ $t(getMenuStr(menu.title)) }}</nuxt-link
                  >
                </li>
              </ul>
              <ul class="space-y-2">
                <li v-for="menu in menus5" :key="menu.id">
                  <a
                    :href="menu.slug"
                    class="font-semibold text-base xl:text-lg py-3"
                    >{{ $t(getMenuStr(menu.title)) }}</a
                  >
                </li>
                <li>
                  <a href="javascript:void(0)" @click="showTariff">{{
                    $t('menus.ad_tariff')
                  }}</a>
                </li>
                <nuxt-link to="/sitemap" rel="author">{{
                  $t('headings.sitemap')
                }}</nuxt-link>
                <li>
                  <a href="#">{{ $t('headings.mediakit') }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-auto xl:col-span-4 pt-4 xl:pt-0 space-y-2">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffebdonline&tabs=timeline&width=350&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=596576134909712"
            width="100%"
            height="400"
            style="border: none; overflow: hidden"
            scrolling="no"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            loading="lazy"
          ></iframe>
        </div>
      </v-container>
    </section>
    <section class="pb-4 xl:pb-8">
      <v-container
        tag="div"
        class="grid grid-cols-1 xl:grid-cols-16 gap-4 text-p-dark opacity-90 divide-y-2 xl:divide-y-0"
      >
        <div class="col-auto xl:col-span-6 xl:mb-2">
          <h4 class="font-bold text-xl uppercase mb-2">
            {{ $t('newsletter.title') }}
          </h4>
          <div class="grid grid-flow-col gap-4">
            <input
              v-model="subscribeEmail"
              type="email"
              class="leading-3 text-black rounded"
              placeholder="user@example.com"
            />
            <button
              class="bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded"
              @click.prevent="creatSubscribe"
            >
              {{ $t('buttons.subscribe') }}
            </button>
          </div>
          <p class="mt-2">{{ $t('newsletter.description') }}</p>
        </div>
        <div class="col-auto xl:col-span-10 mt-8">
          <div class="flex space-x-6 mt-2">
            <a
              href="https://www.facebook.com/febdonline"
              target="_blank"
              rel="noopener noreferrer"
              class="share-network-facebook inline-block w-7 h-7 text-p-dark p-0.5 rounded-full text-center"
            >
              <font-awesome-icon :icon="['fab', 'facebook-f']" />
            </a>
            <a
              href="https://www.linkedin.com/company/thefebd"
              target="_blank"
              rel="noopener noreferrer"
              class="share-network-linkedin inline-block w-7 h-7 text-p-dark p-0.5 rounded-full text-center"
            >
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
            <a
              href="https://twitter.com/febdonline"
              target="_blank"
              rel="noopener noreferrer"
              class="share-network-twitter inline-block w-7 h-7 text-p-dark p-0.5 rounded-full text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                style="margin: 4px auto"
              >
                <path
                  d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCZOy7ocZF1VLDXEvqIlQPiA"
              target="_blank"
              rel="noopener noreferrer"
              class="share-network-youtube inline-block w-7 h-7 text-p-dark p-0.5 rounded-full text-center"
            >
              <font-awesome-icon :icon="['fab', 'youtube']" />
            </a>
            <a
              href="https://www.instagram.com/financial.express.bd"
              target="_blank"
              rel="noopener noreferrer"
              class="share-network-instagram inline-block w-7 h-7 text-p-dark p-0.5 rounded-full text-center"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
          </div>
        </div>
      </v-container>
    </section>
    <section class="py-4">
      <v-container
        class="flex flex-wrap justify-between items-center text-p-dark opacity-90"
      >
        <p class="mb-4 xl:mb-0">&copy; {{ year }} - {{ $t('copy_rights') }}</p>

        <ul class="divide-x-2 grid grid-flow-col">
          <li v-for="menu in footerMenus" :key="menu.id" class="px-2">
            <nuxt-link :to="menu.slug" class="font-bold">{{
              $t(getMenuStr(menu.title))
            }}</nuxt-link>
          </li>
        </ul>
      </v-container>
    </section>
    <!--- Start top ads popup --->
    <!-- <template v-if="isTopModalAds">
      <v-top-modal-ads :ads="topModalAd" :options="{isTopPopup: true}"></v-top-modal-ads>
    </template> -->
    <!--- End top ads on popup --->

    <!--- Start footer modal ads --->
    <div
      v-if="isFooterModalAds"
      id="footerPopupAd"
      class="footer-popup popup-ad-modal"
    >
      <v-footer-modal-ads :ads="footerModalAd"></v-footer-modal-ads>
    </div>
    <!--- End footer modal ads --->
    <div
      v-if="showToastModal"
      :class="[showToastModal ? 'is-loaded' : '']"
      class="toaster-modal overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none top-[10px] flex right-4 left-auto"
    >
      <div class="relative w-full h-full max-w-2xl md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-green-500 rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-3 rounded-t dark:border-gray-600"
          >
            <h4 class="text-xl font-semibold text-white-900 text-white">
              {{ tostMessage }}
            </h4>
            <button
              type="button"
              class="text-white-400 text-white bg-transparent hover:text-white-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-hide="staticModal"
              @click="toggleToasterModal"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-full min-h-full md:max-w-5xl md:h-96">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Advertisement Tarrif
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="staticModal"
              @click="toggleModal"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <div
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              <img
                src="~/assets/images/fe-tarriff/fe-tarriff.jpg"
                alt="FE Tarriff"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

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

.toaster-modal {
  opacity: 0;
  animation: fadeout 2s;
}

.is-loaded {
  opacity: 1;
  animation: fadein 2s;
}
</style>
