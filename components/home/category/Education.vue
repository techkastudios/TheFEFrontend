<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'

import { Posts } from '~/types/posts'
import CategoryHeading from '~/components/home/CategoryHeading.vue'
import CategoryColumnHeading from '~/components/home/CategoryColumnHeading.vue'
// import CategoryPostTitle from '~/components/home/CategoryPostTitle.vue'
import CategoryMediaLeftRight from '~/components/home/CategoryMediaLeftRight.vue'
import CategoryMediaTopLeft from '~/components/home/CategoryMediaTopLeft.vue'
import { CategoryEducation } from '~/types/category'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'HomeCategoryEducation',

  components: {
    CategoryHeading,
    CategoryColumnHeading,
    // CategoryPostTitle,
    CategoryMediaLeftRight,
    CategoryMediaTopLeft,
  },

  props: {
    ads1: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    ads2: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
  },

  setup() {
    const { $axios, i18n } = useContext()
    const target = ref(null)
    const loading = ref(false)

    const name = ref('')
    const slug = ref('/')

    const lead = ref<Posts>()
    const leadBottom = ref<Posts>()
    const column1 = ref<Posts[]>([])
    const column2 = ref<Posts[]>([])
    const column3 = ref<Posts[]>([])
    const oped = ref<Posts[]>([])
    const column4 = ref<Posts[]>([])
    const column5 = ref<Posts[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'

    const fetch = async () => {
      loading.value = true
      try {
        const category: CategoryEducation =
          await $axios.$get<CategoryEducation>(
            `api/${lang}/home/category-education`
          )
        name.value = category.name
        slug.value = category.slug
        lead.value = category.featured
        column1.value = category.posts
        column2.value = category.articles
        oped.value = category.oped
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

    return {
      target,
      loading,
      name,
      slug,
      lead,
      column1,
      column2,
      leadBottom,
      column3,
      oped,
      column4,
      column5,
    }
  },
})
</script>

<template>
  <div id="home-category-trade" ref="target" class="bg-bg2-light dark:bg-bg2-dark py-8">
    <v-container>
      <!-- heading -->
      <category-heading :name="name" :url="slug" />
      <!-- heading -->

      <!-- news -->
      <div class="grid xl:grid-cols-15 gap-4 pb-4">
        <!-- column 1 -->
        <section class="col-auto xl:col-span-6">
          <v-card
            v-if="lead"
            :title="lead.title"
            :url="lead.slug"
            :category="lead.category"
            :datetime="lead.datetime"
            :text="lead.excerpt"
            class="mb-4"
          ></v-card>
          <category-media-left-right
            v-for="post in column1"
            :key="post.id"
            :title="post.title"
            :url="post.slug"
            :image-left="post.image"
            :category="post.category"
            :datetime="post.datetime"
            :text="post.excerpt"
            class="mb-4 last:mb-0"
          />
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <section class="col-auto xl:col-span-6 bg-bg10-light dark:bg-bg10-dark">
          <category-column-heading
            :name="$t('headings.articles_op_ed')"
            :url="localePath(`/page/education/article`)"
          />
          <div class="p-4">
            <category-media-left-right
              v-for="post in column2"
              :key="post.id"
              :title="post.title"
              :url="post.slug"
              :image-left="post.image"
              :category="post.category"
              :datetime="post.datetime"
              :text="post.excerpt"
              class="mb-4 last:mb-0"
            />
            <category-media-left-right
              v-for="post in oped"
              :key="post.id"
              :title="post.title"
              :url="post.slug"
              :image-left="post.image"
              :category="post.category"
              :datetime="post.datetime"
              :text="post.excerpt"
              class="mb-4 last:mb-0"
            />
          </div>
        </section>
        <!-- column 4 -->

        <!-- column 5 -->
        <section class="col-auto xl:col-span-3">
          <v-ads v-if="ads1" :ads="ads1" />
          <client-only v-else>
            <Adsense
              style="display: block;"
              data-ad-client="ca-pub-3438694616169600"
              data-ad-slot="2838794797"
              data-full-width-responsive="yes"
              is-new-ads-code="yes"
              data-ad-format="vertical"
            />
          </client-only>
        </section>
        <!-- column 5 -->
      </div>
      <!-- news -->

      <hr class="border-bg5-light dark:border-bg5-dark" />

      <!-- news -->
      <div class="grid xl:grid-cols-4 gap-4 pt-4">
        <!-- column 1 -->
        <section>
          <category-media-top-left
            v-if="leadBottom"
            :title="leadBottom.title"
            :media="leadBottom.image"
            :text="leadBottom.excerpt"
            :category="leadBottom.category"
            :datetime="leadBottom.datetime"
            class="mb-4 last:mb-0"
          />
        </section>
        <!-- column 2 -->

        <!-- column 1 -->
        <section>
          <category-media-top-left
            v-if="leadBottom"
            :title="leadBottom.title"
            :media="leadBottom.image"
            :text="leadBottom.excerpt"
            :category="leadBottom.category"
            :datetime="leadBottom.datetime"
            class="mb-4 last:mb-0"
          />
        </section>
        <!-- column 2 -->

        <!-- column 3 -->
        <section></section>
        <!-- <category-post-title
                    :posts="column4"
                    class="bg-bg10-light dark:bg-bg10-dark"
        />-->
        <!-- column 3 -->
      </div>
      <!-- news -->

      <!-- ads -->
      <v-ads v-if="ads2" :ads="ads2" />
      <client-only v-else>
        <Adsense
          style="display: block;"
          data-ad-client="ca-pub-3438694616169600"
          data-ad-slot="2838794797"
          data-full-width-responsive="yes"
          is-new-ads-code="yes"
          data-ad-format="auto"
          ins-class="text-center mt-8"
        />
      </client-only>
      <!-- ads -->
    </v-container>
  </div>
</template>
