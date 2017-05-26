<template>
  <datatable
    support-backup
    support-nested
    v-bind="$data">
    <code>{{ query }}</code>
  </datatable>
</template>
<script>
import Vue from 'vue'
import Datatable from '../'
import * as comps from './comps/'
// import comps from './comps/' // P.S. this will not work!
import mockData from './mock'

export default {
  components: { Datatable, ...comps },
  data: () => ({
    columns: [{
      groupName: 'Normal',
      columns: [
        { title: 'Email', field: 'email', visible: false },
        { title: 'Username', field: 'name' },
        { title: 'Country', field: 'country' },
        { title: 'IP', field: 'ip', visible: false }
      ]
    }, {
      groupName: 'Sortable',
      columns: [
        { title: 'User ID', field: 'uid', sort: true, visible: 'true', weight: 1 },
        { title: 'Age', field: 'age', sort: true },
        { title: 'Create time', field: 'createTime', sort: true, thClass: 'w-240', tdClass: 'w-240', thComp: 'CreatetimeTh', tdComp: 'CreatetimeTd' }
      ]
    }, {
      groupName: 'Extra (radio)',
      type: 'radio',
      columns: [
        { title: 'Color', field: 'color', explain: 'Favorite color', tdComp: 'Color' },
        // don't forget to set the columns belows invisible since we set `type` to `radio`
        { title: 'Language', field: 'lang', visible: false },
        { title: 'PL', field: 'programLang', explain: 'Programming Language', visible: false }
      ]
    }],
    data: [],
    total: 0,
    selection: [],
    summary: {},
    // `query` will be set to `{ limit: 10, offset: 0, sort: '', order: 'asc' }` by default
    // other query fields should be declared explicitly in the following
    query: { searchName: '' },
    xprops: { eventbus: new Vue() }
  }),
  watch: {
    query: {
      handler () {
        this.handleQueryChange()
      },
      deep: true // must deep
    }
  },
  methods: {
    handleQueryChange () {
      mockData(this.query).then(({ rows, total, summary }) => {
        this.data = rows
        this.total = total
        this.summary = summary
      })
    }
  }
}
</script>
<style>
.w-240 {
  width: 240px;
}
</style>
