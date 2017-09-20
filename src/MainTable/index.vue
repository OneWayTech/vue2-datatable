<template>
  <!-- complex mode -->
  <div v-if="useComplexMode" class="-complex-table-container" name="MainTable">
    <template v-for="x in ['Header', 'Body', 'Footer']">
      <div v-if="x !== 'Footer' || x === 'Footer' && summary"
        ref="wrappers" :style="styleFor[x]" :name="`Table${x}Wrapper`">
        <div v-if="leftFixedColumns.length" class="-fixed-table -left-fixed"
          :style="x !== 'Header' && styleForLeftFixedTable">
          <table-frame v-bind="propsToLeftFixedTable" left-fixed>
            <component :is="`Table${x}`" v-bind="propsToLeftFixedTable" left-fixed />
          </table-frame>
        </div>
        <div v-if="rightFixedColumns.length" class="-fixed-table -right-fixed"
          :style="x === 'Header'
            ? { right: fixHeaderAndSetBodyMaxHeight && SCROLLBAR_WIDTH }
            : styleForRightFixedTable">
          <table-frame v-bind="propsToRightFixedTable" right-fixed>
            <component :is="`Table${x}`" v-bind="propsToRightFixedTable" right-fixed />
          </table-frame>
        </div>
        <table-frame v-bind="propsToNormalTable">
          <component :is="`Table${x}`" v-bind="propsToNormalTable" />
        </table-frame>
      </div>
    </template>
  </div>

  <!-- simple mode -->
  <table-frame v-else v-bind="propsToNormalTable">
    <table-header v-bind="propsToNormalTable" />
    <table-body v-bind="propsToNormalTable" />
    <table-footer v-if="summary" v-bind="propsToNormalTable" />
  </table-frame>
</template>
<script>
import TableFrame from './TableFrame.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import TableFooter from './TableFooter.vue'
import props from '../_mixins/props'
import isColVisible from '../_utils/isColVisible'
import SCROLLBAR_WIDTH from '../_utils/SCROLLBAR_WIDTH'
import syncScroll from '../_utils/syncScroll'

export default {
  mixins: [props],
  components: { TableFrame, TableHeader, TableBody, TableFooter },
  data: () => ({
    scrollLeft: 0,
    SCROLLBAR_WIDTH
  }),
  mounted () {
    // this allows you to fix columns or `fixHeaderAndSetBodyMaxHeight` dynamically
    let unsync
    this.$watch('useComplexMode', v => {
      if (v) {
        unsync = syncScroll(this.$refs.wrappers, offsetLeft => {
          this.scrollLeft = offsetLeft
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
    propsToLeftFixedTable () {
      return { ...this.$props, columns: this.leftFixedColumns }
    },
    propsToRightFixedTable () {
      return { ...this.$props, columns: this.rightFixedColumns }
    },
    propsToNormalTable () {
      return { ...this.$props, columns: this.visibleColumns }
    },
    styleForLeftFixedTable () {
      return {
        position: 'relative',
        float: 'left',
        left: `${this.scrollLeft}px`
      }
    },
    styleForRightFixedTable () {
      return {
        position: 'relative',
        float: 'right',
        right: `-${this.scrollLeft}px`
      }
    },
    styleFor () {
      const { fixHeaderAndSetBodyMaxHeight } = this
      const width = fixHeaderAndSetBodyMaxHeight && `calc(100% - ${SCROLLBAR_WIDTH})`

      return {
        Header: {
          marginBottom: `-${SCROLLBAR_WIDTH}`,
          overflowX: 'scroll', // always show the scroll bar
          width
        },
        Body: {
          overflowY: fixHeaderAndSetBodyMaxHeight ? 'scroll' : 'hidden',
          maxHeight: `${fixHeaderAndSetBodyMaxHeight}px`
        },
        Footer: {
          overflowX: 'hidden',
          width
        }
      }
    }
  }
}
</script>
<style>
.-complex-table-container {
  position: relative;
}
.-complex-table-container table {
  background: #fff;
}
.-fixed-table {
  position: absolute;
  width: 0;
  overflow: visible;
}
.-left-fixed {
  left: 0;
}
.-left-fixed > table {
  box-shadow: 1px 0 5px #ddd;
}
.-right-fixed {
  right: 0;
}
.-right-fixed > table {
  box-shadow: -1px 0 5px #ddd;
  transform: translateX(-100%);
}
</style>
