<template>
  <div>
    <p><code>query: {{ query }}</code></p>
    <datatable v-bind="$data">
      <button class="btn btn-default" @click="alertSelectedUids" :disabled="!selection.length">
        <i class="fa fa-commenting-o"></i>
        Alert selected uid(s)
      </button>
    </datatable>
  </div>
</template>
<script>
import Vue from 'vue'
import mockData from '../_mockData'
import components from './comps/'

export default {
  components,
  name: 'FriendsTable', // `name` is required as a recursive component
  props: ['row'], // from the parent FriendsTable (if exists)
  data () {
    const amINestedComp = !!this.row

    return {
      supportBackup: true,
      supportNested: true,
      tblClass: 'table-bordered',
      tblStyle: 'color: #666',
      columns: (() => {
        const cols =  [
          { title: 'UID', field: 'uid', label: 'User ID', sortable: true, visible: 'true' },
          { title: 'Email', field: 'email', visible: false, thComp: 'FilterTh', tdComp: 'Email' },
          { title: 'Username', field: 'name', thComp: 'FilterTh', tdStyle: { fontStyle: 'italic' } },
          { title: 'Country', field: 'country', thComp: 'FilterTh', thStyle: { fontWeight: 'normal' } },
          { title: 'IP', field: 'ip', visible: false, tdComp: 'IP' },
          { title: 'Age', field: 'age', sortable: true, thClass: 'text-info', tdClass: 'text-success' },
          { title: 'Create time', field: 'createTime', sortable: true, colClass: 'w-240', thComp: 'CreatetimeTh', tdComp: 'CreatetimeTd' },
          { title: 'Color', field: 'color', explain: 'Favorite color', visible: false, tdComp: 'Color' },
          { title: 'Language', field: 'lang', visible: false, thComp: 'FilterTh' },
          { title: 'PL', field: 'programLang', explain: 'Programming Language', visible: false, thComp: 'FilterTh' },
          { title: 'Operation', tdComp: 'Opt', visible: 'true' }
        ]
        const groupsDef = {
          Normal: ['Email', 'Username', 'Country', 'IP'],
          Sortable: ['UID', 'Age', 'Create time'],
          Extra: ['Operation', 'Color', 'Language', 'PL']
        }
        return cols.map(col => {
          Object.keys(groupsDef).forEach(groupName => {
            if (groupsDef[groupName].includes(col.title)) {
              col.group = groupName
            }
          })
          return col
        })
      })(),
      data: [],
      total: 0,
      selection: [],
      summary: {},

      // `query` will be initialized to `{ limit: 10, offset: 0, sort: '', order: '' }` by default
      // other query conditions should be either declared explicitly in the following or set with `Vue.set / $vm.$set` manually later
      // otherwise, the new added properties would not be reactive
      query: amINestedComp ? { uid: this.row.friends } : {},

      // any other staff that you want to pass to dynamic components (thComp / tdComp / nested components)
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
      deep: true
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
