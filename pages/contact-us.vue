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
          <span class="mr-5">{{ $t('headings.contact_us') }}</span>
        </div>
      </v-heading>
      <div>
        <div class="mb-4 text-center">
          Published by Syed Nasim Manzur for International Publications Limited
        </div>
        <div class="grid xl:grid-cols-16 gap-4">
          <div class="col-auto xl:col-span-2">
            <strong>{{ $t('address') }}</strong>
          </div>
          <div class="col-auto xl:col-span-12">
            : Tropicana Tower (4th Floor), 45, Topkhana Road, Dhaka-1000.
          </div>
        </div>
        <div class="grid xl:grid-cols-16 gap-4">
          <div class="col-auto xl:col-span-2">
            <strong>{{ $t('phone_no') }}</strong>
          </div>
          <div class="col-auto xl:col-span-12">
            : PABX : 02223389780 (Hunting), Mobile: 01917231083, Chattogram
            Office: 02333368533
          </div>
        </div>
        <div class="grid xl:grid-cols-16 gap-4">
          <div class="col-auto xl:col-span-2">
            <strong>{{ $t('extension') }}</strong>
          </div>
          <div class="col-auto xl:col-span-12">
            : 107, 108 & 109 (News), 105 & 106 (Reporting), 121 (Advertisement),
            112 (Circulation), 113 (Accounts) 130 & 138 (Management)
          </div>
        </div>
        <div class="grid xl:grid-cols-16 gap-4">
          <div class="col-auto xl:col-span-2">
            <strong>{{ $t('fax_no') }}</strong>
          </div>
          <div class="col-auto xl:col-span-12">: 880-2-02223387049</div>
        </div>
        <div class="grid xl:grid-cols-16 gap-4">
          <div class="col-auto xl:col-span-2">
            <strong>{{ $t('email') }}</strong>
          </div>
          <div class="col-auto xl:col-span-12">
            : editor@thefinancialexpress.com.bd, fexpress68@gmail.com,
            feonline99@gmail.com
          </div>
        </div>
        <div class="grid xl:grid-cols-16 gap-4">
          <div class="col-auto xl:col-span-2">
            <strong>{{ $t('editor') }}</strong>
          </div>
          <div class="col-auto xl:col-span-12">: Shamsul Huq Zahid</div>
        </div>
      </div>
    </v-container>
  </div>
</template>
