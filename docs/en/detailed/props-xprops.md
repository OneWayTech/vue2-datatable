# `:xprops`

`xprops`, meaning e**x**tra `props`

Our Datatable implements `thComp / tdComp / nested component` by dynamic components.  
But the business requirements are changeful, which may pass many extra `props`.  
As a result, the source template of our Datatable may evolve into:

```html
<component
  ...
  :module1-props="XXX"
  :module2-props="YYY"
  :module3-props="ZZZ"
  :module4-props="XYZ"
  :module5-props="ZYX"
  ...><!-- 100+ extra props -->
</component>
```

For the sake of keeping the source template clean, here comes `xprops` as a container.

***

#### ⊙ Extended

The most common trick in the use of `xprops` is passing an [eventbus](https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication) which only for the current Datatable instance.  
Therefore, no need to care about the namespacing (of event names)

Let's try with the basic example:

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
      eventbus: new Vue() // only for current Datatable instance
    }
  }),
  created () {
    this.xprops.eventbus
      .$on('RELOAD', this.loadData)
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

> Thanks to the trick, [the advanced example]((https://OneWayTech.github.io/vue2-datatable/examples/dist#advanced) implemented **unlimited recursive nested components** with less effort.
