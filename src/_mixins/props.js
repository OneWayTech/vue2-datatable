let comp // cache the source of dynamic components (thComp / tdComp / nested components)

export default {
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true }, // rows
    total: { type: Number, required: true },
    query: { type: Object, required: true },
    selection: Array, // container for multi-select
    summary: Object, // an extra summary row
    xprops: Object, // extra custom props carrier passed to dynamic components
    HeaderSettings: { type: Boolean, default: true }, // whether to render `HeaderSettings`
    Pagination: { type: Boolean, default: true }, // whether to render `LimitSelect` and `Pagination`
    tblClass: [String, Object, Array], // classes for <table>
    tblStyle: [String, Object, Array], // inline styles for <table>
    fixHeaderAndSetBodyHeight: Number, // a fancy prop which combines two props into one
    supportNested: [Boolean, String], // support nested components feature (String is only for 'accordion')
    supportBackup: Boolean // support backup for `HeaderSettings`
  },
  data () {
    if (!comp) {
      // only src/index.vue could reach here
      comp = this.$parent.$options.components
    }
    return {
      comp // share the same source of dynamic components
    }
  }
}
