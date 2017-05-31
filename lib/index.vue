<template>
  <div>
    <div v-if="$slots.default || HeaderSettings" class="m-b-10 clearfix">
      <header-settings v-if="HeaderSettings" class="pull-right"
        :col-groups="columns" :support-backup="supportBackup">
      </header-settings>
      <slot></slot>
    </div>
    <!-- `.panel.panel-default` is for rounded table, see http://stackoverflow.com/a/20903465/5172890 -->
    <div class="table-responsive panel panel-default">
      <table class="table table-striped table-hover" :class="{ 'table-bordered': tableBordered }">
        <thead>
          <transition-group name="fade" tag="tr">
            <th v-if="selection && data.length" width="1em" key="th-multi">
              <multi-select :selection="selection" :rows="data" />
            </th>
            <th v-for="(column, idx) in columns$" :key="column.title || column.field || idx"
              :class="column.thClass" :style="column.thStyle">
              <!-- table head component (thComp). `v-bind` here is just like spread operator in JSX -->
              <component v-if="column.thComp" :is="comp[column.thComp]" v-bind="$props"
                :column="column" :field="column.field" :title="column.title">
              </component>
              <template v-else>
                {{ column.title }}
              </template>

              <i v-if="column.explain" class="fa fa-info-circle cursor-help" :title="column.explain"></i>
              <head-sort v-if="column.sort" :field="column.field" :query="query" class="pull-right" />
            </th>
          </transition-group>
        </thead>
        <tbody>
          <template v-for="item in data$">
            <tr>
              <td v-if="selection && data.length" width="1em">
                <multi-select :selection="selection" :row="item" />
              </td>
              <td v-for="column in columns$" :class="column.tdClass" :style="column.tdStyle">
                <!-- table body component (tdComp) -->
                <component v-if="column.tdComp" :is="comp[column.tdComp]" v-bind="$props"
                  :row="item" :field="column.field" :value="item[column.field]" :nested="item.__nested__">
                </component>
                <template v-else>
                  {{ item[column.field] }}
                </template>
              </td>
            </tr>
            <transition name="fade">
              <tr v-if="item.__nested__ && item.__nested__.visible">
                <td :colspan="colspan">
                  <!-- nested component -->
                  <component :is="comp[item.__nested__.comp]"
                    :row="item" :nested="item.__nested__" v-bind="$props">
                  </component>
                </td>
              </tr>
            </transition>
          </template>
          <tr v-if="!data.length">
            <td :colspan="colspan" class="text-center text-muted">
              ( No Data )
            </td>
          </tr>
          <tr v-if="summary && data.length" class="-summary-row">
            <td v-if="selection" width="1em"></td>
            <template v-for="(column, idx) in columns$">
              <!-- display the available fields only -->
              <td v-if="summary[column.field]" :class="column.tdClass" :style="column.tdStyle">
                <!-- table body component (tdComp) -->
                <component v-if="column.tdComp" :is="comp[column.tdComp]" v-bind="$props"
                  :row="summary" :field="column.field" :value="summary[column.field]">
                </component>
                <template v-else>
                  {{ summary[column.field] }}
                </template>
              </td>
              <td v-else>
                <!-- show summary label if the first column field has no data -->
                <i v-if="!idx" class="text-muted">Summary</i>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div><!-- .table-responsive -->
    <div v-if="Pagination" class="row">
      <div class="col-sm-6 nowrap">
        <strong>Total {{ total }} ,</strong>
        <limit-select :query="query" />
      </div>
      <div class="col-sm-6">
        <pagination class="pull-right" :total="total" :query="query" />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderSettings from './HeaderSettings/'
import HeadSort from './HeadSort'
import LimitSelect from './LimitSelect'
import MultiSelect from './MultiSelect'
import Pagination from './Pagination'
import replaceWith from 'replace-with'
import _orderBy from 'lodash/orderBy'

export default {
  name: 'Datatable',
  components: { HeaderSettings, HeadSort, LimitSelect, MultiSelect, Pagination },
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true },
    total: { type: Number, required: true },
    query: { type: Object, required: true },
    selection: Array, // for multi-select
    summary: Object, // an extra summary row
    HeaderSettings: { type: Boolean, default: true },
    Pagination: { type: Boolean, default: true },
    xprops: Object, // extra custom props passing to dynamic components
    supportBackup: Boolean, // support header settings backup
    supportNested: Boolean, // support nested components
    tableBordered: Boolean // add `.table-bordered` to <table>
  },
  created () { // init query
    const { query } = this
    const _query = { limit: 10, offset: 0, sort: '', order: '', ...query }
    Object.keys(_query).forEach(key => this.$set(query, key, _query[key]))
  },
  computed: {
    comp () {
      return this.$parent.$options.components // source of dynamic components
    },
    columns$ () {
      const { columns } = this
      if (!columns[0].groupName) replaceWith(columns, [{ groupName: 'Columns', columns: [...columns] }])

      let columns$ = []
      // collect visible columns
      columns.forEach(colGroup => columns$.push(
        ...colGroup.columns
          .map(col => (col.visible = typeof col.visible === 'undefined' ? true : col.visible, col))
          .filter(col => col.visible))
      )
      // sort by columns$[i].weight in descending order
      return _orderBy(columns$.map(col => ((col.weight = col.weight || 0), col)), 'weight', 'desc')
      // the sort shown below is not stable
      // return columns$.map(col => ((col.weight = col.weight || 0), col)).sort((a, b) => b.weight - a.weight)
    },
    colspan () {
      return this.columns$.length + (+!!this.selection)
    },
    data$ () {
      const { data } = this
      if (this.supportNested) {
        // support nested components with extra magic
        data.forEach(item => {
          if (!item.__nested__) {
            this.$set(item, '__nested__', {
              comp: '',
              visible: false,
              $toggle (comp, visible) {
                switch (arguments.length) {
                  case 0:
                    this.visible = !this.visible
                    break
                  case 1:
                    switch (typeof comp) {
                      case 'boolean':
                        this.visible = comp
                        break
                      case 'string':
                        this.comp = comp
                        this.visible = !this.visible
                        break
                    }
                    break
                  case 2:
                    this.comp = comp
                    this.visible = visible
                    break
                }
              }
            })
            Object.defineProperty(item, '__nested__', { enumerable: false })
          }
        })
      }
      return data
    }
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.m-b-10 {
  margin-bottom: 10px;
}
.nowrap {
  white-space: nowrap;
}
.cursor-help {
  cursor: help;
}
.-summary-row {
  background-color: #ddd !important;
}
</style>
