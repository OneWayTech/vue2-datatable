<template>
  <div class="-th-createtime-comp">
    Create time by &nbsp;
    <select class="form-control input-sm" v-model="displayBy">
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
.-th-createtime-comp {
  display: inline-block;
  margin-bottom: -6px;
}
.-th-createtime-comp > select {
  display: inline-block;
  width: 80px;
  height: 26px;
}
</style>
