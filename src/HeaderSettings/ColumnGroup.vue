<template>
  <ul class="-col-list">
    <label class="-col-list-title">
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
        {{ col.title }}
        <i v-if="col.explain" class="fa fa-info-circle cursor-help" :title="col.explain"></i>
      </label>
    </li>
  </ul>
</template>
<script>
import replaceWith from 'replace-with'

export default {
  props: {
    broadcast$: { type: Number, required: true },
    colGroup: { type: Object, required: true }
  },
  data: () => ({ changes: [] }), // record the changes with a stack
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
  watch: {
    broadcast$ () {
      let { changes, colGroup: { columns } } = this
      if (!changes.length) return

      // make changes in the queue
      this.$nextTick(() => {
        if (this.inputType === 'radio') {
          const { idx } = changes.pop()
          replaceWith(columns, columns.map((col, i) => (col.visible = i === idx, col)))
        } else {
          changes.forEach(({ idx, isChecked }) => {
            this.$set(columns, idx, { ...columns[idx], visible: isChecked })
          })
        }
        this.changes = [] // don't forget to clear the stack
      })
    }
  },
  methods: {
    handleChange (idx, isChecked) {
      this.changes.push({ idx, isChecked })
    }
  }
}
</script>
<style>
.-col-list {
  width: 150px;
  display: inline-block;
  padding: 0;
  vertical-align: top;
}
.-col-list-title {
  display: block;
  margin: 5px;
  padding: 5px;
  border-bottom: 1px solid #ddd;
  font-size: 1.5em;
}
.-col-list > li {
  margin-bottom: 2px;
  padding-left: 10px;
  list-style: none;
  line-height: 20px;
  font-size: 12px;
}
.-col-list > li > input {
  vertical-align: -2px;
}
</style>
