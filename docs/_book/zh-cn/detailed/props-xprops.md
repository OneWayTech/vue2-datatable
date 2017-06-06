# `:xprops`

顾名思义，`xprops` 用于传递额外的 `props`

由于 `thComp / tdComp / nested component` 都是通过动态组件实现  
而业务需求又是不固定的，很可能需要传入很多额外的 `props`  
那么，源码 [`lib/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/lib/index.vue) 中的模板，很有可能会演变成这样子：

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
      eventbus: new Vue()
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

> 可以实现**无限递归嵌套**的高级例子，就是通过这样的方式来避免命名空间的麻烦
