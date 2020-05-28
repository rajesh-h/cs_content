import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

Vue.filter('FormatDate', function (value) {
  if (value) {
    // return dayjs(new Date(value)).format('DD-MMM-YYYY HH:mm:ss')
    return dayjs(new Date(value)).fromNow()
  }
})
