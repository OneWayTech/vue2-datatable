# `:xprops`

顾名思义，`xprops` 用于额外 `props` 的传递

由于 `thComp / tdComp / nested component` 都是通过动态组件实现  
而业务需求又是不固定的，很可能需要传入很多额外的 `props`  
那么，源码模板很有可能会演变成这样子：

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

再三斟酌下，本 Datatable 引入了 `xprops`，用于承载这些额外的 `props`，以避免污染源码模板

***

最常见的妙用是，传入一个仅限于当前 Datatable 内部使用的 [eventbus](https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication)，这样的话就不需要区分命名空间了  
我们拿基本例子改一下：

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
      eventbus: new Vue() // 私有事件总线
    }
  }),
  created () {
    this.xprops.eventbus
      .$on('RELOAD', this.loadData) // 无需命名空间前缀
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
