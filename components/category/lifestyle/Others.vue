<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  onMounted,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'
import CategoryHeading from '~/components/home/CategoryHeading.vue'
import { Posts } from '~/types/posts'
import { CategoryLifestyle } from '~/types/category'

export default defineComponent({
  name: 'LifestyleOthers',

  components: { CategoryHeading },

  props: {
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: '/',
    },
  },

  setup(props) {
    const { $axios, i18n } = useContext()
    const target = ref(null)
    const loading = ref(false)
    const name = ref()
    const lead = ref<Posts>()
    const posts = ref<Posts[]>([])
    const genPosts1 = ref<Posts[]>([])
    const genPosts2 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en';

    const getLivingPosts = async () => {
      const category: CategoryLifestyle = await $axios.$get(
        `api/${lang}/category/${props.category}/${props.subcategory}`
      )
      name.value = category.name
      lead.value = category.featured
      posts.value = category.posts
      genPosts1.value = category.posts.slice(0, 3)
      genPosts2.value = category.posts.slice(3, 5)
    }

    const fetch = () => {
      loading.value = true
      try {
        getLivingPosts()
      } finally {
        loading.value = false
      }
    }

    const { stop } = useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // Manually trigger a refetch
          fetch()

          stop()
        }
      },
      {
        rootMargin: '100px',
      }
    )

    onMounted(() => {
      getLivingPosts()
    })

    return {
      target,
      loading,
      name,
      lead,
      posts,
      genPosts1,
      genPosts2,
    }
  },
})
</script>

<template>
  <div :id="'sub-category-' + category" ref="target" class="bg-bg2-light dark:bg-bg2-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="subcategory" :url="url" />
      <!-- heading -->

      <div class="grid grid-cols-3 gap-4 mb-4">
        <div v-if="lead" class="col-auto col-span-1">
          <div>
            <nuxt-link v-if="lead.image" :to="localePath(lead.slug)">
              <figure>
                <v-img :src="lead.image" :alt="lead.title" />
              </figure>
            </nuxt-link>
          </div>
          <div>
            <div class="mb-2">
              <nuxt-link :to="localePath(url)"
                class="uppercase font-bold text-xs text-rose-600 hover:text-rose-900 transition-colors">
                {{ name }}
              </nuxt-link>
            </div>
            <v-heading
              class="font-semibold text-h3-light dark:text-h3-dark mb-4 text-2xl xl:text-4xl transition-colors hover:text-rose-600 dark:hover:text-rose-600">
              <nuxt-link :to="localePath(lead.slug)" class="line-clamp-3">
                {{ lead.title }}
              </nuxt-link>
            </v-heading>
            <p class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal" v-html="lead.excerpt"></p>
          </div>
        </div>
        <!--- General posts --->
        <div v-for="post in genPosts1" :key="'others-post-' + post.id" class="col-auto col-span-1">
          <div>
            <nuxt-link v-if="post.image" :to="localePath(post.slug)">
              <figure>
                <v-img :src="post.image" :alt="post.title" />
              </figure>
            </nuxt-link>
          </div>
          <div class="mt-2">
            <v-heading
              class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 text-2xl text-white leading-6 transition-colors hover:text-rose-600 dark:hover:text-rose-600">
              <nuxt-link :to="localePath(post.slug)" class="line-clamp-3">
                {{ post.title }}
              </nuxt-link>
            </v-heading>
          </div>
          <hr class="border-bg5-light dark:border-bg5-dark" />
          <p class="text-p-light dark:text-p-dark text-base leading-6 line-clamp-3 merriweather-sans-normal" v-html="post.excerpt"></p>
        </div>
        <div class="col-auto col-span-1">
          <category-media-left-right v-for="post in genPosts2" :key="post.id" :title="post.title" :url="post.slug"
            :imageLeft="post.image" :category="post.category" :datetime="post.datetime" :text="post.excerpt"
            class="bg-bg1-light dark:bg-bg1-dark" />
        </div>
        <!--- General posts --->
      </div>
    </v-container>
  </div>
</template>
