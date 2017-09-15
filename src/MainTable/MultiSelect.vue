<template>
  <input type="checkbox" v-model="status" @change="toggle" name="MultiSelect">
</template>
<script>
import replaceWith from 'replace-with'
/**
 * checkbox for multiple select within the leading <th>/<td>
 */
export default {
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
      if (this.row) return this.status = this.pos >= 0
      if (this.rows) this.status = this.rows.length === selection.length
    }
  }
}
</script>
