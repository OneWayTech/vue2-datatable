<template>
  <ul class="-col-group" name="ColumnGroup">
    <label class="-col-group-title">
      {{ groupName === 'undefined' ? 'Columns' : groupName }}
    </label>
    <li v-for="(col, idx) in columns">
      <input
        type="checkbox"
        :id="uuidGen(col.field || idx)"
        :name="groupName"
        :checked="isColVisible(col)"
        :disabled="typeof col.visible === 'string'"
        @change="handleChange(col, $event.target.checked)">
      <label :for="uuidGen(col.field || idx)">
        {{ col.label || col.title }}
        <i v-if="col.explain" class="fa fa-info-circle" style="cursor: help" :title="col.explain"></i>
      </label>
    </li>
  </ul>
</template>
<script>
import isColVisible from '../_utils/isColVisible'

export default {
  name: 'ColumnGroup',
  props: {
    groupName: { type: String, required: true },
    columns: { type: Array, required: true }
  },
  data: () => ({
    changes: [] // record the changes with a stack
  }),
  methods: {
    handleChange (col, isChecked) {
      this.changes.push({ col, isChecked })
    },
    uuidGen (key) {
      // $vm._uid is a private property of a Vue instance
      return `-col-${this._uid}-${key}`
    },
    apply () {
      this.changes.forEach(({ col, isChecked }) => {
        this.$set(col, 'visible', isChecked)
      })
      this.changes = [] // don't forget to clear the stack
    },
    isColVisible
  }
}
</script>
<style>
.-col-group {
  display: inline-block;
  margin-bottom: 5px;
  padding: 0;
  width: 150px;
  vertical-align: top;
}
.-col-group-title {
  display: block;
  margin: 5px;
  padding: 5px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
}
.-col-group > li {
  margin-bottom: 5px;
  padding-left: 10px;
  list-style: none;
  line-height: 20px;
  font-size: 12px;
}
.-col-group > li > * {
  margin: 0;
  vertical-align: middle;
}
</style>
