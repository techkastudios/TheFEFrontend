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
          <span class="mr-5">{{ $t('terms_of_service.privacy_policy') }}</span>
        </div>
      </v-heading>
      <div>
        <h2
          class="mb-2 font-semibold text-h3-light dark:text-h2-dark text-xl leading-5.5"
        >
          {{ $t('terms_of_service.overview') }}
        </h2>
        
        <p style="margin-top:12pt; margin-bottom:12pt">
          This Privacy Policy outlines the basis on which information collected from users or provided by users is processed by us. The Financial Express is a daily newspaper operated under International Publications Limited, a company incorporated under the laws of Bangladesh, with its registered office at 45 Topkhana Road, Purana Paltan, Dhaka-1000. This policy governs our websites, mobile applications, newsletters, and other digital services (collectively, the "Service(s)").
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          This Privacy Policy is part of the Terms of Use governing the Services. Capitalised terms used but undefined here shall have the same meanings as given in the Terms of Use. We respect the privacy of our users and are committed to protecting it in accordance with applicable laws, global best practices, and Google Play Store policies as of 2025.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <h3 class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">1. INFORMATION RECEIVED, COLLECTED AND STORED</h3>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          We may collect and process the following categories of personal and usage data:
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">(a) Registration Data:</strong> When you register with us or participate in any of our campaigns or interactive features, we may collect your name, email address, contact number, and other data filled in the registration form.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">(b) Subscription Data:</strong> If you subscribe to our newsletter, we collect your email address and subscription preferences.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">(c) Technical and Usage Data:</strong> This includes IP addresses, browser types, device identifiers, and site usage data, obtained via cookies, pixels, or other tracking technologies.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">(d) Feedback or Correspondence:</strong> We may store messages, reviews, feedback, or queries that you send to us, including through contact forms or customer support.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">2. USE OF INFORMATION</strong>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          Your information may be used for the following legitimate business purposes:
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          (i) <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">User Identification and Authentication:</strong> To verify your identity, respond to queries, and enable account access.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          (ii) <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">Service Improvement:</strong> To conduct data analysis and usage trends to improve functionality and content delivery.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          (iii) <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">Marketing and Communication:</strong> To send you information about services, newsletters, offers, and updates, based on your preferences.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          (iv) <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">Security and Enforcement:</strong> To protect the integrity of our Services, prevent fraud, enforce our legal rights, and comply with legal obligations.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">3. DISCLOSURE OF PERSONAL INFORMATION</strong>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          We do not share your personal information with third parties, except in the following limited circumstances:
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">(a) With Sponsors or Campaign Partners:</strong> We may share anonymised or aggregated data related to campaign participation with sponsors. If you voluntarily disclose any personal information in public-facing campaign features, such information may become publicly visible.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">(b) With Advertising Partners:</strong> We may use third-party ad networks and analytics providers who collect non-identifiable data about your use of our Services to serve targeted advertisements.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">(c) With Service Providers:</strong> We may share information with third-party vendors (e.g., cloud hosting, analytics, and newsletter tools) under contractual obligations to protect your data.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">(d) Legal Disclosures and Safety:</strong> We may disclose information when legally required or to protect user safety, our rights, or to detect and prevent fraud or abuse.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h4-light dark:text-h4-dark text-xl leading-5.5">(e) Public Domain Information:</strong> Information you choose to share publicly (e.g., social media comments) or that is already in the public domain will not be considered sensitive.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">4. SECURITY OF PERSONAL INFORMATION</strong>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          We maintain technical and organisational safeguards to protect your data against unauthorised access, alteration, disclosure, or destruction. These include secure servers, encryption, limited access protocols, and regular security reviews. Despite our efforts, no digital platform is entirely secure. Any transmission of personal data is at your own risk.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          If you suspect a breach or believe your data is no longer secure, please contact us immediately at <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="91f7f4e9e1e3f4e2e2a7a9d1f6fcf0f8fdbff2fefc">[email&#160;protected]</a>.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">5. TRANSFER OF PERSONAL INFORMATION TO OTHER COUNTRIES</strong>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          We process and store your information within Bangladesh. We do not transfer personal data to any entity located outside Bangladesh unless required for the delivery of services and with appropriate safeguards in place.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">6. RETENTION AND DELETION OF DATA</strong>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          We retain personal information only as long as necessary to fulfil the purposes stated in this Privacy Policy or as required by law. Users may request data deletion through account settings or by contacting us directly. We will respond promptly and ensure compliance with data retention regulations, including Google Play Store’s 2025 policy.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">7. LINKS TO OTHER SITES</strong>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          Our Services may contain links to third-party websites and applications. These entities operate independently and have their own privacy policies. We are not responsible for their data practices. We encourage you to review their terms before sharing any information.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">8. CHILDREN’S PRIVACY</strong>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          Our Services are not intended for children under 13. We do not knowingly collect data from children without parental consent. If informed of such a case, we will take steps to delete the data promptly.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">9. YOUR RIGHTS</strong>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          Depending on applicable law, you may have the right to access, correct, update, or delete your personal data. You may also object to or restrict certain processing. To exercise these rights, contact us at <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="7e181b060e0c1b0d0d48463e19131f1712501d1113">[email&#160;protected]</a>.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">10. QUESTIONS AND COMPLAINTS</strong>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          All questions, concerns, or requests related to this Privacy Policy should be directed to:
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong>Email:</strong> <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="aacccfd2dad8cfd9d99c92eacdc7cbc3c684c9c5c7">[email&#160;protected]</a><br /> <strong>Address:</strong> The Financial Express, 45 Topkhana Road, Purana Paltan, Dhaka-1000
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          If you are submitting a formal complaint, please include:
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          a) Your address, telephone number, and e-mail address; b) A statement, under penalty of perjury, that the information in the notice is accurate.
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          We may not respond to queries addressed to other non-designated email addresses.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong class="font-semibold text-h3-light dark:text-h3-dark text-xl leading-5.5">11. CHANGES TO THIS POLICY</strong>
        </p>
        <p style="margin-top:12pt; margin-bottom:12pt">
          We may revise this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Effective Date." Your continued use of the Services implies acceptance of the updated policy.
        </p>
        <div style="text-align:center">
          <hr class="privacy-bar" />
        </div>
        <p style="margin-top:12pt; margin-bottom:12pt">
          <strong>Your use of our Services confirms that you have read, understood, and agreed to this Privacy Policy. If you do not agree with the policy, please refrain from using our Services.</strong>
        </p>
        <p>
          &#xa0;
        </p>        

      </div>
    </v-container>
  </div>
</template>

<style>
  .privacy-bar {
    border-bottom: 1.5px solid #00000017;
    width: 100%;
  }
</style>
