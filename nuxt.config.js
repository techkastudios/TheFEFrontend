export default {
  // Global page headers: https:// go.nuxtjs.dev/config-head
  head: {
    script: [
      // Google Analytics Code
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-S2JHL9S4HZ',
        async: true,
      },
      // Import analitics.js file
      { src: '/js/analitics.js' },
      {
        src: 'https://cse.google.com/cse?cx=03edde0e03b6143f7',
        async: true,
      },
    ],
    title: 'The Financial Express | First Financial Daily of Bangladesh',
    titleTemplate: '%s',
    meta: [
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'The Financial Express',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'The Financial Express | First Financial Daily of Bangladesh',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Get latest stock share market news, financial news, economy news, politics news, breaking news, Bangladesh economy news at The Financial Express.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.APP_URL}/the-financial-express.jpg`,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: `https://thefinancialexpress.com.bd`,
      },
    ],
  },
  publicRuntimeConfig: {
    baseURL: process.env.APP_URL,
    banglaAppUrl: process.env.BANGLA_APP_URL,
    banglaApiUrl: process.env.BANGLA_API_URL,
    axios: {
      browserBaseURL: process.env.API_BASE_URL,
    },
  },
  privateRuntimeConfig: {
    banglaAppUrl: process.env.BANGLA_APP_URL,
    banglaApiUrl: process.env.BANGLA_API_URL,
  },
  // Router
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'CategoryEconomy',
          path: '/economy',
          component: resolve(__dirname, 'pages/-category/economy.vue'),
        },
        {
          name: 'CategoryStock',
          path: '/stock',
          component: resolve(__dirname, 'pages/-category/stock.vue'),
        },
        {
          name: 'CategoryTrade',
          path: '/trade',
          component: resolve(__dirname, 'pages/-category/trade.vue'),
        },
        {
          name: 'CategoryNational',
          path: '/national',
          component: resolve(__dirname, 'pages/-category/national.vue'),
        },
        {
          name: 'CategoryWorld',
          path: '/world',
          component: resolve(__dirname, 'pages/-category/world.vue'),
        },

        {
          name: 'CategoryEducation',
          path: '/education',
          component: resolve(__dirname, 'pages/-category/education.vue'),
        },
        {
          name: 'CategorySciTech',
          path: '/sci-tech',
          component: resolve(__dirname, 'pages/-category/scitech.vue'),
        },
        {
          name: 'CategoryHealth',
          path: '/health',
          component: resolve(__dirname, 'pages/-category/health.vue'),
        },
        {
          name: 'CategorySports',
          path: '/sports',
          component: resolve(__dirname, 'pages/-category/sports.vue'),
        },
        {
          name: 'CategoryLifestyle',
          path: '/lifestyle',
          component: resolve(__dirname, 'pages/-category/lifestyle.vue'),
        },
        {
          name: 'CategoryEntertainment',
          path: '/entertainment',
          component: resolve(__dirname, 'pages/-category/entertainment.vue'),
        },
        {
          name: 'CategoryEnvironment',
          path: '/environment',
          component: resolve(__dirname, 'pages/-category/environment.vue'),
        },
        {
          name: 'CategoryJobsAndOpportunities',
          path: '/jobs-and-opportunities',
          component: resolve(
            __dirname,
            'pages/-category/jobsandopportunities.vue'
          ),
        },
        {
          name: 'CategoryOthers',
          path: '/others',
          component: resolve(__dirname, 'pages/-category/others.vue'),
        },
        {
          name: 'CategoryYouthAndEntrepreneurship',
          path: '/youth-and-entrepreneurship',
          component: resolve(__dirname, 'pages/-category/youth.vue'),
        },
        {
          name: 'CategorySpecialIssues',
          path: '/special-issues',
          component: resolve(__dirname, 'pages/-category/specialissue.vue'),
        },
        {
          name: 'CategoryPersonalFinance',
          path: '/personal-finance',
          component: resolve(__dirname, 'pages/-category/personalfinance.vue'),
        },
        {
          name: 'CategoryEditorial',
          path: '/editorial',
          component: resolve(__dirname, 'pages/-category/editorial.vue'),
        },
        {
          name: 'CategoryViews',
          path: '/views',
          component: resolve(__dirname, 'pages/-category/views.vue'),
        },
        {
          name: 'CategoryBangla',
          path: '/bn',
          component: resolve(__dirname, 'pages/-category/bangla.vue'),
        },
        {
          name: 'Category',
          path: '/:category',
          component: resolve(__dirname, 'pages/-category/index.vue'),
        },
        {
          name: 'SubCategory',
          path: '/:category/:subcategory',
          component: resolve(__dirname, 'pages/-subcategory/index.vue'),
        },
        {
          name: 'CategoryPost',
          path: '/:category/:slug',
          component: resolve(__dirname, 'pages/-post/index.vue'),
        },
        {
          name: 'ReporterPost',
          path: '/reporter/:username',
          component: resolve(__dirname, 'pages/-reporter/index.vue'),
        },
        {
          name: 'SubCategoryPost',
          path: '/:category/:subcategory/:slug',
          component: resolve(__dirname, 'pages/-post/index.vue'),
        }
        // {
        //   name: 'GetHome',
        //   path: '/get-home',
        //   component: resolve(__dirname, 'pages/api/index.vue'),
        // }
      )
    },
  },

  // Global CSS: https:// go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/tailwind.css',
    '~/assets/css/style.scss',
    '~/assets/css/common.css',
    '~/assets/css/fonts.css',
  ],

  // Post css config
  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/],
  },

  // Plugins to run before rendering page: https:// go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fontawesome',
    '~/plugins/vue-slick-carousel.client',
    '~/plugins/vue-google-adsense.client',
    { src: '~/plugins/global-components', ssr: false },
    { src: '~/plugins/mixins' },
    { src: '~/plugins/vue-click-outside' },
  ],

  // Auto import components: https:// go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https:// go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https:// go.nuxtjs.dev/tailwindcss
    '@nuxt/postcss8',
    // composition api
    '@nuxtjs/composition-api/module',
    // pinia store
    '@pinia/nuxt',
    // '@nuxtjs/google-analytics'
  ],

  // Modules: https:// go.nuxtjs.dev/config-modules
  modules: [
    // https:// go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https:// go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // i18n
    '@nuxtjs/i18n',
    // vue bootstrap
    'bootstrap-vue/nuxt',
    // vue social share
    'vue-social-sharing/nuxt',
  ],

  // Axios module configuration: https:// go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL,
    debug: process.env.NODE_ENV !== 'production',
    proxy: false,
  },

  // Axios proxy: https:// axios.nuxtjs.org/options#proxy
  proxy: {
    '/api/': process.env.API_BASE_URL,
    '/api-fake/': {
      target: process.env.API_FAKE_URL,
      pathRewrite: { '^/api-fake/': '' },
    },
  },

  // PWA module configuration: https:// go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: process.env.APP_NAME,
      short_name: process.env.APP_SHORT_NAME,
    },
    meta: {
      theme_color: '#009244',
      ogSiteName: process.env.APP_NAME,
      ogTitle: 'The Financial Express | First Financial Daily of Bangladesh',
      ogDescription:
        'Get latest stock share market news, financial news, economy news, politics news, breaking news, Bangladesh economy news at The Financial Express.',
      ogImage:
        'https://thefinancialexpress.com.bd/img/the-financial-express.png',
      ogHost: process.env.APP_URL,
    },
  },
  // i18n module options
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.js',
        name: 'English',
      },
      {
        code: 'bangla',
        iso: 'bn-BD',
        file: 'bn.js',
        name: 'বাংলা',
      },
    ],
    defaultLocale: 'en',
    // detectBrowserLanguage: false,
    // differentDomains: true,
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'lang',
    //   redirectOn: 'root',
    // },
    baseUrl: process.env.APP_URL,
    lazy: true,
    langDir: '~/locales/',
    vueI18n: {
      fallbackLocale: ['en', 'bangla'],
    },
  },

  // vue bootstrap module options
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    components: ['BDropdown', 'BSidebar', 'BCollapse', 'BModal'],
    directives: ['VBToggle', 'VBModal'],
  },
  // serverMiddleware: ['~/serverMiddleware/api/index'],
  // serverMiddleware: ['~/serverMiddleware/api/index', { path: "api", handler: "~/serverMiddleware/api" }],

  // Build Configuration: https:// go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    // publicPath: process.env.CDN_URL,
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
