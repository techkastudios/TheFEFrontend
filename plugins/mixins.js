import Vue from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({
    methods: {
      /**
       *
       * @param {*} date
       * @returns Jan 07, 2022 09:00 PM
       */
      getFormattedDateTime(date, lang) {
        if (!date) date = new Date()
        if (lang === 'bangla') {
          const month = dayjs(date).month()
          const postDate = dayjs(date).date()
          const year = dayjs(date).year()
          const hour = dayjs(date).hour()
          const timeFormat = this.getTimeFormat(date)
          const minute = dayjs(date).minute()
          const formatedDate =
            this.$t('calendar.date.' + postDate) +
            ' ' +
            this.$t('calendar.month.' + month) +
            ', ' +
            this.$t('calendar.year.' + year) +
            ' ' +
            this.$t('time.hour.' + hour) +
            ':' +
            this.$t('time.minute.' + minute) +
            ' ' +
            this.$t('time.time_format.' + timeFormat)
          return formatedDate
        } else {
          // return dayjs.utc(date).format('MMM DD, YYYY hh:mm A')
          return dayjs(date).format('MMM DD, YYYY HH:mm')
        }
      },
      /**
       *
       * @param {*} date
       * @returns Sunday, 1 January 2022
       */
      getFullDate(date, lang) {
        if (!date) date = new Date()
        if (lang === 'bangla') {
          return (
            this.$t('calendar.week.' + dayjs(date).day()) +
            ', ' +
            this.$t('calendar.date.' + dayjs(date).date()) +
            ' ' +
            this.$t('calendar.month.' + dayjs(date).month()) +
            ' ' +
            this.$t('calendar.year.' + dayjs(date).year())
          )
        } else {
          return dayjs().format('dddd, D MMMM YYYY')
        }
      },
      /**
       *
       * @param {*} date
       * @returns Sunday
       */
      getDayName(date) {
        if (!date) date = new Date()
        return dayjs().format('dddd')
      },
      /**
       *
       * @param {*} date
       * @returns 1 January 2022
       */
      getDate(date) {
        if (!date) date = new Date()
        return dayjs().format('D MMMM YYYY')
      },
      /**
       *
       * @param {*} date
       * @returns AM || PM
       */
      getTimeFormat(date) {
        if (!date) date = new Date()
        return dayjs(date).format('A')
      },
      /**
       *
       * @param {*} date
       * @returns 08:00
       */
      getTime(date) {
        if (!date) date = new Date()
        return dayjs(date).format('hh:mm')
      },
    },
  })
}
