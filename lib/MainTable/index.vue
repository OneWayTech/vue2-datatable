<template>
  <!-- complex mode -->
  <div v-if="useComplexMode" class="-complex-table-container" name="MainTable">
    <template v-for="x in ['Header', 'Body', 'Footer']">
      <div v-if="x !== 'Footer' || x === 'Footer' && summary"
        ref="wrappers" :style="styleFor[x]" :name="`Table${x}Wrapper`">
        <div v-if="leftFixedColumns.length" class="-fixed-table -left-fixed"
          :style="x !== 'Header' && styleForLeftFixedTable">
          <table-frame v-bind="propsToLeftFixedTable">
            <component :is="`Table${x}`" v-bind="propsToLeftFixedTable" />
          </table-frame>
        </div>
        <div v-if="rightFixedColumns.length" class="-fixed-table -right-fixed"
          :style="x === 'Header'
            ? { right: fixHeaderAndSetBodyHeight && SCROLLBAR_WIDTH }
            : styleForRightFixedTable">
          <table-frame v-bind="propsToRightFixedTable">
            <component :is="`Table${x}`" v-bind="propsToRightFixedTable" />
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
import syncScroll from './_syncScroll'
import SCROLLBAR_WIDTH from './_SCROLLBAR_WIDTH'
import props from '../props.mixin'

export default {
  mixins: [props],
  components: { TableFrame, TableHeader, TableBody, TableFooter },
  data: () => ({
    scrollLeft: 0,
    SCROLLBAR_WIDTH
  }),
  mounted () {
    // this allows you to fix columns or `fixHeaderAndSetBodyHeight` dynamically
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
      return this.columns.filter(col => typeof col.visible === 'undefined' || '' + col.visible === 'true')
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
      return !!(this.fixHeaderAndSetBodyHeight || this.hasFixedColumns)
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
      const { fixHeaderAndSetBodyHeight } = this
      const width = fixHeaderAndSetBodyHeight && `calc(100% - ${SCROLLBAR_WIDTH})`
      return {
        Header: {
          marginBottom: `-${SCROLLBAR_WIDTH}`,
          overflowX: 'scroll', // always show the scroll bar
          width
        },
        Body: {
          overflowY: fixHeaderAndSetBodyHeight ? 'scroll' : 'hidden',
          height: `${fixHeaderAndSetBodyHeight}px`
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
