<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TheSidebar',
  setup() {
    const menus = ref([
      {
        id: 1,
        title: 'home',
        key: 'home',
        slug: '/',
      },
      {
        id: 2,
        title: 'economy',
        key: 'economy',
        slug: '/economy',
        hasChildren: true,
        children: [
          {
            id: 1,
            title: 'bangladesh',
            key: 'bangladesh',
            slug: '/page/economy/bangladesh',
          },
          {
            id: 2,
            title: 'global',
            key: 'global',
            slug: '/page/economy/global',
          },
        ],
      },
      {
        id: 3,
        title: 'stock',
        key: 'stock',
        slug: '/stock',
        hasChildren: true,
        children: [
          {
            id: 1,
            title: 'bangladesh',
            key: 'bangladesh',
            slug: '/page/stock/bangladesh',
          },
          {
            id: 2,
            title: 'global',
            key: 'global',
            slug: '/page/stock/global',
          },
        ],
      },
      {
        id: 4,
        title: 'trade',
        key: 'trade',
        slug: '/trade',
      },
      {
        id: 5,
        title: 'national',
        key: 'national',
        slug: '/national',
        hasChildren: true,
        children: [
          {
            id: 1,
            title: 'politics',
            key: 'politics',
            slug: '/page/national/politics',
          },
          {
            id: 2,
            title: 'country',
            key: 'country',
            slug: '/page/national/country',
          },
          {
            id: 3,
            title: 'crime',
            key: 'crime',
            slug: '/page/national/crime',
          },
        ],
      },
      {
        id: 6,
        title: 'world',
        key: 'world',
        slug: '/world',
        hasChildren: true,
        children: [
          {
            id: 1,
            title: 'america',
            key: 'america',
            slug: '/page/world/america',
          },
          {
            id: 2,
            title: 'asia',
            key: 'asia',
            slug: '/page/world/asia',
          },
          {
            id: 3,
            title: 'europe',
            key: 'europe',
            slug: '/page/world/europe',
          },
          {
            id: 4,
            title: 'africa',
            key: 'africa',
            slug: '/page/world/africa',
          },
        ],
      },
      {
        id: 7,
        title: 'editorial',
        key: 'editorial',
        slug: '/editorial',
      },
      {
        id: 8,
        title: 'views',
        key: 'views',
        slug: '/views',
        hasChildren: true,
        children: [
          {
            id: 1,
            title: 'views',
            key: 'views',
            slug: '/page/views/views',
          },
          {
            id: 2,
            title: 'reviews',
            key: 'reviews',
            slug: '/page/views/reviews',
          },
          {
            id: 3,
            title: 'opinions',
            key: 'opinions',
            slug: '/page/views/opinions',
          },
          {
            id: 4,
            title: 'columns',
            key: 'columns',
            slug: '/page/views/columns',
          },
          {
            id: 5,
            title: 'analysis',
            key: 'analysis',
            slug: '/page/views/analysis',
          },
          {
            id: 6,
            title: 'letters',
            key: 'letters',
            slug: '/page/views/letters',
          },
          {
            id: 7,
            title: 'economic_trends_and_insights',
            key: 'economic-trends-and-insights',
            slug: '/page/views/economic-trends-and-insights',
          },
        ],
      },
      {
        id: 9,
        title: 'more',
        key: 'more',
        slug: '/',
        hasChildren: true,
        children: [
          {
            id: 1,
            title: 'education',
            key: 'education',
            slug: '/education',
            hasChildren: true,
            children: [
              {
                id: 1,
                title: 'article',
                key: 'article',
                slug: '/page/education/article',
              },
            ],
          },
          {
            id: 2,
            title: 'sci_tech',
            key: 'sci-tech',
            slug: '/sci-tech',
          },
          {
            id: 3,
            title: 'health',
            key: 'health',
            slug: '/health',
          },
          {
            id: 4,
            title: 'sports',
            key: 'sports',
            slug: '/sports',
            hasChildren: true,
            children: [
              {
                id: 1,
                title: 'cricket',
                key: 'cricket',
                slug: '/page/sports/cricket',
              },
              {
                id: 2,
                title: 'football',
                key: 'football',
                slug: '/page/sports/football',
              },
              {
                id: 3,
                title: 'more_sports',
                key: 'more-sports',
                slug: '/page/sports/more-sports',
              },
            ],
          },
          {
            id: 5,
            title: 'lifestyle',
            key: 'lifestyle',
            slug: '/lifestyle',
            hasChildren: true,
            children: [
              {
                id: 1,
                title: 'living',
                key: 'living',
                slug: '/page/lifestyle/living',
              },
              {
                id: 2,
                title: 'entertainment',
                key: 'entertainment',
                slug: '/page/lifestyle/entertainment',
              },
              {
                id: 3,
                title: 'food',
                key: 'food',
                slug: '/page/lifestyle/food',
              },
              {
                id: 4,
                title: 'culture',
                key: 'culture',
                slug: '/page/lifestyle/culture',
              },
              {
                id: 5,
                title: 'others',
                key: 'others',
                slug: '/page/lifestyle/others',
              },
              // {
              //   id: 6,
              //   title: 'gallery',
              //   key: 'gallery',
              //   slug: '/page/lifestyle/gallery',
              // },
            ],
          },
          {
            id: 6,
            title: 'environment',
            key: 'environment',
            slug: '/environment',
          },
          {
            id: 7,
            title: 'jobs_and_opportunities',
            key: 'jobs-and-opportunities',
            slug: '/jobs-and-opportunities',
          },
          // {
          //   id: 8,
          //   title: 'others',
          //   key: 'others',
          //   slug: '/others',
          // },
          {
            id: 9,
            title: 'youth_and_entrepreneurs',
            key: 'youth-and-entrepreneurship',
            slug: '/youth-and-entrepreneurship',
            hasChildren: true,
            children: [
              // {
              //   id: 1,
              //   title: 'youth',
              //   key: 'youth',
              //   slug: '/page/youth-and-entrepreneurship/youth',
              // },
              // {
              //   id: 2,
              //   title: 'entrepreneurship',
              //   key: 'entrepreneurship',
              //   slug: '/page/youth-and-entrepreneurship/entrepreneurship',
              // },
              {
                id: 3,
                title: 'startups',
                key: 'startups',
                slug: '/page/youth-and-entrepreneurship/startups',
              },
            ],
          },
        ],
      },
      {
        id: 10,
        title: 'all_news',
        key: 'all-news',
        slug: '/all-news',
      },
      {
        id: 11,
        title: 'fe_today',
        key: 'fe_today',
        slug: 'https://today.thefinancialexpress.com.bd',
        isException: true,
      },
      // {
      //   id: 12,
      //   title: 'fe_e_paper',
      //   key: 'fe_e_paper',
      //   slug: 'https://epaper.thefinancialexpress.com.bd',
      //   isException: true,
      // },
      {
        id: 13,
        title: 'budget_2025_26',
        key: 'budget_2025_26',
        slug: 'https://today.thefinancialexpress.com.bd/budget-2025-26',
        isException: true,
      },
      {
        id: 14,
        title: 'archive',
        key: 'archive',
        slug: 'https://today.thefinancialexpress.com.bd/archive',
        isException: true,
      },
      {
        id: 15,
        title: '33rd_year_of_publication',
        key: '33rd_year_of_publication',
        slug: '#',
        hasChildren: true,
        children: [
          {
            id: 1,
            title: '32nd_anniversary_issue_1',
            key: '32nd-anniversary-issue-1',
            slug: 'https://today.thefinancialexpress.com.bd/32nd-anniversary-issue-1',
            isException: true,
          },
          {
            id: 2,
            title: '32nd_anniversary_issue_2',
            key: '32nd-anniversary-issue-2',
            slug: 'https://today.thefinancialexpress.com.bd/32nd-anniversary-issue-2',
            isException: true,
          },
          {
            id: 3,
            title: '32nd_anniversary_issue_3',
            key: '32nd-anniversary-issue-3',
            slug: 'https://today.thefinancialexpress.com.bd/32nd-anniversary-issue-3',
            isException: true,
          },
        ],
      },
    ])

    return {
      menus,
    }
  },
})
</script>

<template>
  <b-sidebar
    id="sidebar"
    tag="aside"
    title="The Financial Express"
    backdrop
    lazy
    backdrop-variant="dark backdrop-filter backdrop-grayscale"
    :sidebar-class="[
      'bg-bg2-light dark:bg-bg2-dark ring-bg6-light dark:ring-bg6-dark merriweather-sans-bold',
    ]"
    :header-class="['border-bg6-light dark:border-bg6-dark border-b-2']"
  >
    <nav class="px-4 py-2">
      <div
        id="accordion-collapse"
        class="grid grid-flow-row divide-y divide-bg5-light dark:divide-bg5-dark"
        data-accordion="collapse"
      >
        <div v-for="menu in menus" :key="'menu' + menu.id">
          <div class="flex">
            <div class="grow">
              <template v-if="menu.isException">
                <a
                  :href="menu.slug"
                  target="_blank"
                  aria-current="page"
                  class="p-3 block uppercase text-black dark:text-white text-lg transition-colors hover:text-red-600 focus:text-red-600 justify-between items-center filter drop-shadow-lg nuxt-link-exact-active nuxt-link-active"
                >
                  <span class="grow">{{ $t(`buttons.${menu.title}`) }}</span>
                </a>
              </template>
              <template v-else>
                <router-link
                  class="p-3 block uppercase text-black dark:text-white text-lg transition-colors hover:text-red-600 focus:text-red-600 justify-between items-center filter drop-shadow-lg"
                  :to="localePath(menu.slug)"
                >
                  <span class="grow" v-html="$t(`menus.${menu.title}`)"></span>
                </router-link>
              </template>
            </div>
            <div class="flex-none w-20">
              <button
                v-if="menu.hasChildren"
                v-b-toggle="`collapse-${menu.id}`"
                class="pt-2 pb-2 pl-12 pr-6 text-black dark:text-white text-lg flex-shrink-0"
              >
                <font-awesome-icon :icon="['fas', 'chevron-down']" />
              </button>
            </div>
          </div>

          <b-collapse v-if="menu.hasChildren" :id="`collapse-${menu.id}`">
            <div
              class="p-2 shadow-inner bg-bg3-light dark:bg-bg3-dark grid grid-flow-row divide-y divide-bg5-light dark:divide-bg5-dark"
            >
              <template v-for="child in menu.children">
                <div v-if="child.hasChildren" :key="'child_' + menu.key + '_' + child.id">
                  <div class="flex">
                    <div class="grow">
                      <router-link
                        :key="'child_' + child.id"
                        class="p-2 uppercase text-black dark:text-white text-lg transition-colors hover:text-red-600 focus:text-red-600 block filter drop-shadow-lg"
                        :to="localePath(child.slug)"
                      >{{ $t(`menus.${child.title}`) }}</router-link>
                    </div>
                    <div class="flex-none w-20">
                      <button
                        v-b-toggle="`collapse-child-${child.id}`"
                        class="pt-2 pb-2 pl-12 pr-6 text-black dark:text-white text-lg flex-shrink-0"
                      >
                        <font-awesome-icon :icon="['fas', 'chevron-down']" />
                      </button>
                    </div>
                  </div>
                </div>
                <template v-else>
                  <template v-if="child.isException">
                    <a
                      :key="'child_' + menu.key + '_' + child.id"
                      class="p-2 uppercase text-black dark:text-white text-lg transition-colors hover:text-red-600 focus:text-red-600 inline-block filter drop-shadow-lg"
                      :href="child.slug"
                      target="_blank"
                    >{{ $t(`menus.${child.title}`) }}</a>
                  </template>
                  <template v-else>
                    <router-link
                      :key="'child_' + menu.key + '_' + child.id"
                      class="p-2 uppercase text-black dark:text-white text-lg transition-colors hover:text-red-600 focus:text-red-600 inline-block filter drop-shadow-lg"
                      :to="localePath(child.slug)"
                    >{{ $t(`menus.${child.title}`) }}</router-link>
                  </template>
                </template>
                <!--- Start inner submenu -->
                <b-collapse
                  v-if="child.hasChildren"
                  :id="`collapse-child-${child.id}`"
                  :key="'subChild_menu_' + child.id"
                  class
                >
                  <div
                    class="p-2 shadow-inner bg-bg3-light dark:bg-bg3-dark grid grid-flow-row divide-y divide-bg5-light dark:divide-bg5-dark"
                  >
                    <router-link
                      v-for="subChild in child.children"
                      :key="'subChild' + subChild.id"
                      class="p-2 uppercase text-black dark:text-white text-lg transition-colors hover:text-red-600 focus:text-red-600 inline-block filter drop-shadow-lg ml-4"
                      :to="localePath(subChild.slug)"
                    >{{ $t(`menus.${subChild.title}`) }}</router-link>
                  </div>
                </b-collapse>
                <!--- End inner submenu -->
              </template>
            </div>
          </b-collapse>
        </div>
      </div>
    </nav>
  </b-sidebar>
</template>
