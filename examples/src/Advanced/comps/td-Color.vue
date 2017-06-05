<template>
  <div class="-td-color-comp" :style="{ 'background-color': value }">
    {{ value }}
  </div>
</template>
<script>
export default {
  props: ['value']
}
</script>
<style>
.-td-color-comp {
  width: 50px;
  height: 20px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  line-height: 20px;
}
</style>
