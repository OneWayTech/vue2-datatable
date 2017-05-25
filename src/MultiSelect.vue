<template>
  <input type="checkbox" v-model="status" @change="toggle">
</template>
<script>
import replaceWith from 'replace-with'
/**
 * checkbox for multiple select inside the leading <th>/<td>
 */
export default {
  // row for tbody checkbox, rows for thead checkbox
  props: { selection: Array, row: Object, rows: Array },
  data: () => ({ status: false }),
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
      if (row) {
        if (status && pos === -1) selection.push(row)
        if (!status && pos >= 0) selection.splice(pos, 1)
        return
      }
      if (rows) replaceWith(selection, status ? rows : [])
    }
  },
  watch: {
    rows () {
      replaceWith(this.selection, [])
    },
    selection (selection) {
      if (this.row) return this.status = this.pos >= 0
      if (this.rows) this.status = this.rows.length === selection.length
    }
  }
}
</script>
