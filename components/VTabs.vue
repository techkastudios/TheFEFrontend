<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Tabs',
  components: {},
  props: {
    tabsinfo: {
      type: Object,
      required: true,
    },
    genlead: {
      type: Object,
      default: null,
    },
    posts: {
      type: Array,
      default: null,
    },
  },
  setup(props) {
    const activeTab = props.tabsinfo.tabs[0].id

    return {
      activeTab,
    }
  },
  methods: {
    activeTabHandle(event: any | null) {
      const element = event && event.currentTarget ? event.currentTarget : ''
      const activeTab = element.getAttribute('data-id')
      this.activeTab = activeTab
    },
  },
})
</script>

<template>
  <v-container>
    <div class="mb-4 border-b border-orange-400 dark:border-gray-700">
      <ul v-if="tabsinfo && tabsinfo.tabs.length > 0" id="tabExample"
        class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li v-for="tab in tabsinfo.tabs" :key="tab.id" class="mr-2">
          <button :data-id="tab.id" :class="{ 'bg-amber-400 text-white': activeTab === tab.id }"
            class="inline-block p-4 rounded-none border-b-2 border-transparent font-bold hover:text-red-600 hover:dark:text-white focus:text-white focus:dark:text-white"
            type="button" @click="activeTabHandle">
            {{ tab.name }}
          </button>
        </li>
      </ul>
    </div>
    <div id="tabContainer">
      <template v-for="tab in tabsinfo.tabs">
        <div :id="'tab_' + tab.id" :key="tab.id" :class="{ active: activeTab === tab.id }" class="tab-content rounded-lg">
          <div class="grid xl:grid-cols-16 gap-4 pb-4">
            <section class="col-auto xl:col-span-10">
              <div v-if="genlead && genlead.image" class="mb-4">
                <nuxt-link :to="localePath(genlead.slug)">
                  <v-img :src="genlead.image" :alt="genlead.title" />
                </nuxt-link>
                <div class="mt-4">
                  <v-heading
                    class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 text-2xl leading-6 hover:text-red-600 hover:dark:text-white">
                    <nuxt-link :to="localePath(genlead.slug)">
                      {{ genlead.title }}
                    </nuxt-link>
                  </v-heading>
                  <p v-html="genlead.excerpt"></p>
                </div>
              </div>
            </section>
            <section v-if="posts.length > 0" class="col-auto xl:col-span-6">
              <div class="grid grid-cols-1 gap-4">
                <category-media-left-right v-for="post in posts" :key="post.id" :title="post.title" :url="post.slug"
                  :imageLeft="post.image" :category="post.category" :datetime="post.datetime" :text="post.excerpt"
                  headingFont="text-xl leading-6" class="bg-bg1-light dark:bg-bg1-dark" />
              </div>
            </section>
          </div>
        </div>
      </template>
    </div>
  </v-container>
</template>

<style scoped>
.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}
</style>
