<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useContext,
  computed,
  onMounted,
} from '@nuxtjs/composition-api'
import { Posts } from '~/types/posts'
import { CategoryLifestyle } from '~/types/category'
import { useAdsCategoryStore } from '~/store/ads/category'

export default defineComponent({
  name: 'LifestyleHome',

  props: {
    category: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { $axios, i18n } = useContext()
    const adsStore = useAdsCategoryStore()

    const name = ref()
    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])
    const genPosts1 = ref<Posts[]>([])
    const genPosts2 = ref<Posts[]>([])
    const genLead = ref<Posts>()
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en';

    const getLifestylePosts = async () => {
      const category: CategoryLifestyle = await $axios.$get(
        `api/${lang}/category/${props.category}/home`
      )

      name.value = category.name
      lead.value = category.featured
      posts.value = category.posts
      genPosts1.value = category.posts.slice(0, 4)

      const genLedPOst =
        category && category.posts ? category.posts.slice(4, 5)[0] : {}

      genLead.value = genLedPOst
      genPosts2.value = category.posts.slice(5, 8)
    }

    useFetch(() => {
      // getLifestylePosts()
    })

    onMounted(() => {
      getLifestylePosts()
    })

    const tabsInfo = {
      activeTab: 'categories',
      tabs: [
        {
          id: 'categories',
          name: 'Categories',
          description: 'test-1',
        },
        {
          id: 'entertainment',
          name: 'Entertainment',
          description: 'test-2',
        },
        {
          id: 'living',
          name: 'Living',
          description: 'test-3',
        },
      ],
    }

    return {
      name,
      lead,
      posts,
      genLead,
      genPosts1,
      genPosts2,
      tabsInfo,
      adsRight: computed(() => adsStore.adsRight),
      adsMain: computed(() => adsStore.adsMain),
    }
  },
})
</script>

<template>
  <div id="category-home" class="bg-body-light dark:bg-body-dark py-8">
    <v-container>
      <div class="grid xl:grid-cols-16 gap-4 pb-4">
        <section class="col-auto xl:col-span-8">
          <div v-if="lead" class="mb-4">
            <div class="relative">
              <nuxt-link v-if="lead.image" :to="localePath(lead.slug)">
                <v-img :src="lead.image" :alt="lead.title" />
              </nuxt-link>
              <!-- <div class="absolute bottom-8 left-8">
                          <v-heading
                            class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 text-2xl text-white leading-6"
                          >
                            {{ lead.title }}
                          </v-heading>
                        </div> -->
            </div>
            <div>
              <v-heading
                class="py-2 font-semibold text-h3-light dark:text-h3-dark line-clamp-1 text-2xl text-white leading-6 hover:text-red-600 hover:dark:text-white">
                <nuxt-link :to="localePath(lead.slug)" class="line-clamp-1">
                  {{ lead.title }}
                </nuxt-link>
              </v-heading>
            </div>
          </div>
        </section>
        <section v-if="genPosts1.length > 0" class="col-auto xl:col-span-8">
          <div class="grid grid-cols-2 gap-4">
            <template v-for="genPost1 in genPosts1">
              <div :key="'main-1-' + genPost1.id" class="col-span-1">
                <div class="">
                  <nuxt-link v-if="genPost1.image" :to="localePath(genPost1.slug)">
                    <v-img :src="genPost1.image" :alt="genPost1.title" />
                  </nuxt-link>
                </div>
                <!-- <div class="relative"> -->
                <!-- <nuxt-link :to="localePath(genPost1.slug)">
                              <v-img :src="genPost1.image" :alt="genPost1.title" />
                            </nuxt-link> -->
                <!-- <div class="absolute bottom-8 left-4">
                              <v-heading
                                class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 text-2xl text-white leading-6"
                              >
                                <nuxt-link
                                  :to="localePath(genPost1.slug)"
                                  class="line-clamp-3"
                                >
                                  {{ genPost1.title }}
                                </nuxt-link>
                              </v-heading>
                            </div> -->
                <!-- </div> -->
                <div class="">
                  <v-heading
                    class="py-2 font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 text-2xl text-white leading-6 hover:text-red-600 hover:dark:text-white">
                    <nuxt-link :to="localePath(genPost1.slug)" class="line-clamp-1">
                      {{ genPost1.title }}
                    </nuxt-link>
                  </v-heading>
                </div>
              </div>
            </template>
          </div>
        </section>
      </div>
    </v-container>
    <v-container>
      <div class="grid xl:grid-cols-16 gap-4 pb-4">
        <section class="col-auto xl:col-span-12">
          <v-tabs :tabsinfo="tabsInfo" :genlead="genLead" :posts="genPosts2" />
        </section>
        <section class="col-auto xl:col-span-4">
          <header class="bg-bg7-light dark:bg-bg7-dark p-1.5 indent-4 uppercase font-bold text-lg text-white mt-4">
            {{ $t('headings.more_options') }}
          </header>
        </section>
      </div>
    </v-container>
  </div>
</template>
