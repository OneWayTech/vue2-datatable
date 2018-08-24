<template>
  <a href="#" @click.prevent="handleClick" name="HeadSort" role="button" v-bind:aria-label="sortLabel">
    <i :class="cls"></i>
  </a>
</template>
<script>
/**
 * Sorting arrows within <th>
 */
export default {
  name: 'HeadSort',
  props: {
    field: { type: String, required: true },
    query: { type: Object, required: true }
  },
  data: () => ({
    order: ''
  }),
  computed: {
    cls () {
      const { order } = this
      return [
        'fa',
        { 'fa-sort text-muted': !order,
          'fa-sort-up': order === 'asc',
          'fa-sort-down': order === 'desc'
        }
      ]
    },
    sortLabel() {
      const { order } = this;
      let key = 'Not sorted';
      const nextOrder = this.getNextSortOrder();
      if (nextOrder === 'asc') {
        key = 'Sort ascending';
      } else if (nextOrder === 'desc') {
        key = 'Sort descending';
      }
      return this.$i18nForDatatable(key) + ' ' + this.field;
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
    getNextSortOrder () {
      return this.order === 'desc' ? 'asc' : 'desc';
    },
    handleClick () {
      const { query } = this
      query.sort = this.field
      query.order = this.getNextSortOrder();
    }
  }
}
</script>
