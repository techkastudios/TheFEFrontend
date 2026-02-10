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
          <span class="mr-5">{{ $t('headings.terms_of_service') }}</span>
        </div>
      </v-heading>
      <div>
        <h2
          class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5"
        >
          {{ $t('terms_of_service.overview') }}
        </h2>
        <p class="mb-2 text-justify">
          This website is operated by The Financial Express (FE). Throughout
          this site, the terms “we”, “us” and “our” refer to The Financial
          Express (or The FE). The FE offers this website, including all
          information, tools and services available from it, to the
          users/viewers/visitors/readers, subject to their acceptance of all
          terms, conditions, policies and notices stated herein below.
        </p>
        <p class="mb-2 text-justify">
          By visiting our site, the readers/viewers/users engage in our
          “Service” and agree to be bound by the following terms and conditions
          (“Terms of Service”, “Terms”), including those additional terms and
          conditions and policies referenced herein and/or available by
          hyperlink. These Terms of Service apply to all users -- browsers,
          vendors, customers, merchants, and/ or contributors -- to contents of
          the site, without limitation.
        </p>
        <p class="mb-2 text-justify">
          Please read these Terms of Service carefully before accessing or using
          our website. If the users/readers/viewers do not agree to all the
          terms and conditions of this agreement, then they may not access the
          website or use any of its services. If these Terms of Service are
          considered an offer, acceptance is expressly limited to these Terms of
          Service.
        </p>
        <p class="mb-2 text-justify">
          Any new features or contents which are added to the current site shall
          also be subject to the Terms of Service. Readers/viewers/visitors can
          review the most current version of the Terms of Service at any time on
          this page. We reserve the right to update, change or replace any part
          of these Terms of Service by posting updates and/or changes to our
          website. It is the responsibility of readers/viewers/visitors to check
          this page periodically for changes. Their continued use of, or access
          to, the website, following the posting of any changes, constitutes
          acceptance of those changes.
        </p>
        <h2
          class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5"
        >
          {{ $t('terms_of_service.general') }}
        </h2>
        <p class="mb-2 text-justify">
          These Terms of Service and any policies or operating rules posted by
          the FE on this site or in respect to the Service constitutes the
          entire agreement and understanding between viewers/visitors/readers
          and the Financial Express (FE) with its logo, and govern
          viewers’/visitors’/readers’ use of the Service, superseding any prior
          or contemporaneous agreements, communications and proposals, whether
          oral or written, between the two parties (including, but not limited
          to, any prior versions of the Terms of Service) -- the FE and its
          readers in print and viewers/visitors on online edition. Any
          ambiguities in the interpretation of these Terms of Service shall not
          be construed against the drafting party.
        </p>
        <p class="mb-2 text-justify">
          The FE does not guarantee, represent or warrant that
          viewers’/visitors’/ readers’ use of its service will be uninterrupted,
          timely, secure or error-free. The failure of the FE to exercise or
          enforce any right or provision of these Terms of Service shall not
          constitute a waiver of such right or provision on its part.
        </p>
        <p class="mb-2 text-justify">
          In no case the FE, its owning company’s directors, officers,
          employees, affiliates, agents, suppliers or service-providers, shall
          be liable for any kind of injury, loss, claim, or any direct,
          indirect, incidental, punitive, special, or consequential damages.
          Such damages covering, among others, loss of profits, revenue,
          savings, data etc., replacement costs, or any similar ones, whether
          based in contract, tort (including negligence), strict liability or
          otherwise, arising out of viewers’/visitors’/readers’ use of any of
          the services or any of the products procured using the service. This
          Agreement is governed by the laws of Bangladesh.
        </p>
        <h2
          class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5"
        >
          {{ $t('terms_of_service.our_contents') }}
        </h2>
        <p class="mb-2 text-justify">
          To the extent permitted by law, the FE does do not accept any
          responsibility for any statement in its contents and it will not
          accept any liability for any loss caused as a result of
          viewers’/visitors’/readers’ doing or not doing anything as a result of
          viewing or reading the contents or any part of it. This site may
          contain certain historical information. Necessarily, this is not
          current and is provided for reference only. The FE reserves the right
          to modify the contents of this site at any time, but has no obligation
          to update any information on its site. Viewers/visitors/readers agree
          that it is their responsibility to monitor changes to the site.
        </p>
        <p class="mb-2 text-justify">
          Occasionally there may be information on the FE’s site or in the
          Service that contains typographical errors, inaccuracies or omissions.
          The FE reserves the right to correct any errors, inaccuracies or
          omissions, and to change or update information or cancel orders
          without prior notice if any information in the Service or on any
          related website is inaccurate at any time.
        </p>
        <h2
          class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5"
        >
          {{ $t('terms_of_service.fe_site_and_third_party_links') }}
        </h2>
        <p class="mb-2 text-justify">
          The FE does not warrant that its site is virus free. Each individual
          advertiser is solely responsible for the contents of advertising
          materials in any issue of the FE. The FE expects that the
          viewers/visitors/readers will not use the site to upload, post, E-mail
          or otherwise transmit any content that they do not have a right to
          transmit under the law. Certain contents, products and services
          available via its service may include materials from Third-Parties.
          Third-party links on this site may direct the viewers/visitors/readers
          to third-party websites that are not affiliated with the FE. The FE is
          not responsible for examining or evaluating such contents or their
          accuracy and it does not warrant and will not have any liability or
          responsibility for any third-party materials or websites, or for any
          other materials, products, or services of third-parties. The FE is not
          liable for any harm or damages arising from the purchase or use of
          goods, services, resources, content, or any other transactions made in
          connection with any third-party websites. The viewers/visitors/readers
          shall have to review carefully the third-parties’ policies and
          practices and make sure they understand them before making any
          transaction. Complaints, claims, concerns, or questions regarding
          third-party products should be directed to the third-party.
        </p>
        <h2
          class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5"
        >
          {{ $t('terms_of_service.copyright_policy') }}
        </h2>
        <p class="mb-2 text-justify">
          The FE doesn’t take any liability for any loss arising from the ways
          the viewers/visitors/readers access the FE site. The FE expects that
          they abide by the law of the country of their residence regarding
          accessing the site through internet and the terms and conditions
          stated herein. Under the law of Bangladesh, the materials the FE
          publishes or the materials the viewers/visitors/readers find on its
          website are protected by copyright in respect thereof. The
          viewers/visitors/readers should not infringe the copyright that the
          management of The FE enjoys with regard to the contents of the site.
          Visitors/viewers to the site should also respect the copyright of any
          other person with regard to any material that they publish in The
          Financial Express.
        </p>
        <p class="mb-2 text-justify">
          <small>
            1. The viewers/visitors use of the material appearing on the site
            should be personal and non-commercial.
          </small>
          <br />
          <small>
            2. The FE is the sole owner of all contents of the site.
          </small>
          <br />
          <small>
            3. The viewers/visitors may download contents for their personal and
            non-commercial use only.
          </small>
          <br />
          <small>
            4. The viewers/visitors may not reproduce any of its contents
            without the FE’s prior written approval.
          </small>
          <br />
        </p>
        <h2
          class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5"
        >
          {{ $t('terms_of_service.privacy_policy') }}
        </h2>
        <p class="mb-2 text-justify">
          The right to privacy is right enjoyed by every citizen of the country.
          The FE respects the viewers/visitors/readers privacy and expects them
          to respect its privacy and that of those who publish information and
          material in the daily.
        </p>
        <p class="mb-2 text-justify">
          <small>
            1. If the viewers/visitors/readers visit the FE’s website just to
            browse, read pages or download information but do not register for
            any of its services, the FE gathers and stores certain information
            about their visit automatically. This information cannot and does
            not identify the viewers/visitors/readers personally.
          </small>
          <br />
          <small>
            2. The FE collects personal information from the
            viewers/visitors/readers only if they provide it voluntarily.
          </small>
          <br />
          <small>
            3. The kind of information that is gathered automatically includes
            the type of browser the viewers/visitors/readers are using (e.g.
            Internet Explorer), the type of Operating System they are using
            (e.g. Windows ’98 or Mac OS) and the domain name of their Internet
            Service Provider.
          </small>
          <br />
        </p>
        <h2
          class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5"
        >
          {{ $t('terms_of_service.comments_feedback_and_other_submissions') }}
        </h2>
        <p class="mb-2 text-justify">
          The FE welcomes the viewers’/visitors’/readers’ comments in English on
          its contents on its site. However, they are advised to follow the FE’s
          guidelines:
        </p>
        <p class="mb-2 text-justify">
          <small> 1. Feedbacks should preferably be concise. </small>
          <br />
          <small>
            2. Comments need to be relevant to the topic being discussed.
          </small>
          <br />
          <small>
            3. There should be no personal attacks, of any kind whatsoever, on
            others and comments should under no way be aggressive or rude in
            nature. The FE has the right, at its sole discretion, to remove
            comments that contravene its guidelines and terms.
          </small>
          <br />
        </p>
        <p class="mb-2 text-justify">
          If any viewer/visitor/reader sends certain specific submissions at
          FE’s request or not or provide some creative ideas, suggestions,
          proposals, plans, or other materials, whether online, by email or
          postal mail, or otherwise, they agree that the FE may, at any time,
          edit, copy, publish and distribute the same. The FE may monitor, edit
          or remove contents that it considers in its sole discretion to be
          unlawful, offensive, threatening, libellous, defamatory, pornographic,
          or otherwise objectionable or violate any party’s intellectual
          property or any of these Terms of Service, but it is under no
          obligation to do it.
        </p>
        <p class="mb-2 text-justify">
          The viewers/visitors/readers agree that comments will not violate any
          right of any third-party, including copyright, trademark, privacy,
          personality or other personal or proprietary rights. They further
          agree that their comments will not contain libellous or otherwise
          unlawful, abusive or obscene material, or carry any computer virus or
          other malware that could in any way affect the operation of the
          Service or any related websites. They will not use a false or
          fictitious e-mail address, or otherwise mislead the FE or
          third-parties as to the origin of any comments. They are solely
          responsible for any comments they make and also for their accuracy.
          The FE takes no responsibility and assumes no liability for any
          comments posted by them or any third-party.
        </p>
        <h2
          class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5"
        >
          {{ $t('terms_of_service.limitations_of_fe_content') }}
        </h2>
        <p class="mb-2 text-justify">
          <small>
            1. The FE contents (including any information it publishes regarding
            third party products) are only for the viewers’/visitors’/readers’
            general information and are not intended to address their particular
            requirements. In particular, the FE contents do not constitute any
            form of advice, recommendation, representation, endorsement or
            arrangement by it. It is not intended to be, and should not be,
            relied upon by users/viewers/visitors in making (or refraining from
            making) any specific investment, purchase, sale or other decisions.
            Appropriate independent advice should be obtained from a qualified
            financial adviser or a professional, before making any decision.
          </small>
          <br />
          <small>
            2. The FE preserves its right, without any limitation, to develop
            contents with reasonable skill and care. It will make reasonable
            efforts to promptly remedy any faults of which it is made aware.
          </small>
          <br />
          <small>
            3. The FE does not make any promise or give any warranty about its
            site and contents published in its both Online & Print versions. All
            the FE contents are provided on an “as is” and “as available” basis.
            This means that the FE does not make any promises in respect of its
            sites or the services and functions available on or through its
            sites. Quality, completeness or accuracy of the information
            published on, or linked to and from, the FE site are, however, not
            its responsibility, other than those expressly stated above. The FE
            does not control third party communication networks (including the
            viewers’/visitors’/readers’ internet service providers), or the acts
            of third parties and acts of God are beyond the control of the FE
            and it is in no way liable for those matters outside its operational
            purview.
          </small>
          <br />
        </p>
        <h2
          class="mb-2 font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5"
        >
          {{ $t('terms_of_service.contact_us') }}
        </h2>
        <p class="mb-2 text-justify">
          Questions about the Terms of Service should be sent to the FE at
          fexpress68@gmail.com
        </p>
      </div>
    </v-container>
  </div>
</template>
