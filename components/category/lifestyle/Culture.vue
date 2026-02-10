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
  name: 'LifestyleCulture',

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
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const getLivingPosts = async () => {
      const category: CategoryLifestyle = await $axios.$get(
        `api/${lang}/category/${props.category}/${props.subcategory}`
      )
      name.value = category.name
      lead.value = category.featured
      posts.value = category.posts
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
    }
  },
})
</script>

<template>
  <div id="sub-category-food" ref="target" class="bg-bg2-light dark:bg-bg2-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="subcategory" :url="url" />
      <!-- heading -->

      <!-- Fetured section -->
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div v-if="lead" class="col-auto col-span-4 xl:col-span-4">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-auto col-span-2">
              <nuxt-link v-if="lead.image" :to="localePath(lead.slug)">
                <figure>
                  <v-img :src="lead.image" :alt="lead.title" />
                </figure>
              </nuxt-link>
            </div>
            <div class="col-auto col-span-1">
              <!-- heading -->
              <div class="mb-2">
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
              <!-- heading -->
            </div>
          </div>
        </div>
      </div>
      <!-- Fetured section -->

      <!--- General posts --->
      <div v-if="posts.length > 0" class="grid grid-cols-4 gap-4 mb-4 mt-4">
        <template v-for="(post, index) in posts">
          <div v-if="index <= 3" :key="'culture_' + post.id" class="shadow-2xl col-auto col-span-4 xl:col-span-1">
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
        </template>
      </div>
      <div v-if="posts.length > 0" class="mt-8 mb-4">
        <template v-for="(post, index) in posts">
          <div v-if="index >= 3" :key="'culture_post_' + post.id" class="grid grid-cols-4 gap-4 mb-4">
            <div v-if="post.image" class="col-auto col-span-4 xl:col-span-1">
              <figure>
                <v-img class="" :src="post.image" :alt="post.title" />
              </figure>
            </div>
            <div class="col-auto col-span-4 xl:col-span-3">
              <nuxt-link :to="localePath(post.slug)"
                class="uppercase font-bold text-xs text-rose-600 hover:text-rose-900 transition-colors">
                {{ name }}
              </nuxt-link>
              <v-heading
                class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 text-2xl leading-6 transition-colors hover:text-rose-600 dark:hover:text-rose-600">
                <nuxt-link :to="localePath(post.slug)" class="line-clamp-3">
                  {{ post.title }}
                </nuxt-link>
              </v-heading>
              <p v-html="post.excerpt"></p>
            </div>
          </div>
        </template>
      </div>
      <!--- General posts --->
    </v-container>
  </div>
</template>
