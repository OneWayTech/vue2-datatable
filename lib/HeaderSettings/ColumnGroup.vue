<template>
  <ul class="-col-group">
    <label class="-col-group-title">
      {{ colGroup.groupName }}
    </label>
    <li v-for="(col, idx) in columns">
      <input
        :type="inputType"
        :id="col.fieldId"
        :name="fieldName"
        :checked="'' + col.visible === 'true'"
        :disabled="typeof col.visible === 'string'"
        @change="handleChange(idx, $event.target.checked)">
      <label :for="col.fieldId">
        {{ col.label || col.title }}
        <i v-if="col.explain" class="fa fa-info-circle cursor-help" :title="col.explain"></i>
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
      // P.S. $vm._uid is a private property of the instance
      return this.inputType === 'radio' && this.colGroup.groupName + this._uid
    },
    columns () {
      // fieldId is used for <label for="fieldId">XXX</label>
      return this.colGroup.columns.map((col, i) => (col.fieldId = `-col-${this._uid}-${col.field || i}`, col))
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
      this.changes = [] // don't forget to clear the stack
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
  font-size: 1.5em;
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
