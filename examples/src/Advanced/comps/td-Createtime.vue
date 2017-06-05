<template>
  <span>{{ t }}</span>
</template>
<script>
import moment from 'moment'

export default {
  props: ['value', 'xprops'],
  data: () => ({
    displayBy: 'day'
  }),
  created () {
    this.xprops.eventbus.$on('CREATE_TIME_FORMAT', displayBy => {
      this.displayBy = displayBy
    })
  },
  computed: {
    t () {
      const t = moment(this.value)

      switch (this.displayBy) {
        case 'year':
          return t.format('YYYY')
        case 'month':
          return t.format('YYYY MMM')
        case 'week':
          return t.format('YYYY #W')
        case 'day':
        default:
          return t.format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
}
</script>
