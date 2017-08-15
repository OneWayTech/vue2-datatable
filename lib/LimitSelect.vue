<template>
  <label>
    {{ $i18nForDatatable('show') }}
    <select class="form-control input-sm -limit-select" v-model="limit">
      <option v-for="i in options" :value="i">{{ i }}</option>
    </select>
    {{ $i18nForDatatable('items per page') }}
  </label>
</template>
<script>
export default {
  props: {
    query: { type: Object, required: true }
  },
  data () {
    return {
      limit: this.query.limit,
      options: [10, 20, 40, 80, 100]
    }
  },
  watch: {
    limit (v) {
      this.query.limit = v
      this.query.offset = 0 // reset to the first page
    }
  }
}
</script>
<style>
.-limit-select {
  display: inline-block;
  width: 65px;
}
</style>
