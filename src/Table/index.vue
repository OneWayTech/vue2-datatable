<template>
  <!-- complex mode -->
  <div v-if="useComplexMode" name="ComplexTable" class="-complex-table">
    <template v-for="x in ['Header', 'Body', 'Footer']">
      <div v-if="x !== 'Footer' || x === 'Footer' && summary"
        ref="wrappers" :name="`Table${x}Wrapper`" :class="`-table-${x.toLowerCase()}`"
        :style="[
          x !== 'Header' && { marginTop: `-${scrollWidth}px` },
          x === 'Body' && { maxHeight: `${fixHeaderAndSetBodyMaxHeight}px` }
        ]">
        <div :name="`NormalTable${x}`">
          <table-frame v-bind="propsToNormalTable">
            <component :is="`Table${x}`" v-bind="propsToNormalTable" />
          </table-frame>
        </div>
        <div v-if="leftFixedColumns.length"
          :name="`LeftFixedTable${x}`"
          class="-left-fixed -fixed-table"
          :style="{ left: `${offsetLeft}px` }">
          <table-frame v-bind="propsToLeftFixedTable" left-fixed>
            <component :is="`Table${x}`" v-bind="propsToLeftFixedTable" left-fixed />
          </table-frame>
        </div>
        <div v-if="rightFixedColumns.length"
          :name="`RightFixedTable${x}`"
          class="-right-fixed -fixed-table"
          :style="{ right: `-${offsetLeft}px` }">
          <table-frame v-bind="propsToRightFixedTable" right-fixed>
            <component :is="`Table${x}`" v-bind="propsToRightFixedTable" right-fixed />
          </table-frame>
        </div>
      </div>
    </template>
  </div>
  <!-- simple mode -->
  <div v-else name="SimpleTable">
    <table-frame v-bind="propsToNormalTable">
      <table-header v-bind="propsToNormalTable" />
      <table-body v-bind="propsToNormalTable" />
      <table-footer v-if="summary" v-bind="propsToNormalTable" />
    </table-frame>
  </div>
</template>
<script>
import TableFrame from './TableFrame.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import TableFooter from './TableFooter.vue'
import props from '../_mixins/props'
import getScrollWidth from '../_utils/getScrollWidth'
import isColVisible from '../_utils/isColVisible'
import syncScroll from '../_utils/syncScroll'

export default {
  name: 'Tbl',
  mixins: [props],
  components: { TableFrame, TableHeader, TableBody, TableFooter },
  data: () => ({
    offsetLeft: 0,
    scrollWidth: getScrollWidth()
  }),
  mounted () {
    // this allows you to fix columns or `fixHeaderAndSetBodyMaxHeight` dynamically
    let unsync
    this.$watch('useComplexMode', v => {
      if (v) {
        unsync = syncScroll(this.$refs.wrappers, offsetLeft => {
          this.offsetLeft = offsetLeft
        })
      } else {
        unsync && unsync()
      }
    }, { immediate: true })
  },
  computed: {
    visibleColumns () {
      return this.columns.filter(isColVisible)
    },
    leftFixedColumns () {
      return this.visibleColumns.filter(col => col.fixed && col.fixed !== 'right')
    },
    rightFixedColumns () {
      return this.visibleColumns.filter(col => col.fixed === 'right')
    },
    hasFixedColumns () {
      return !!(this.leftFixedColumns.length + this.rightFixedColumns.length)
    },
    useComplexMode () {
      return !!(this.fixHeaderAndSetBodyMaxHeight || this.hasFixedColumns)
    },
    propsToNormalTable () {
      return { ...this.$props, columns: this.visibleColumns }
    },
    propsToLeftFixedTable () {
      return { ...this.$props, columns: this.leftFixedColumns }
    },
    propsToRightFixedTable () {
      return { ...this.$props, columns: this.rightFixedColumns }
    }
  }
}
</script>
<style>
.-complex-table {
  position: relative;
}
.-complex-table table {
  background: #fff;
}
.-table-header, .-table-body, .-table-footer {
  position: relative;
  overflow: scroll;
}
.-fixed-table {
  position: absolute;
  top: 0;
}
.-fixed-table table {
  width: auto;
}
.-left-fixed {
  box-shadow: 1px 0 5px #ddd;
}
.-right-fixed {
  box-shadow: 1px 0 5px #ddd;
}
</style>
