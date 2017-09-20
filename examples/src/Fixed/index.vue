<template>
  <div style="margin: 0 auto; width: 800px">
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
</template>
<script>
import mockData from '../_mockData'

export default {
  data: () => ({
    fixHeaderAndSetBodyMaxHeight: 200,
    tblStyle: 'table-layout: fixed', // must
    tblClass: 'table-bordered',
    columns: [
      { title: 'User ID', field: 'uid', sortable: true, fixed: true },
      { title: 'Username', field: 'name' },
      { title: 'Age', field: 'age', sortable: true },
      { title: 'Email', field: 'email' },
      { title: 'Country', field: 'country', fixed: 'right' }
    ].map(col => (col.colStyle = { width: '200px' }, col)),
    data: [],
    summary: {},
    total: 0,
    query: {}
  }),
  watch: {
    query: {
      handler (query) {
        mockData(query).then(({ rows, total, summary }) => {
          this.data = rows
          this.total = total
          this.summary = summary
        })
      },
      deep: true
    }
  }
}
</script>
