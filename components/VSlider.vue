<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Slider',
  components: {},
  props: {
    category: {
      type: String,
      default: null,
    },
    slidertype: {
      type: String,
      default: 'image',
    },
    bgcolor: {
      type: String,
      default: 'bg-amber-300',
    },
    slidestoshow: {
      type: Number,
      default: 1,
    },
  },
  data() {
    const lang = this.$i18n?.locale === 'bangla' ? 'bn' : 'en';
    return {
      selectedLanguage: lang,
      categoryPosts: [],
      sliderImages: [],
      previewImage: '',
      imageCaption: '',
      getImageCaption(sliderImage = Object) {
        return sliderImage ? sliderImage.name : ''
      },
      settings: {
        autoplay: true,
        centerMode: true,
        arrows: true,
        dots: true,
        centerPadding: '20px',
        focusOnSelect: true,
        infinite: true,
        slidesToShow: this.slidestoshow,
        slidesToScroll: 1,
        speed: 300,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: this.slidestoshow,
              slidesToScroll: 2,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      showModal: false,
    }
  },
  mounted() {
    this.getSliderImages()
  },
  methods: {
    async getSliderImages() {
      const category = this.category
      const lang = this.selectedLanguage

      if (category === 'food') {
        const foodUrl = `api/${lang}/category/lifestyle/food`
        const catPosts = await this.$axios.$get(foodUrl)
        this.categoryPosts = catPosts.posts
      } else if (category === 'sports') {
        const sportsUrl = `api/${lang}/category/sports/slider`
        const response = await this.$axios.$get(sportsUrl)
        this.sliderImages = response
      }
    },
    sliderPreview(event: any | null) {
      const element = event && event.currentTarget ? event.currentTarget : ''
      const src = element.getAttribute('data-src')
      const strCaption = element.getAttribute('data-caption')
      let caption = ''

      if (strCaption) {
        const splitCaption = strCaption.split('.')
        caption = splitCaption[0]
      }

      this.previewImage = src
      this.imageCaption = caption
      this.showModal = true
    },
    toggleModal() {
      this.showModal = !this.showModal
    },
  },
})
</script>
<template>
  <div v-if="sliderImages.length > 0 || categoryPosts.length > 0" class="p-4 shadow-2xl" :class="bgcolor">
    <div class="slider-title uppercase text-center font-bold text-xl xl:mt-2">
      {{ $t('headings.highlights') }}
    </div>
    <div class="py-4 mb-2 xl:py-8 xl:px-12">
      <VueSlickCarousel v-bind="settings">
        <template v-if="slidertype === 'posts' && post.length > 0">
          <div v-for="(post, index) in categoryPosts" :key="'slide_' + category + '_' + post.id" class="px-4">
            <template v-if="index <= 4">
              <div class="grid grid-cols-3 gap-4">
                <div v-if="post.image" class="col-auto col-span-2">
                  <figure>
                    <v-img class="" :src="post.image" :alt="post.title" />
                  </figure>
                </div>
                <div class="col-auto col-span-1 pt-8 post-container">
                  <small>{{ $t('food') }}</small>
                  <div>
                    <v-heading class="font-semibold text-h3-light dark:text-h3-dark mb-2 line-clamp-3 text-2xl leading-6">
                      {{ post.title }}
                    </v-heading>
                    <p v-html="post.excerpt"></p>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <div v-for="sliderImage in sliderImages" :key="'slide_' + sliderImage.id">
            <div v-if="sliderImage.src" :data-src="sliderImage.src" :data-caption="getImageCaption(sliderImage)"
              class="m-2" @click="sliderPreview">
              <v-img :src="sliderImage.src" :alt="sliderImage.name" />
            </div>
          </div>
        </template>
      </VueSlickCarousel>
    </div>
    <div v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--body-->
          <div class="relative flex-auto">
            <p class="absolute right-4 text-5xl text-white cursor-pointer" @click="toggleModal">
              ×
            </p>
            <p class="text-slate-500 text-lg leading-relaxed">
              <img :src="previewImage" />
            </p>
            <p class="p-4 bg-footer-bottom-light text-white">
              {{ imageCaption }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-50 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 40;
  cursor: pointer;
  user-select: none;
}

.preview-modal button {
  color: #fff !important;
}

.bg-red-600 .slider-title,
.bg-red-600 .post-container,
.bg-red-600 h3 {
  color: #fff;
}
</style>
