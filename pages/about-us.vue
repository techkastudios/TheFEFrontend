<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Aboutus',
  data() {
    return {}
  },
})
</script>

<template>
  <div id="about-us" ref="target" class="py-8">
    <v-container>
      <v-heading
        :level="2"
        class="font-bold font-heading uppercase text-xl text-white bg-gray py-2 px-5 mb-4"
      >
        <div class="flex items-center">
          <span class="mr-5">{{ $t('headings.about_us') }}</span>
        </div>
      </v-heading>
      <div>
        <p class="mb-2 text-justify">
          The Financial Express (FE) is the first financial daily of Bangladesh
          in English under the ownership of company -- International
          Publications Limited which was incorporated under the Companies Act in
          the year, 1993. The FE started its journey in 1993. In terms of
          circulation this daily now ranks second, both in its print and on
          online editions, among its contemporaries, in English language, in
          Bangladesh. It has currently syndication arrangements with the
          London-based Financial Times (FT) and the Prague-based Project
          Syndicate.
        </p>
        <p class="mb-2 text-justify">
          The FE’s prime objective is dissemination of fair and objective news
          and information. It makes its best efforts to keep its readers
          informed about the ongoing social, economic, financial and political
          developments daily (excepting its announced holidays) in its print
          edition, and also round-the-clock through its online version. It gives
          extensive coverage of economic and business developments taking place
          at home and abroad, in its both print and online editions. The FE puts
          particular emphasis on publication of in-depth analyses, views and
          opinions on major domestic, regional and global trade, business and
          other related issues.
        </p>
        <p class="mb-2 text-justify">
          The FE attaches importance to the broad principles of a competitive
          market-oriented economy; it remains steadfast in its commitment to
          promoting its goals and objectives in an environment in which the
          public policies should be geared to playing a facilitatory role under
          a transparent rule-based system and also to fostering inclusive growth
          and participatory socio-economic and political development in
          countries like Bangladesh. Besides, the newspaper is focussed on
          promoting economic and financial literacy in the country through its
          reader-friendly presentation of news and views.
        </p>
        <p class="mb-2 text-justify">
          The FE is committed to serving the interest of its readers and people
          in general. While upholding professional and ethical values of
          journalism, the FE takes into account the prevailing laws of the
          country that are applicable to publications of the newspapers. It
          respects human rights and dignity of all citizens and takes particular
          care about not maligning anyone, no matter what his or her social
          standing is. The copyright that the newspaper establishment, The
          Financial Express, enjoys with regard to all that is printed in the
          daily and posted on its website, are its legal rights. All those who
          read the daily or visit or view its website, are under legal
          obligation to respect, and not to infringe upon, those rights of the
          FE.
        </p>
      </div>
    </v-container>
  </div>
</template>
