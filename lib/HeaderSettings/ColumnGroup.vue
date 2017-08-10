<template>
  <ul class="-col-group">
    <label class="-col-group-title">
      {{ colGroup.groupName }}
    </label>
    <li v-for="(col, idx) in options">
      <input
        :type="inputType"
        :id="col._uuid"
        :name="fieldName"
        :checked="'' + col.visible === 'true'"
        :disabled="typeof col.visible === 'string'"
        @change="handleChange(idx, $event.target.checked)">
      <label :for="col._uuid">
        {{ col.label || col.title }}
        <i v-if="col.explain" class="fa fa-info-circle" style="cursor: help" :title="col.explain"></i>
      </label>
    </li>
  </ul>
</template>
<script>
import replaceWith from 'replace-with'

export default {
  props: {
    colGroup: { type: Object, required: true }
  },
  data: () => ({
    changes: [] // record the changes with a stack
  }),
  computed: {
    inputType () {
      return this.colGroup.type || 'checkbox'
    },
    fieldName () {
      // P.S. $vm._uid is a private property of a Vue instance which ensures uniqueness
      return this.inputType === 'radio' && this.colGroup.groupName + this._uid
    },
    options () {
      // _uuid is used for <label for="_uuid">XXX</label>
      return this.colGroup.columns.map((col, i) => ({ ...col, _uuid: `-col-${this._uid}-${col.field || i}` }))
    }
  },
  methods: {
    handleChange (idx, isChecked) {
      this.changes.push({ idx, isChecked })
    },
    apply () {
      let { changes, colGroup: { columns } } = this
      if (!changes.length) return

      if (this.inputType === 'radio') {
        const { idx } = changes.pop()
        replaceWith(columns, columns.map((col, i) => (col.visible = i === idx, col)))
      } else {
        changes.forEach(({ idx, isChecked }) => {
          this.$set(columns, idx, { ...columns[idx], visible: isChecked })
        })
      }
      replaceWith(changes, []) // don't forget to clear the stack
    }
  }
}
</script>
<style>
.-col-group {
  display: inline-block;
  width: 150px;
  padding: 0;
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
  margin-bottom: 2px;
  padding-left: 10px;
  list-style: none;
  line-height: 20px;
  font-size: 12px;
}
.-col-group > li > input {
  vertical-align: -2px;
}
</style>
