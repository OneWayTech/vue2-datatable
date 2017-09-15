<template>
  <div name="Datatable">
    <div v-if="$slots.default || HeaderSettings" class="clearfix" style="margin-bottom: 10px">
      <header-settings v-if="HeaderSettings" class="pull-right"
        :columns="columns" :support-backup="supportBackup">
      </header-settings>
      <slot />
    </div>

    <main-table v-bind="$props" />
    
    <div v-if="Pagination" class="row" style="margin-top: 10px">
      <div class="col-sm-6" style="white-space: nowrap">
        <strong>{{ $i18nForDatatable('Total') }} {{ total }} {{ $i18nForDatatable(',') }}</strong>
        <limit-select :query="query" />
      </div>
      <div class="col-sm-6">
        <pagination class="pull-right" :total="total" :query="query" />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderSettings from './HeaderSettings/index.vue'
import MainTable from './MainTable/index.vue'
import LimitSelect from './LimitSelect.vue'
import Pagination from './Pagination.vue'
import props from './props.mixin'

export default {
  name: 'Datatable',
  mixins: [props],
  components: { HeaderSettings, MainTable, LimitSelect, Pagination },
  created () {
    // init query (make all the properties observable by using `$set`)
    const q = { limit: 10, offset: 0, sort: '', order: '', ...this.query }
    Object.keys(q).forEach(key => { this.$set(this.query, key, q[key]) })
  },
  watch: {
    data: {
      handler (data) {
        const { supportNested } = this
        // support nested components feature with extra magic
        if (supportNested) {
          data.forEach(item => {
            if (!item.__nested__) {
              this.$set(item, '__nested__', {
                comp: '', // name of the current nested component
                visible: false,
                $toggle (comp, visible) {
                  switch (arguments.length) {
                    case 0:
                      this.visible = !this.visible
                      break
                    case 1:
                      switch (typeof comp) {
                        case 'boolean':
                          this.visible = comp
                          break
                        case 'string':
                          this.comp = comp
                          this.visible = !this.visible
                          break
                      }
                      break
                    case 2:
                      this.comp = comp
                      this.visible = visible
                      break
                  }
                }
              })
              if (supportNested === 'accordion') {
                this.$watch(
                  () => item.__nested__,
                  nested => {
                    // only one nested component can be expanded at the same time
                    if (data.filter(({ __nested__ }) => __nested__.visible).length < 2) return

                    data.forEach(({ __nested__ }) => {
                      if (__nested__.visible && __nested__ !== nested) {
                        __nested__.visible = false
                      }
                    })
                  },
                  { deep: true }
                )
              }
              Object.defineProperty(item, '__nested__', { enumerable: false })
            }
          })
        }
      },
      immediate: true
    }
  }
}
</script>
<style>
/* transition effect: fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
