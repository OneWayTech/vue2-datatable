export default {
  props: {
    noSelection: Boolean
  },
  computed: {
    shouldRenderSelection () {
      return !this.noSelection && this.selection
    }
  }
}
