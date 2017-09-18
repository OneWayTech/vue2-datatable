<template>
  <tfoot>
    <tr class="-summary-row">
      <td v-if="shouldRenderSelection"></td>
      <template v-for="(col, idx) in columns">
        <!-- display the available fields only -->
        <td v-if="summary[col.field]" :class="col.tdClass" :style="col.tdStyle">
          <!-- <td> component (tdComp) -->
          <component
            v-if="col.tdComp"
            :is="comp[col.tdComp]"
            :row="summary"
            :field="col.field"
            :value="summary[col.field]"
            v-bind="$props">
          </component>
          <template v-else>
            {{ summary[col.field] }}
          </template>
        </td>
        <td v-else></td>
      </template>
    </tr>
  </tfoot>
</template>
<script>
import props from '../_mixins/props'
import shouldRenderSelection from '../_mixins/shouldRenderSelection'

export default {
  mixins: [props, shouldRenderSelection]
}
</script>
<style>
.-summary-row {
  font-weight: bold;
  background-color: #eee !important;
}
</style>
