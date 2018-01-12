<template>
  <input type="checkbox" v-model="status" @change="toggle" style="margin: 0; vertical-align: middle" name="MultiSelect">
</template>
<script>
import replaceWith from '../_utils/replaceWith'
/**
 * checkbox for multiple select within the leading <th>/<td>
 */
export default {
  name: 'MultiSelect',
  props: {
    selection: { type: Array, required: true },
    row: Object, // available for tbody checkbox
    rows: Array // available for thead checkbox
  },
  data: () => ({
    status: false
  }),
  computed: {
    pos () {
      const { selection, row } = this
      if (!selection || !row) return
      return selection.indexOf(row)
    }
  },
  methods: {
    toggle () {
      const { selection, row, rows, status, pos } = this
      if (rows) {
        replaceWith(selection, status ? rows : [])
        return
      }
      if (row) {
        if (status && pos === -1) selection.push(row)
        if (!status && pos >= 0) selection.splice(pos, 1)
      }
    }
  },
  watch: {
    rows () {
      replaceWith(this.selection, [])
    },
    selection (selection) {
      if (this.row) {
        this.status = this.pos >= 0
        return
      }
      if (this.rows) {
        // not only have same length but also non-zero
        this.status = this.rows.length === selection.length && selection.length
      }
    }
  }
}
</script>
