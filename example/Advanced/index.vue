<template>
  <div>
    <p><code>query: {{ query }}</code></p>
    <datatable
      support-backup
      support-nested
      table-bordered
      v-bind="$data">
      <button class="btn btn-default" @click="alertSelectedUids"
        :disabled="!selection.length">
        <i class="fa fa-commenting-o"></i>
        Alert selected uid(s)
      </button>
    </datatable>
  </div>
</template>
<script>
import Vue from 'vue'
import Datatable from '../../'
import mockData from '../_mockData'
import comps from './comps/'

export default {
  name: 'FriendsTable', // `name` is required as a recursive component!
  props: ['row'], // `props.row` from the parent FriendsTable (if exists)
  components: { Datatable, ...comps },
  data () {
    return {    
      columns: [{
        groupName: 'Normal',
        columns: [
          { title: 'Email', field: 'email', visible: false, thComp: 'FilterTh', tdComp: 'Email' },
          { title: 'Username', field: 'name', thComp: 'FilterTh' },
          { title: 'Country', field: 'country', thComp: 'FilterTh' },
          { title: 'IP', field: 'ip', visible: false, tdComp: 'IP' }
        ]
      }, {
        groupName: 'Sortable',
        columns: [
          { title: 'User ID', field: 'uid', sort: true, visible: 'true', weight: 1 },
          { title: 'Age', field: 'age', sort: true },
          { title: 'Create time', field: 'createTime', sort: true,
            thClass: 'w-240', tdClass: 'w-240', thComp: 'CreatetimeTh', tdComp: 'CreatetimeTd' }
        ]
      }, {
        groupName: 'Extra (radio)',
        type: 'radio',
        columns: [
          { title: 'Operation', tdComp: 'Opt' },
          // don't forget to set the columns below `visible: false`, since the `type` is `radio`
          { title: 'Color', field: 'color', explain: 'Favorite color', visible: false, tdComp: 'Color' },
          { title: 'Language', field: 'lang', visible: false, thComp: 'FilterTh' },
          { title: 'PL', field: 'programLang', explain: 'Programming Language', visible: false, thComp: 'FilterTh' }
        ]
      }],
      data: [],
      total: 0,
      selection: [],
      summary: {},

      // `query` will be set to `{ limit: 10, offset: 0, sort: '', order: '' }` by default
      // other query fields should be declared explicitly in the following
      // or set with `Vue.set / $vm.$set` manually later
      // otherwise the new added properties would not be reactive
      query: this.row ? { uid: this.row.friends } : {},

      // any other staff that you want to pass into dynamic components (thComp / tdComp / nested Comp)
      xprops: {
        eventbus: new Vue()
      }
    }
  },
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
    },
    alertSelectedUids () {
      alert(this.selection.map(({ uid }) => uid))
    }
  }
}
</script>
<style>
.w-240 {
  width: 240px;
}
</style>
