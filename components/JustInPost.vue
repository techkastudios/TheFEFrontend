<script lang="ts">
import Typed from 'typed.js'
import {
  defineComponent,
  ref,
  onMounted,
  useContext,
} from '@nuxtjs/composition-api'

import { LatestPost } from '~/types/latest-post'

export default defineComponent({
  name: 'PostJustIn',

  setup() {
    const { $axios, i18n } = useContext()

    const posts = ref<LatestPost[]>([])
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en';

    onMounted(async () => {
      try {
        const url = `api/${lang}/latest-post`
        const justinPost = await $axios.$get(url)
        posts.value = justinPost

      } finally {
        if (posts.value.length) {
          setTimeout(() => {
            // eslint-disable-next-line no-new
            new Typed('#typed', {
              stringsElement: '#typed-strings',
              loop: true,
              startDelay: 0,
              typeSpeed: -500,
              backSpeed: -800,
              backDelay: 5000,
            })
          }, 500)
        }
      }
    })

    return {
      posts,
    }
  },
})
</script>

<template>
  <v-container v-if="posts.length">
    <div class="grid grid-cols-1 xl:flex justify-start items-center">
      <div class="text-center xl:text-left col-span-full flex-shrink-0 uppercase font-bold text-xl text-rose-600">
        {{ $t('just_in') }}
      </div>
      <div class="hidden xl:block">&nbsp;&nbsp;&nbsp;</div>
      <div class="col-span-full inline-flex items-center">
        <div id="typed-strings" class="hidden">
          <p v-for="(item, i) in posts" :key="i">
            <a :href="item.url" target="_blank" rel="noopener noreferrer"
              class="text-base xl:text-xl text-p-light dark:text-p-dark">
              {{ item.title }}
            </a>
          </p>
        </div>
        <div id="typed"></div>
      </div>
    </div>
  </v-container>
</template>
