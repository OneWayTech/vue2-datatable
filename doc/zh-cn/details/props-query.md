# `:query`

让我们来看看本 Datatable 是如何初始化 `query` 的（源码见 [`lib/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/lib/index.vue) 中的 `created` 钩子函数）：

```js
created () {
  // init query (make all the properties observable by using `$set`)
  const q = { limit: 10, offset: 0, sort: '', order: '', ...this.query }
  Object.keys(q).forEach(key => { this.$set(this.query, key, q[key]) })
}
```

> 由上可知，`query` 会立即发生变化，故 [`watch`](https://vuejs.org/v2/api/#watch) 时无需加上 `immediate: true`（但需要  `deep: true`）

一般情况下，您只需要传入一个空对象 `{}` 即可。若还有其他查询条件（例如 `keyword`），则以下两种方式二选一：  
  1. 在初始化时就传入 `{ keyword: '' }`（推荐）  
  2. 自行使用 [`Vue.set / $vm.$set`](https://vuejs.org/v2/api/#Vue-set) 设置：`this.$set(this.query, 'keyword', '')`

> 上述两种方式均在高级例子中有所体现，最终目的都是让额外的查询属性变成[响应式](https://vuejs.org/v2/guide/reactivity.html)的  
> （其中第 2 种见 [`examples/src/Advanced/comps/th-Filter.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps/th-Filter.vue) 中的 `methods.search`）  
> 
> 温馨提示：若采用 Ajax - GET 请求，赋值较为复杂时（例如一个网址）最好使用 [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 转义

在此提一个常见的需求：实现刷新后保持查询条件  
最常见的解决方案是**同步查询条件到 URL**  
稍微把基本例子改一下就可以了：

```html
<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
</template>
<script>
import Datatable from '../../../'
import mockData from '../_mockData'

export default {
  components: { Datatable },
  data () {
    return {    
      columns: [
        { title: 'User ID', field: 'uid', sort: true },
        { title: 'Username', field: 'name' },
        { title: 'Age', field: 'age', sort: true },
        { title: 'Email', field: 'email' },
        { title: 'Country', field: 'country' }
      ],
      data: [],
      total: 0,
      query: this.$route.query // 初始化时传入 URL query（在业务中请注意安全性）
    }
  },
  watch: {
    // 同步本地 query 到 URL query
    query: {
      handler (query) {
        this.$router.push({ query })
      },
      deep: true
    },
    // 通过监听 URL query 的变化来重新获取数据
    '$route.query' (query) {
      mockData(query).then(({ rows, total }) => {
        this.data = rows
        this.total = total
      })
    }
  }
}
</script>
```

> 疑惑：什么时候 `watch` 需要加 `deep: true`？  
> 解答：一般来说，需要加的只有：
> 
> 1. 非计算属性的 Object 类型（例如上面的 `$data.query`）
> 2. 需要监听深层嵌套的 Array 类型（例如 `[{ id: 1, name: 'Ken' }, { id: 2, name: 'Berkeley' }]`）
> 
> 上面的 `$route.query` 虽是 Object 类型，但它本身是一个计算属性，因此不需要加 `deep: true`（当然加了也无妨）
