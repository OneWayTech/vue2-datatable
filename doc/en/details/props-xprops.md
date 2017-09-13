# `:xprops`

`xprops`, means e**x**tra props.

This Datatable implements `thComp / tdComp / nested component` features with [dynamic components](https://vuejs.org/v2/guide/components.html#Dynamic-Components).  
However, various scenarios would be accompanied with various extra props.  
As a result, the source template of our Datatable may evolve into:

```html
<component
  ...
  :scenario1-props="XXX"
  :scenario2-props="YYY"
  :scenario3-props="ZZZ"
  :scenario4-props="XYZ"
  :scenario5-props="ZYX"
  ...><!-- 100+ extra props -->
</component>
```

For the sake of keeping the source template clean, `xprops` is introduced as the carrier.

***

#### ⊙ Extention

The most practical usage for `xprops` is carrying an exclusive [eventbus](https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication) which only for the current Datatable instance.  
Henceforth, no more namespace problems.

Try with the basic example:

```html
<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
<script>
import Vue from 'vue'
import Datatable from '../../../'
import mockData from '../_mockData'

export default {
  components: { Datatable },
  data: () => ({
    columns: [/* omitted */],
    data: [],
    total: 0,
    query: {},
    xprops: {
      eventbus: new Vue() // only for the current Datatable instance
    }
  }),
  created () {
    this.xprops.eventbus
      .$on('RELOAD', this.loadData) // namespace prefix is free!
      .$on('<EVENT_NAME>', () => {/* do something */})
  },
  watch: {
    query: {
      handler () {
        this.loadData()
      },
      deep: true
    }
  },
  methods: {
    loadData () {
      mockData(this.query).then(({ rows, total }) => {
        this.data = rows
        this.total = total
      })      
    }
  }
}
</script>
```

> Thanks to this feature, [the advanced example](https://OneWayTech.github.io/vue2-datatable/examples/dist#advanced) implemented ***unlimited recursive `nested components`*** with less effort.
