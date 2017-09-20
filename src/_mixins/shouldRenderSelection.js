export default {
  props: {
    leftFixed: Boolean,
    rightFixed: Boolean
  },
  computed: {
    shouldRenderSelection () {
      return !this.rightFixed && this.selection
    }
  }
}
