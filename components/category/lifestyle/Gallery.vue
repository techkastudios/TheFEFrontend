<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
  onMounted,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'
import CategoryHeading from '~/components/home/CategoryHeading.vue'
import { Posts } from '~/types/posts'
import { CategoryLifestyle } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'LifestyGallery',

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
    ads: {
      type: Object as PropType<Advertisement>,
      default: null,
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
      genPosts2.value = category.posts.slice(3, 6)
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
  <div id="sub-category-gallery" ref="target" class="bg-bg2-light dark:bg-bg2-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="subcategory" :url="url" />
      <!-- heading -->
      <div class="grid grid-cols-6 gap-4 mb-4">
        <div v-if="lead" class="col-span-6">
          <div class="relative">
            <nuxt-link v-if="lead.image" :to="localePath(lead.slug)">
              <figure>
                <v-img :src="lead.image" :alt="lead.title" />
              </figure>
            </nuxt-link>
            <div class="absolute bottom-8 left-8">
              <v-heading
                class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 text-2xl text-white leading-6">
                {{ lead.title }}
              </v-heading>
            </div>
          </div>
        </div>
        <div class="col-start-2 col-span-4">
          <div class="grid grid-cols-3 gap-4">
            <div v-for="post in genPosts1" :key="'gallery-post-' + post.id" class="col-span-1">
              <div class="relative">
                <nuxt-link v-if="post.image" :to="localePath(post.slug)">
                  <figure>
                    <v-img :src="post.image" :alt="post.title" />
                  </figure>
                </nuxt-link>
                <div class="absolute bottom-8 left-8">
                  <v-heading
                    class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 text-2xl text-white leading-6">
                    {{ post.title }}
                  </v-heading>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="posts.length > 0" class="grid grid-cols-4 gap-4 mb-4 mt-4">
        <div v-for="post in genPosts2" :key="'gallery-post-' + post.id"
          class="shadow-2xl col-auto col-span-4 xl:col-span-1">
          <figure v-if="post.image">
            <v-img class="" :src="post.image" :alt="post.title" />
          </figure>
          <div class="p-4">
            <div class="mb-2">
              <nuxt-link :to="localePath(post.slug)"
                class="uppercase font-bold text-xs text-rose-600 hover:text-rose-900 transition-colors">
                {{ name }}
              </nuxt-link>
            </div>
            <v-heading
              class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 text-2xl leading-6 transition-colors hover:text-rose-600 dark:hover:text-rose-600">
              <nuxt-link :to="localePath(post.slug)" class="line-clamp-3">
                {{ post.title }}
              </nuxt-link>
            </v-heading>
            <p v-html="post.excerpt"></p>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
