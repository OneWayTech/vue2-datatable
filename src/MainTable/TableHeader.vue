<template>
  <thead>
    <transition-group name="fade" tag="tr">
      <th v-if="shouldRenderSelection" key="--th-multi">
        <multi-select :selection="selection" :rows="data" />
      </th>
      <th v-for="(col, idx) in columns"
        :key="col.title || col.field || idx"
        :class="col.thClass" :style="col.thStyle">
        <!-- <th> component (thComp) -->
        <component
          v-if="col.thComp"
          :is="comp[col.thComp]"
          :column="col"
          :field="col.field"
          :title="col.title"
          v-bind="$props">
        </component>
        <template v-else>
          {{ col.title }}
        </template>

        <i v-if="col.explain" class="fa fa-info-circle" style="cursor: help" :title="col.explain"></i>
        <head-sort v-if="col.sortable" :field="col.field" :query="query" />
      </th>
    </transition-group>
  </thead>
</template>
<script>
import HeadSort from './HeadSort.vue'
import MultiSelect from './MultiSelect.vue'
import props from '../props.mixin'
import shouldRenderSelection from './shouldRenderSelection.mixin'

export default {
  components: { HeadSort, MultiSelect },
  mixins: [props, shouldRenderSelection]
}
</script>
