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

Vue.filter('getSrcSet', function (value) {
  if (value) {
    // return dayjs(new Date(value)).format('DD-MMM-YYYY HH:mm:ss')
    const start = value.split('.jpg')[0]
    // const end = value.split('.jpg')[1]
    const _640 = start + '_640x360.jpg?alt=media 640w, '
    const _960 = start + '_960x540.jpg?alt=media 960w, '
    const _1280 = start + '_1280x720.jpg?alt=media 1280w, '
    const _1440 = start + '_1440x810.jpg?alt=media 1440w, '
    return _640 + _960 + _1280 + _1440 + value + ' 1920w'
  }
})
