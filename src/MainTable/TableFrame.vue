<template>
  <table class="table table-striped table-hover" style="margin-bottom: 0" :class="tblClass" :style="tblStyle">
    <colgroup>
      <col v-for="col in columns" :class="col.colClass" :style="col.colStyle"></col>
    </colgroup>
    <slot />
  </table>
</template>
<script>
import props from '../props.mixin'

export default {
  mixins: [props]
}
</script>
