<script lang="ts">
import dayjs from 'dayjs'
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  watchEffect,
  computed,
  ssrRef,
  useRouter,
  useRoute,
  onMounted,
  defineAsyncComponent,
  watch,
} from '@nuxtjs/composition-api'
import {
  breakpointsTailwind,
  useBreakpoints,
  useToggle,
  useWindowScroll,
  useWindowSize,
} from '@vueuse/core'

import VCategoryTimeSearch from '~/components/VCategoryTimeSearch.vue'
import { PostPagination, Posts } from '~/types/posts'
import { CategoryFilter, ReporterFilter } from '~/types/filter'
import LoderSpinner from '~/components/common/LoderSpinner.vue'

const VDatePicker = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    if (process.client) {
      resolve(import('v-calendar/lib/components/date-picker.umd'))
    } else {
      resolve({})
    }
  })
})

export default defineComponent({
  name: 'Search',

  components: { VDatePicker, VCategoryTimeSearch, LoderSpinner },

  setup() {
    const { $axios, query, i18n } = useContext()
    const router = useRouter()
    const route = useRoute()

    const term = computed(() => query.value.q)
    const searchQuery = query.value.q
    const pageQuery = query.value.page
    const perPageQuery = query.value.per_page
    const sortQuery = query.value.sort_by
    const reporterQuery = query.value.reporter
    const categoryQuery = query.value.categories
    const startDateQuery = query.value.start_date
    const endDateQuery = query.value.end_date

    const searchTerm = ref<string>()
    const filterPage = ref<number>(1)
    const filterPerPage = ref<number>(10)
    const filterReporter = ref<number>()
    const filterCategories = ref<number[]>([])
    const selectedCategories = ref<string>()
    const filterSortBy = ref<string>()
    const filterStartDate = ref<string>()
    const filterEndDate = ref<string>()

    if (searchQuery) {
      searchTerm.value = searchQuery.toString()
    }
    if (pageQuery) {
      filterPage.value = +pageQuery
    }
    if (perPageQuery) {
      filterPerPage.value = +perPageQuery
    }
    if (sortQuery) {
      filterSortBy.value = sortQuery.toString()
    }
    if (reporterQuery) {
      filterReporter.value = +reporterQuery
    }
    if (categoryQuery) {
      filterCategories.value = categoryQuery
        .toString()
        .split(',')
        .map((id) => +id)
    }
    if (startDateQuery) {
      filterStartDate.value = startDateQuery.toString()
    }
    if (endDateQuery) {
      filterEndDate.value = endDateQuery.toString()
    }

    const startDate = computed(() => {
      if (filterStartDate.value) {
        return dayjs(filterStartDate.value).format('YYYY-MM-DD')
      }
    })
    const endDate = computed(() => {
      if (filterEndDate.value) {
        return dayjs(filterEndDate.value).format('YYYY-MM-DD')
      }
    })

    const loading = ref(false)
    // const isMoreDataLoading = ref(false)
    const target = ref<HTMLElement>()

    const nextPageUrl = ssrRef('')
    const hasPages = ssrRef(false)
    // const nextPage = computed(() => nextPageUrl.value)
    const hasMorePages = computed(() => hasPages.value)
    const posts = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    useFetch(async () => {
      await search()
    })

    const updatePath = () => {
      router.push({
        path: route.value.path,
        query: {
          q: searchTerm.value,
          reporter: filterReporter.value?.toString(),
          categories: selectedCategories.value,
          sort_by: filterSortBy.value,
          page: filterPage.value?.toString(),
          per_page: filterPerPage.value?.toString(),
          start_date: startDate.value?.toString(),
          end_date: endDate.value?.toString(),
        },
      })
    }

    const search = async () => {
      if (searchTerm.value) {
        loading.value = true
        try {
          // const url = `api/${lang}/post-search`
          const url = `api/${lang}/post-search-result`
          const res = await $axios.$get<PostPagination>(url, {
            params: {
              query: searchTerm.value,
              reporter: filterReporter.value?.toString(),
              categories: selectedCategories.value,
              sort_by: filterSortBy.value,
              page: filterPage.value?.toString(),
              per_page: filterPerPage.value?.toString(),
              start_date: startDate.value,
              end_date: endDate.value,
            },
          })
          // update query params in url
          updatePath()

          posts.value = res.items
          nextPageUrl.value = res.nextPageUrl
          hasPages.value = res.hasPages
        } finally {
          loading.value = false
        }
      }
    }

    watch(filterReporter, async () => {
      await search()
    })
    watch(filterSortBy, async () => {
      await search()
    })
    watch(filterCategories, async () => {
      selectedCategories.value = filterCategories.value.join(',')
      await search()
    })
    watch(filterEndDate, async () => await search())

    const { y } = useWindowScroll()
    const { height } = useWindowSize()
    watchEffect(async () => {
      const targetBottom =
        (target.value?.clientHeight || 0) + (target.value?.offsetTop || 0)
      const windowBottom = height.value + y.value

      if (targetBottom - windowBottom <= 100) {
        if (!loading.value && hasMorePages.value) {
          loading.value = true
          try {
            // isMoreDataLoading.value = true
            const res: PostPagination = await $axios.$get(nextPageUrl.value)
            posts.value = [...posts.value, ...res.items]
            nextPageUrl.value = res.nextPageUrl
            hasPages.value = res.hasPages
            // if (res.nextPageUrl && res.hasPages) {
            //   isMoreDataLoading.value = false
            // }
          } catch (e) {
          } finally {
            loading.value = false
          }
        }
      }
    })

    const breakpoints = useBreakpoints(breakpointsTailwind)

    const isMobileSortOpened = ref(true)
    const isReporterOpend = ref(false)
    const isCategoryOpend = ref(false)
    const isSortOpend = ref(false)
    const isDateOpend = ref(false)
    const openMobileSort = useToggle(isMobileSortOpened)

    const reporters = ref<ReporterFilter[]>([])
    const filteredReporters = ref<ReporterFilter[]>([])
    const categories = ref<CategoryFilter[]>([])

    onMounted(async () => {
      filterSortBy.value = 'desc'
      const url = `api/${lang}/filter/reporters`
      reporters.value = await $axios.$get<ReporterFilter[]>(url)
      filteredReporters.value = reporters.value
      const categoryFilterUrl = `api/${lang}/filter/categories`
      categories.value = await $axios.$get<CategoryFilter[]>(categoryFilterUrl)

      isMobileSortOpened.value = breakpoints.isGreater('xl')
    })

    const authorName = ref('')
    const filterAuthor = () => {
      filteredReporters.value = reporters.value.filter((item) =>
        item.text.toLowerCase().includes(authorName.value.toLowerCase())
      )
    }

    const clearFilter = async () => {
      filterReporter.value = undefined
      filterCategories.value = []
      filterSortBy.value = 'desc'
      filterStartDate.value = undefined
      filterEndDate.value = undefined

      updatePath()
      await search()
    }

    return {
      loading,
      target,
      posts,
      term,
      searchTerm,
      search,
      isMobileSortOpened,
      isReporterOpend,
      isCategoryOpend,
      isSortOpend,
      isDateOpend,
      openMobileSort,
      categories,
      filterReporter,
      filterCategories,
      filterSortBy,
      filterStartDate,
      filterEndDate,
      authorName,
      filterAuthor,
      filteredReporters,
      clearFilter,
    }
  },
  methods: {
    onClickOutside() {},
    resetFilterDropdown(filterType: String) {
      const instance = this
      if (filterType !== 'reporter' && instance.isReporterOpend) {
        instance.isReporterOpend = false
      }
      if (filterType !== 'category' && instance.isCategoryOpend) {
        instance.isCategoryOpend = false
      }
      if (filterType !== 'sortby' && instance.isSortOpend) {
        instance.isSortOpend = false
      }
      if (filterType !== 'date' && instance.isDateOpend) {
        instance.isDateOpend = false
      }
    },
    handleFilterDropdown(event: any | null) {
      const instance = this
      const filterType = event.target.getAttribute('data-type')

      // Reporter
      if (filterType === 'reporter') {
        if (instance.isReporterOpend) {
          instance.isReporterOpend = false
        } else {
          instance.isReporterOpend = true
        }
      }

      // Category
      if (filterType === 'category') {
        if (instance.isCategoryOpend) {
          instance.isCategoryOpend = false
        } else {
          instance.isCategoryOpend = true
        }
      }

      // Sortby
      if (filterType === 'sortby') {
        if (instance.isSortOpend) {
          instance.isSortOpend = false
        } else {
          instance.isSortOpend = true
        }
      }

      // Date
      if (filterType === 'date') {
        if (instance.isDateOpend) {
          instance.isDateOpend = false
        } else {
          instance.isDateOpend = true
        }
      }

      // this.resetFilterDropdown(filterType)
    },
  },
})
</script>

<template>
  <div id="search" ref="target" class="py-4 xl:py-8">
    <v-container>
      <LoderSpinner v-if="loading"></LoderSpinner>
      <div class="grid grid-cols-1 mb-8">
        <div class="col-auto">
          <v-heading
            :level="2"
            class="font-bold uppercase text-lg xl:text-3xl text-h1-light dark:text-h1-dark py-2 mb-2 xl:mb-4"
          >
            <div class="flex items-center">
              <span class="mr-5">{{ $t('headings.search_result') }}</span>
            </div>
          </v-heading>
          <!-- search input -->
          <form class="flex" @submit.prevent="search">
            <div class="flex-grow mr-4">
              <label for="search" class="sr-only">{{ $t('search') }}</label>
              <input
                id="search"
                v-model="searchTerm"
                type="search"
                name="query"
                autocomplete="search"
                class="focus:ring-gray focus:border-gray border-gray-600 rounded-md w-full text-base bg-white dark:bg-bg1-dark"
                :placeholder="$t('search_here')"
                @keyup.enter="search"
              />
            </div>
            <button
              type="submit"
              class="px-4 py-2 bg-gray dark:bg-bg1-dark text-white uppercase text-center font-bold text-xs xl:text-base rounded-md ring-1 ring-gray"
            >{{ $t('buttons.search') }}</button>
          </form>
          <!-- search input -->
        </div>
      </div>
      <!--- Start search filters -->
      <div class="grid grid-cols-1 mb-8">
        <div class="border border-gray xl:border-0 rounded-lg xl:rounded-none">
          <div
            class="flex items-center justify-between cursor-pointer p-2 focus:bg-transparent xl:hidden"
            @click="openMobileSort"
          >
            <span class="font-semibold text-sm">{{ $t('advance_sorting') }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="9"
              viewBox="0 0 10 9"
              class="fill-current"
            >
              <path v-if="isMobileSortOpened" id="Polygon_1" data-name="Polygon 1" d="M5,0l5,9H0Z" />
              <path
                v-else
                id="Polygon_1"
                data-name="Polygon 1"
                d="M5,0l5,9H0Z"
                transform="translate(10 9) rotate(180)"
              />
            </svg>
          </div>
          <v-slide-up-down :active="isMobileSortOpened">
            <div class="flex sm:justify-end xl:justify-between mb-4">
              <v-heading
                :level="3"
                class="hidden xl:block font-bold font-heading uppercase text-xl text-blue-850 bg-blue-350 py-2 px-6 w-[14rem] rounded-md"
              >{{ $t('advance_sorting') }}</v-heading>
              <button
                class="py-1 px-4 rounded-xl ring-2 ring-gray"
                @click.stop="clearFilter"
              >{{ $t('clear') }}</button>
            </div>
            <div class="p-2 xl:p-0 xl:flex xl:space-x-4">
              <!-- reporter -->
              <section class="mb-4 xl:w-full">
                <header
                  v-click-outside="onClickOutside"
                  class="bg-menu-light dark:bg-menu-dark pt-2 px-4 rounded-3xl"
                >
                  <div
                    class="flex items-center justify-between cursor-pointer pb-2 px-2"
                    data-type="reporter"
                    @click.prevent="handleFilterDropdown"
                  >
                    <span class="font-bold text-sm xl:text-lg">
                      {{
                      $t('reporter_author')
                      }}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="9"
                      viewBox="0 0 10 9"
                      class="fill-current"
                    >
                      <path
                        v-if="isReporterOpend"
                        id="reporter"
                        data-name="reporter"
                        d="M5,0l5,9H0Z"
                      />
                      <path
                        v-else
                        id="reporter"
                        data-name="reporter"
                        d="M5,0l5,9H0Z"
                        transform="translate(10 9) rotate(180)"
                      />
                    </svg>
                  </div>

                  <v-slide-up-down :active="isReporterOpend">
                    <div class="bg-menu-light dark:bg-menu-dark py-2 border-t border-t-black">
                      <div class="mb-4">
                        <input
                          v-model="authorName"
                          class="focus:ring-gray focus:border-gray border-gray-600 rounded-md w-full text-base bg-bg1-light dark:bg-bg1-dark"
                          type="search"
                          :placeholder="$t('search_reporter_author')"
                          @keyup="filterAuthor"
                        />
                      </div>
                      <div
                        class="grid grid-flow-row gap-2 p-2 max-h-64 overflow-y-auto overflow-x-hidden"
                      >
                        <label
                          v-for="reporter in filteredReporters"
                          :key="reporter.value"
                          :for="`reporter-${reporter.value}`"
                          class="text-base font-semibold cursor-pointer"
                        >
                          <input
                            :id="`reporter-${reporter.value}`"
                            v-model="filterReporter"
                            type="radio"
                            name="reporter"
                            :value="reporter.value"
                          />
                          <span>{{ reporter.text }}</span>
                        </label>
                      </div>
                    </div>
                  </v-slide-up-down>
                </header>
              </section>
              <!-- reporter -->

              <!-- category -->
              <section class="mb-4 xl:w-full">
                <header
                  v-click-outside="onClickOutside"
                  class="bg-menu-light dark:bg-menu-dark pt-2 px-4 rounded-3xl"
                >
                  <div
                    class="flex items-center justify-between cursor-pointer pb-2 px-2"
                    data-type="category"
                    @click.prevent="handleFilterDropdown"
                  >
                    <span class="font-bold text-sm xl:text-lg">
                      {{
                      $t('headings.category')
                      }}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="9"
                      viewBox="0 0 10 9"
                      class="fill-current"
                    >
                      <path
                        v-if="isCategoryOpend"
                        id="Polygon_1"
                        data-name="Polygon 1"
                        d="M5,0l5,9H0Z"
                      />
                      <path
                        v-else
                        id="Polygon_1"
                        data-name="Polygon 1"
                        d="M5,0l5,9H0Z"
                        transform="translate(10 9) rotate(180)"
                      />
                    </svg>
                  </div>

                  <v-slide-up-down :active="isCategoryOpend">
                    <div class="bg-menu-light dark:bg-menu-dark py-2 border-t border-t-black">
                      <div
                        class="grid grid-flow-row gap-2 p-2 max-h-64 overflow-y-auto overflow-x-hidden"
                      >
                        <template v-for="category in categories">
                          <label
                            :key="category.id"
                            :for="`category-${category.id}`"
                            class="text-base font-semibold cursor-pointer"
                          >
                            <input
                              :id="`category-${category.id}`"
                              v-model="filterCategories"
                              type="checkbox"
                              name="category"
                              :value="category.id"
                            />
                            <span>{{ category.name }}</span>
                          </label>
                          <div
                            :key="category.id + '-children'"
                            class="pl-8 grid grid-flow-row gap-2"
                          >
                            <label
                              v-for="child in category.children"
                              :key="child.id"
                              :for="`category-child-${child.id}`"
                              class="text-base font-semibold cursor-pointer"
                            >
                              <input
                                :id="`category-child-${child.id}`"
                                v-model="filterCategories"
                                type="checkbox"
                                name="category"
                                :value="child.id"
                              />
                              <span>{{ child.name }}</span>
                            </label>
                          </div>
                        </template>
                      </div>
                    </div>
                  </v-slide-up-down>
                </header>
              </section>
              <!-- category -->

              <!-- sort by -->
              <section class="mb-4 xl:w-full">
                <header class="bg-menu-light dark:bg-menu-dark pt-2 px-4 rounded-3xl">
                  <div
                    class="flex items-center justify-between cursor-pointer pb-2 px-2"
                    data-type="sortby"
                    @click.prevent="handleFilterDropdown"
                  >
                    <span class="font-bold text-sm xl:text-lg">{{ $t('filters.sort_by') }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="9"
                      viewBox="0 0 10 9"
                      class="fill-current"
                    >
                      <path
                        v-if="isSortOpend"
                        id="Polygon_1"
                        data-name="Polygon 1"
                        d="M5,0l5,9H0Z"
                      />
                      <path
                        v-else
                        id="Polygon_1"
                        data-name="Polygon 1"
                        d="M5,0l5,9H0Z"
                        transform="translate(10 9) rotate(180)"
                      />
                    </svg>
                  </div>

                  <v-slide-up-down :active="isSortOpend">
                    <div class="bg-menu-light dark:bg-menu-dark py-2 border-t border-t-black">
                      <div
                        class="grid grid-flow-row gap-2 p-2 max-h-64 overflow-y-auto overflow-x-hidden"
                      >
                        <!-- <label for="sort-relevant" class="text-base font-semibold cursor-pointer">
                          <input id="sort-relevant" v-model="filterSortBy" type="radio" name="sort" value="relevant" />
                          <span>{{ $t('filters.most_relevent') }}</span>
                        </label>-->
                        <label for="sort-desc" class="text-base font-semibold cursor-pointer">
                          <input
                            id="sort-desc"
                            v-model="filterSortBy"
                            type="radio"
                            name="sort"
                            value="desc"
                          />
                          <span>{{ $t('filters.new_to_old') }}</span>
                        </label>
                        <label for="sort-asc" class="text-base font-semibold cursor-pointer">
                          <input
                            id="sort-asc"
                            v-model="filterSortBy"
                            type="radio"
                            name="sort"
                            value="asc"
                          />
                          <span>{{ $t('filters.old_to_new') }}</span>
                        </label>
                      </div>
                    </div>
                  </v-slide-up-down>
                </header>
              </section>
              <!-- sort by -->

              <!-- date -->
              <section class="mb-4 xl:w-full">
                <header class="bg-menu-light dark:bg-menu-dark pt-2 px-4 rounded-3xl">
                  <div
                    class="flex items-center justify-between cursor-pointer pb-2 px-2"
                    data-type="date"
                    @click.prevent="handleFilterDropdown"
                  >
                    <span class="font-bold text-sm xl:text-lg">{{ $t('date') }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="9"
                      viewBox="0 0 10 9"
                      class="fill-current"
                    >
                      <path
                        v-if="isDateOpend"
                        id="Polygon_1"
                        data-name="Polygon 1"
                        d="M5,0l5,9H0Z"
                      />
                      <path
                        v-else
                        id="Polygon_1"
                        data-name="Polygon 1"
                        d="M5,0l5,9H0Z"
                        transform="translate(10 9) rotate(180)"
                      />
                    </svg>
                  </div>

                  <v-slide-up-down :active="isDateOpend">
                    <div class="bg-menu-light dark:bg-menu-dark py-2 border-t border-t-black">
                      <div class="p-2">
                        <client-only>
                          <div class="grid grid-cols-9 gap-4 place-items-center">
                            <v-date-picker v-model="filterStartDate" class="col-span-4">
                              <template #default="{ inputValue, inputEvents }">
                                <input
                                  class="focus:ring-gray focus:border-gray border-gray-600 rounded-md w-full text-base bg-bg1-light dark:bg-bg1-dark"
                                  type="text"
                                  :placeholder="$t('start_date')"
                                  readonly
                                  :value="inputValue"
                                  v-on="inputEvents"
                                />
                              </template>
                            </v-date-picker>
                            <span class="col-span-1 px-2 text-lg">~</span>
                            <v-date-picker v-model="filterEndDate" class="col-span-4">
                              <template #default="{ inputValue, inputEvents }">
                                <input
                                  class="focus:ring-gray focus:border-gray border-gray-600 rounded-md w-full text-base bg-bg1-light dark:bg-bg1-dark"
                                  type="text"
                                  :placeholder="$t('end_date')"
                                  readonly
                                  :value="inputValue"
                                  v-on="inputEvents"
                                />
                              </template>
                            </v-date-picker>
                          </div>
                        </client-only>
                      </div>
                    </div>
                  </v-slide-up-down>
                </header>
              </section>
              <!-- date -->

              <section class="flex items-center xl:hidden">
                <button
                  class="py-1 px-4 rounded-xl ring-2 ring-gray text-sm"
                  @click.stop="openMobileSort"
                >{{ $t('buttons.cancel') }}</button>
                <button
                  class="ml-2 py-1 px-4 rounded-xl ring-2 ring-gray bg-gray dark:bg-bg1-dark text-white text-sm"
                  @click.stop="clearFilter"
                >{{ $t('buttons.clear') }}</button>
              </section>
            </div>
          </v-slide-up-down>
        </div>
      </div>
      <!--- End search filters -->
      <div class="grid grid-cols-1">
        <div class="col-auto">
          <div v-if="posts.length > 0" class="divide-y-2 divide-bg2-light dark:divide-bg2-dark">
            <article
              v-for="post in posts"
              :key="post.id"
              class="grid xl:grid-cols-11 gap-4 pb-4 pt-4 first:pt-0 last:pb-0"
            >
              <nuxt-link
                v-if="post.image"
                :to="localePath(post.slug)"
                class="col-auto xl:col-span-4"
              >
                <figure>
                  <v-img :src="post.image" :alt="post.title" />
                </figure>
              </nuxt-link>
              <div class="col-auto xl:col-span-7 flex flex-col justify-between">
                <div>
                  <v-category-time-search
                    :category="post.category"
                    :category-slug="post.categorySlug"
                    :published-at="post.publishedAt"
                  />
                  <v-heading
                    class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
                  >
                    <nuxt-link :to="localePath(post.slug)">{{post.title || post.shortTitle}}</nuxt-link>
                  </v-heading>
                  <template v-if="post.excerpt">
                    <p
                      class="text-p-light dark:text-p-dark text-base leading-5 line-clamp-5 merriweather-sans-normal"
                      v-html="post.excerpt"
                    ></p>
                  </template>
                  <template v-else-if="post.content">
                    <p
                      class="text-p-light dark:text-p-dark text-base leading-5 line-clamp-5 merriweather-sans-normal"
                      v-html="post.content"
                    ></p>
                  </template>
                </div>

                <p
                  v-if="post.reporter"
                  class="text-p-light dark:text-p-dark py-1 xl:py-2 font-semibold uppercase text-xs opacity-80"
                  rel="author"
                >
                  <nuxt-link
                    :to="localePath(`/reporter/${post.reporter_username}`)"
                    rel="author"
                  >{{ post.reporter }}</nuxt-link>
                </p>
              </div>
            </article>
          </div>
          <div v-else class="h-40 flex items-center justify-center">
            <h1 class="font-extrabold text-3xl uppercase text-pink-600">{{ $t('no_result_found') }}</h1>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
