<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  PropType,
  useContext,
} from '@nuxtjs/composition-api'
import { Posts, Post } from '~/types/posts'
import CategoryMediaLeftRight from '~/components/home/CategoryMediaLeftRight.vue'
import { Advertisement } from '~/types/ads'

export default defineComponent({
  name: 'Post',

  components: { CategoryMediaLeftRight },

  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
    relatedPosts: {
      type: Array as PropType<Posts[]>,
      required: true,
    },
    morePosts: {
      type: Array as PropType<Posts[]>,
      required: true,
    },
    hideInMobile: {
      type: Boolean,
      default: false,
    },
    adsUnderSocialShare: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    adsUnderMainImage: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    adsInsideNews: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    adsBottomNews1: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    adsBottomNews2: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    adsBottomNews3: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    adsRightSide1: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    adsRightSide2: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    adsRightSide3: {
      type: Object as PropType<Advertisement>,
      default: null,
    },
    postType: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { i18n, $config } = useContext()
    const lang = i18n?.locale === 'bangla' ? 'bn' : 'en'
    let socialURL = ref(`${$config.baseURL}`)

    if (lang === 'bn') {
      socialURL = ref(`${$config.baseURL}/${i18n.locale}`)
    }

    onMounted(() => {
      // Inner ads append
      setTimeout(function () {
        const insideAdsElement = document.getElementById('insideNewsAds')
        const imgSrc = insideAdsElement
          ? insideAdsElement.getAttribute('data-src')
          : ''
        const imgLink = insideAdsElement
          ? insideAdsElement.getAttribute('data-link')
          : ''

        if (imgSrc) {
          const singlePostEle = document.getElementById('main-single-post')
          if (singlePostEle && singlePostEle.firstChild) {
            const childElement = singlePostEle.firstChild

            if (!document.getElementById('innerAds')) {
              const newDiv = document.createElement('div')
              newDiv.id = 'innerAds'
              newDiv.className = 'inner-ads'
              newDiv.insertAdjacentHTML(
                'beforeend',
                '<div id="two"><a href="' +
                  imgLink +
                  '" target="_blank"><img src="' +
                  imgSrc +
                  '" alt="FE" class="v-lazy-image aspect-w-3 aspect-h-2 pb-0 object-center object-cover mx-auto v-lazy-image-loaded"></a></div>'
              )
              childElement.appendChild(newDiv)
            }
          }
        }
      }, 1000)
    })
    return {
      socialURL,
    }
  },
  methods: {
    printArticle(post: Post) {
      const postId = post?.id || ''
      const printContents =
        document.getElementById('post_' + postId)?.innerHTML || ''
      const originalContents = document.body.innerHTML

      document.body.innerHTML = printContents

      window.print()
      document.body.innerHTML = originalContents
      setTimeout(function () {
        location.reload()
      }, 1000)
    },
  },
})
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-15 gap-4">
    <!-- column 1 -->
    <section class="col-auto xl:col-span-10">
      <article v-if="post" :id="'post_' + post.id">
        <div class="grid grid-cols-1 xl:grid-cols-12">
          <div class="col-auto xl:col-span-2"></div>
          <div class="col-auto xl:col-span-10">
            <v-category-time :category="post.category" :time="post.publishedAt" />
            <h2 class="font-semibold text-h3-light dark:text-h3-dark mb-2">{{ post.shoulder }}</h2>
            <v-heading
              :level="1"
              class="font-semibold text-h3-light dark:text-h3-dark mb-2 text-xl xl:text-4xl"
              :slug="post.slug"
              :title="post && post.title || ''"
            >{{ post && post.title || '' }}</v-heading>
            <h3 class="font-semibold text-h3-light dark:text-h3-dark mb-2">{{ post.hanger }}</h3>
            <div
              v-if="post.reporter"
              class="text-p-light dark:text-p-dark py-1 xl:py-2 font-semibold capitalize text-sm xl:text-base md:hidden"
            >
              <nuxt-link
                :to="localePath(`/reporter/${post.reporter.username}`)"
                rel="author"
              >{{ post.reporter.name }}</nuxt-link>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:mt-8">
          <section class="col-auto xl:col-span-2">
            <div class="block xl:hidden mb-2">
              <figure>
                <div v-if="post.image" class="mb-2">
                  <img
                    :src="srcImage"
                    :srcset="post.image"
                    :alt="post.caption"
                    class="v-lazy-image aspect-w-3 aspect-h-2 pb-0 object-center object-cover mx-auto v-lazy-image-loaded"
                  />
                  <!-- <v-img :src="post.image" :alt="post.caption" /> -->
                </div>
                <figcaption v-if="post.caption" class="text-base italic">
                  {{ post.caption }}
                  <strong v-if="post.source">Photo : {{ post.source }}</strong>
                </figcaption>
              </figure>
              <!-- ads -->
              <v-ads v-if="adsUnderMainImage" :ads="adsUnderMainImage" class="text-center mt-2" />
              <client-only v-else>
                <Adsense
                  data-ad-client="ca-pub-3438694616169600"
                  data-ad-slot="2838794797"
                  is-new-ads-code="yes"
                  data-ad-format="auto"
                  data-full-width-responsive="yes"
                  ins-class="text-center mt-2"
                />
              </client-only>
              <!-- ads -->
            </div>

            <div>
              <p
                v-if="post.reporter"
                class="hidden md:block text-p-light dark:text-p-dark py-1 xl:py-2 px-2 text-center font-semibold uppercase text-sm xl:text-base"
              >
                <nuxt-link
                  :to="localePath(`/reporter/${post.reporter.username}`)"
                  rel="author"
                >{{ post.reporter.name }}</nuxt-link>
              </p>
              <div
                class="grid grid-flow-col xl:grid-cols-1 xl:divide-y xl:grid-flow-row divide-x-2 xl:divide-x-0 divide-bg5-light dark:divide-bg5-dark py-2 px-4"
              >
                <section class="text-center xl:pb-2">
                  <p
                    class="font-semibold text-sm xl:text-base text-bg6-light dark:text-bg6-dark"
                  >{{ $t('post.published') }} :</p>
                  <time
                    class="text-xs xl:text-sm text-p-light dark:text-p-dark"
                  >{{ getFormattedDateTime(post.publishedAt, $i18n.locale) }}</time>
                </section>
                <section class="text-center xl:pt-2">
                  <p
                    class="font-semibold text-sm xl:text-base text-bg6-light dark:text-bg6-dark"
                  >{{ $t('post.updated') }} :</p>
                  <time
                    class="text-xs xl:text-sm text-p-light dark:text-p-dark"
                  >{{ getFormattedDateTime(post.updatedAt, $i18n.locale) }}</time>
                </section>
              </div>
            </div>

            <div class="hidden sticky top-28 md:block">
              <p
                class="text-center font-semibold text-sm xl:text-base text-p-light dark:text-p-dark"
              >{{ $t('post.share_this_news') }}</p>
              <div
                v-if="socialURL && post"
                class="mt-4 grid grid-flow-col xl:grid-cols-3 gap-4 xl:grid-flow-row justify-items-center px-4"
              >
                <ShareNetwork
                  network="facebook"
                  :url="socialURL + post.slug"
                  :img="post.image"
                  :title="post && post.title || ''"
                  :description="post.excerpt"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center"
                >
                  <font-awesome-icon :icon="['fab', 'facebook-f']" />
                </ShareNetwork>
                <ShareNetwork
                  network="twitter"
                  :url="socialURL + post.slug"
                  :title="post && post.title || ''"
                  :description="post.excerpt"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    style="margin: 4px auto;"
                  >
                    <path
                      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                    />
                  </svg>
                </ShareNetwork>
                <ShareNetwork
                  network="linkedin"
                  :url="socialURL + post.slug"
                  :title="post && post.title || ''"
                  :description="post.excerpt"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center"
                >
                  <font-awesome-icon :icon="['fab', 'linkedin']" />
                </ShareNetwork>
                <ShareNetwork
                  network="whatsapp"
                  :url="socialURL + post.slug"
                  :title="post && post.title || ''"
                  :description="post.excerpt"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center"
                >
                  <font-awesome-icon :icon="['fab', 'whatsapp']" />
                </ShareNetwork>
                <ShareNetwork
                  network="messenger"
                  :url="socialURL + post.slug"
                  :title="post && post.title || ''"
                  :description="post.excerpt"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center"
                >
                  <font-awesome-icon :icon="['fab', 'facebook-messenger']" />
                </ShareNetwork>
                <a
                  href="javascript:void(0);"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center bg-black"
                  @click="printArticle(post)"
                >
                  <font-awesome-icon :icon="['fas', 'print']" />
                </a>
              </div>
              <!-- ads -->
              <v-ads
                v-if="adsUnderSocialShare"
                :ads="adsUnderSocialShare"
                class="text-center mt-4"
              />
              <client-only v-else>
                <!-- <Adsense
                  data-ad-client="ca-pub-3438694616169600"
                  data-ad-slot="2838794797"
                  is-new-ads-code="yes"
                  data-ad-format="auto"
                  data-full-width-responsive="yes"
                  ins-class="text-center mt-4"
                /> -->
              </client-only>
              <!-- ads -->
            </div>
          </section>
          <section class="col-auto xl:col-span-10">
            <div class="hidden xl:block mb-4">
              <figure class="mb-4">
                <div v-if="post.image">
                  <img
                    :src="srcImage"
                    :srcset="post.image"
                    :alt="post.caption"
                    class="v-lazy-image aspect-w-3 aspect-h-2 pb-0 object-center object-cover mx-auto v-lazy-image-loaded"
                  />
                  <!-- <v-img :src="post.image" :alt="post.caption" /> -->
                </div>
                <figcaption v-if="post.caption" class="text-base italic">
                  {{ post.caption }}
                  <strong v-if="post.source">Photo : {{ post.source }}</strong>
                </figcaption>
              </figure>
              <!-- ads -->
              <!-- <template v-if="postType !== 'main_single'">
                <client-only>
                  <Adsense
                    data-ad-client="ca-pub-3438694616169600"
                    data-ad-slot="2838794797"
                    data-full-width-responsive="yes"
                    is-new-ads-code="yes"
                    data-ad-format="auto"
                    ins-class="text-center mt-4"
                  />
                </client-only>
              </template>-->
              <!-- ads -->
            </div>

            <div v-if="postType === 'main_single'" class="text-center">
              <div class="hidden xl:block my-4">
                <v-ads v-if="adsUnderMainImage" :ads="adsUnderMainImage" class="text-center mt-4" />
                <client-only v-else>
                  <!-- The FE - NEW Site Horizontal Ad -->
                  <!-- <ins
                    class="adsbygoogle"
                    style="display:block;"
                    data-ad-client="ca-pub-4843716006967943"
                    data-ad-slot="4601051681"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                  ></ins>-->
                  <InArticleAdsense
                    style="display:block"
                    data-ad-client="ca-pub-3438694616169600"
                    data-ad-slot="2838794797"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                    is-new-ads-code="yes"
                  ></InArticleAdsense>
                </client-only>
              </div>
              <a
                class="text-base xl:text-xl text-rose-600 transition-colors hover:text-rose-600 dark:hover:text-rose-600"
                href="https://news.google.com/publications/CAAqOQgKIjNDQklTSUFnTWFod0tHblJvWldacGJtRnVZMmxoYkdWNGNISmxjM011WTI5dExtSmtLQUFQAQ?hl=en-US&gl=US&ceid=US%3Aen"
                target="_blank"
              >
                <img
                  src="~/assets/images/google-news.png"
                  style="display: inline-block; height: 25px; margin-right: 0.3rem; margin-top: -3px;"
                />
                For all latest news, follow The Financial Express Google News channel.
              </a>
            </div>

            <article
              :id="postType ? 'main-single-post' : ''"
              class="post-details prose dark:prose-invert max-w-full xl:prose-xl xl:mt-8"
              v-html="post.content"
            />
            <!-- Share social link -->
            <div class="sticky top-28 md:hidden">
              <p
                class="text-center font-semibold text-sm xl:text-base text-p-light dark:text-p-dark"
              >{{ $t('post.share_this_news') }}</p>
              <div
                v-if="socialURL && post"
                class="mt-4 grid grid-flow-col xl:grid-cols-3 gap-4 xl:grid-flow-row justify-items-center px-4"
              >
                <ShareNetwork
                  network="facebook"
                  :url="socialURL + post.slug"
                  :title="post && post.title || ''"
                  :description="post.excerpt"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center"
                >
                  <font-awesome-icon :icon="['fab', 'facebook-f']" />
                </ShareNetwork>
                <ShareNetwork
                  network="twitter"
                  :url="socialURL + post.slug"
                  :title="post && post.title || ''"
                  :description="post.excerpt"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    style="margin: 4px auto;"
                  >
                    <path
                      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                    />
                  </svg>
                </ShareNetwork>
                <ShareNetwork
                  network="linkedin"
                  :url="socialURL + post.slug"
                  :title="post && post.title || ''"
                  :description="post.excerpt"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center"
                >
                  <font-awesome-icon :icon="['fab', 'linkedin']" />
                </ShareNetwork>
                <ShareNetwork
                  network="whatsapp"
                  :url="socialURL + post.slug"
                  :title="post && post.title || ''"
                  :description="post.excerpt"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center"
                >
                  <font-awesome-icon :icon="['fab', 'whatsapp']" />
                </ShareNetwork>
                <ShareNetwork
                  network="messenger"
                  :url="socialURL + post.slug"
                  :title="post && post && post.title || '' || ''"
                  :description="post.excerpt"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center"
                >
                  <font-awesome-icon :icon="['fab', 'facebook-messenger']" />
                </ShareNetwork>
                <a
                  href="javascript:void(0);"
                  class="inline-block w-7 h-7 text-white p-0.5 rounded-full text-center bg-black"
                  @click="printArticle(post)"
                >
                  <font-awesome-icon :icon="['fas', 'print']" />
                </a>
              </div>
              <!-- ads -->
              <v-ads
                v-if="adsUnderSocialShare"
                :ads="adsUnderSocialShare"
                class="text-center mt-4"
              />
              <client-only v-else>
                <Adsense
                  data-ad-client="ca-pub-3438694616169600"
                  data-ad-slot="2838794797"
                  is-new-ads-code="yes"
                  data-ad-format="auto"
                  data-full-width-responsive="yes"
                  ins-class="text-center mt-4"
                />
              </client-only>
              <!-- ads -->
            </div>
            <!-- Share social link -->
            <!-- ads -->
            <v-ads v-if="adsBottomNews1" :ads="adsBottomNews1" class="text-center my-4" />
            <client-only v-else>
              <!-- <Adsense
                data-ad-client="ca-pub-3438694616169600"
                data-ad-slot="2838794797"
                is-new-ads-code="yes"
                data-ad-format="auto"
                data-full-width-responsive="yes"
                ins-class="text-center my-4"
              /> -->
            </client-only>
            <!-- ads -->
            <!-- ads -->
            <v-ads v-if="adsBottomNews2" :ads="adsBottomNews2" class="text-center mb-4" />
            <client-only v-else>
              <!-- <Adsense
                data-ad-client="ca-pub-3438694616169600"
                data-ad-slot="2838794797"
                is-new-ads-code="yes"
                data-ad-format="auto"
                ins-class="text-center mb-4"
                data-full-width-responsive="yes"
              /> -->
            </client-only>
            <!-- ads -->
            <!-- ads -->
            <v-ads v-if="adsBottomNews3" :ads="adsBottomNews3" />
            <!-- ads -->
          </section>
        </div>
      </article>
    </section>
    <!-- column 1 -->

    <!-- column 2 -->
    <section class="col-auto xl:col-span-5 xl:mt-6" :class="{ 'hidden xl:block': hideInMobile }">
      <v-ads v-if="adsRightSide1" :ads="adsRightSide1" class="text-center mb-4" />
      <client-only v-else>
        <!-- Hidden google ads from post single view page -->
        <!-- <Adsense
          data-ad-client="ca-pub-3438694616169600"
          data-ad-slot="3025948319"
          data-full-width-responsive="yes"
          is-new-ads-code="yes"
          data-ad-format="auto"
          ins-class="text-center mb-4"
        /> -->
      </client-only> 
      <div class="bg-bg2-light dark:bg-bg2-dark mb-4">
        <v-heading
          :level="2"
          class="font-bold uppercase text-lg xl:text-xl bg-gray text-white py-2 px-5"
        >
          <nuxt-link to="/" class="flex items-center">
            <span class="mr-5">{{ $t('headings.more_news') }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="21"
              viewBox="0 0 16 21"
              class="fill-current"
            >
              <path
                id="Polygon_2"
                data-name="Polygon 2"
                d="M10.5,0,21,16H0Z"
                transform="translate(16) rotate(90)"
              />
            </svg>
          </nuxt-link>
        </v-heading>

        <div>
          <category-media-left-right
            v-for="item in relatedPosts"
            :key="item.id"
            :title="item.title"
            :url="item.slug"
            :category-only="false"
            :category="item.category"
            :datetime="item.publishedAt"
            :image-left="item.image"
            class="mb-4"
          />
        </div>
      </div>
      <v-ads v-if="adsRightSide2" :ads="adsRightSide2" class="text-center mb-4" />
      <client-only v-else>
        <Adsense
          data-ad-client="ca-pub-3438694616169600"
          data-ad-slot="1429154987"
          data-full-width-responsive="yes"
          is-new-ads-code="yes"
          data-ad-format="auto"
          ins-class="text-center mb-4"
        />
      </client-only>
      <div>
        <category-media-left-right
          v-for="item in morePosts"
          :key="item.id"
          :title="item.title"
          :url="item.slug"
          :category-only="false"
          :category="item.category"
          :datetime="item.datetime"
          :image-left="item.image"
          class="mb-4"
        />
      </div>
      <v-ads v-if="adsRightSide3" :ads="adsRightSide3" class="text-center" />
      <client-only v-else>
        <Adsense
          data-ad-client="ca-pub-3438694616169600"
          data-ad-slot="3025948319"
          data-full-width-responsive="yes"
          is-new-ads-code="yes"
          data-ad-format="auto"
          ins-class="text-center"
        />
      </client-only>
    </section>
    <!-- column 2 -->

    <!-- For inner ads -->
    <div
      v-if="postType === 'main_single' && adsInsideNews"
      id="insideNewsAds"
      :data-src="adsInsideNews.content"
      :data-link="adsInsideNews.link"
    ></div>
  </div>
</template>