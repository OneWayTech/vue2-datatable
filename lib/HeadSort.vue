<template>
  <a href="javascript:;" @click="handleSort" class="p-l-5">
    <i class="fa" :class="[cls, { 'text-muted': !this.order }]"></i>
  </a>
</template>
<script>
/**
 * Sorting arrows inside <th>
 */
export default {
  props: {
    field: { type: String, required: true },
    query: { type: Object, required: true }
  },
  data: () => ({ order: '' }),
  computed: {
    cls () {
      return `fa-sort-${this.order}`.replace(/-$/, '')
    }
  },
  watch: {
    query: {
      handler ({ sort: field, order }) {
        this.order = field === this.field ? order : ''
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleSort () {
      const { query, order } = this
      query.sort = this.field
      query.order = this.order = order === 'desc' ? 'asc' : 'desc'
    }
  }
}
</script>
<style>
.p-l-5 {
  padding-left: 5px;
}
</style>
