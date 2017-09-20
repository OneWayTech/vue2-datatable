<template>
  <label name="LimitSelect">
    <select class="form-control input-sm -limit-select" v-model="query.limit"
      @change="query.offset = 0 /* reset to the first page */">
      <option v-for="i in options" :value="i">{{ i }}</option>
    </select>
    {{ $i18nForDatatable('items / page') }}
  </label>
</template>
<script>
export default {
  props: {
    query: { type: Object, required: true }
  },
  data: () => ({
    options: [10, 20, 40, 80, 100]
  })
}
</script>
<style>
.-limit-select {
  display: inline-block;
  width: 65px;
}
</style>
