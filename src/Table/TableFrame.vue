<template>
  <table class="table table-striped table-hover" style="margin-bottom: 0" :class="tblClass" :style="tblStyle">
    <colgroup>
      <col v-if="shouldRenderSelection" style="width: 30px"></col>
      <col v-for="col in columns" :class="col.colClass" :style="col.colStyle"></col>
    </colgroup>
    <slot />
  </table>
</template>
<script>
import props from '../_mixins/props'
import shouldRenderSelection from '../_mixins/shouldRenderSelection'

export default {
  name: 'TableFrame',
  mixins: [props, shouldRenderSelection]
}
</script>
