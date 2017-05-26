<template>
  <div class="-createtime-th-comp">
    Create time by &nbsp;
    <select class="form-control input-sm -createtime-th-comp-select" v-model="displayBy">
      <option value="year">Year</option>
      <option value="month">Month</option>
      <option value="week">Week</option>
      <option value="day">Day</option>
    </select>
  </div>
</template>
<script>
export default {
  props: ['xprops'],
  data: () => ({
    displayBy: 'day'
  }),
  watch: {
    displayBy (v) {
      this.xprops.eventbus.$emit('CREATE_TIME_FORMAT', v)
    }
  }
}
</script>
<style>
.-createtime-th-comp {
  display: inline-block;
  margin-bottom: -6px;
}
.-createtime-th-comp-select {
  display: inline-block;
  /*margin-bottom: -10px;*/
  width: 80px;
}
</style>
