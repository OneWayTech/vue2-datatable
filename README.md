# Vue2 Datatable
> 做 Vue.js 下最好的 Datatable 组件

## § 前言
任何开源的 Datatable 都未必能满足所有的业务需求（否则也不会有这个项目了）  
本 README 致力于让您在理解组件设计以及源码的基础上，可自行定制出适合您业务需求的 Datatable 

## § 快速体验
我们以 [`example/Basic/index.vue`](example/Basic/index.vue) 为例，效果见 [demo](https://kenberkeley.github.io/vue2-datatable/example-dist)

```html
<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
    <!-- 上面的写法比下面的要优雅，来源见 https://github.com/vuejs/vue/issues/4962
      <datatable
        :columns="columns"
        :data="data"
        :total="total"
        :query="query">
      </datatable>
    -->
  </div>
</template>
<script>
import Datatable from 'vue2-datatable'
import mockData from '../_mockData'

export default {
  components: { Datatable },
  data: () => ({
    columns: [
      { title: 'User ID', field: 'uid', sort: true },
      { title: 'Username', field: 'name' },
      { title: 'Age', field: 'age', sort: true },
      { title: 'Email', field: 'email' },
      { title: 'Country', field: 'country' }
    ],
    data: [],
    total: 0,
    query: {}
  }),
  watch: {
    query: {
      handler (query) {
        mockData(query).then(({ rows, total }) => {
          this.data = rows
          this.total = total
        })
      },
      deep: true
    }
  }
}
</script>
```

## § 依赖
* BootStrap 3.x + Font Awesome 4.x（全局引入）
* [lodash / orderBy](https://lodash.com/docs/4.17.4#orderBy)
* [replace-with](https://github.com/kenberkeley/replace-with)

注：BootStrap 以及 Font Awesome 的可替换性极强，您完全可以使用其他库替代（一般就是改一下类名即可）

## § 详解

### ⊙ 整体构造
本 Datatable 的源码目录树 [`lib/`](lib/) 如下：

```
lib/
 ├─ HeaderSettings/     # 表头设置
 │   ├─ ColumnGroup.vue   # 表头设置分栏组件
 │   └─ index.vue         # 表头设置主体
 ├─ HeadSort.vue        # 排序
 ├─ LimitSelect.vue     # 每页显示记录数下拉选择框
 ├─ MultiSelect.vue     # 行首多选框
 ├─ Pagination.vue      # 分页
 └─ index.vue           # Datatable 主体
```

以 [`example/Advanced/index.vue`](example/Advanced/index.vue) 的 [demo](https://kenberkeley.github.io/vue2-datatable/example-dist/#advanced) 为例，标出对应的组件如下图所示：

![Datatable Structure](structure.png)

### ⊙ 配置项
> 【 Vue.js 小技巧 】  
> 若 `HelloWorld` 组件中定义 `props: { hi: Boolean }`  
> 则 `<hello-world hi />` 等同于 `<hello-world :hi="true" />`  
> 显然地，前者在写法上更加优雅

[`lib/index.vue`](lib/index.vue) 中的 `props` 如下：

```js
props: {
  columns: { type: Array, required: true },         // 列定义
  data: { type: Array, required: true },            // 当页纪录 (rows)
  total: { type: Number, required: true },          // 记录总数
  query: { type: Object, required: true },          // 查询对象
  selection: Array,                                 // 多项选择的容器
  summary: Object,                                  // 汇总行数据 (summary row)
  HeaderSettings: { type: Boolean, default: true }, // 是否显示表头设置组件
  Pagination: { type: Boolean, default: true },     // 是否显示分页相关组件
  xprops: Object,                                   // 额外传给动态组件的东东
  supportBackup: Boolean,                           // 是否支持使用 LocalStorage 保存表头设置
  supportNested: Boolean,                           // 是否支持内嵌组件 (nested component)
  tableBordered: Boolean                            // 是否添加 .table-bordered 类到 <table> 元素
}
```

下面仅讲解 `columns` / `data` / `query` / `selection` / `xprops` 以及三种动态组件（`thComp` / `tdComp` / `nested component`）

***

#### `:columns`
我们来对比一下 [`example/`](example/) 中的 [`Basic`](example/Basic/index.vue) 与 [`Advanced`](example/Advanced/index.vue) 的 `columns` 定义：

```js
// example/Basic - 简单写法
columns: [
  { title: 'User ID', field: 'uid', sort: true },
  { title: 'Username', field: 'name' },
  { title: 'Age', field: 'age', sort: true },
  { title: 'Email', field: 'email' },
  { title: 'Country', field: 'country' }
]

// example/Advanced - 标准写法
columns: [{
  groupName: 'Normal',
  columns: [
    { title: 'Email', field: 'email', visible: false, thComp: 'FilterTh', tdComp: 'Email' },
    { title: 'Username', field: 'name', thComp: 'FilterTh' },
    { title: 'Country', field: 'country', thComp: 'FilterTh' },
    { title: 'IP', field: 'ip', visible: false, tdComp: 'IP' }
  ]
}, {
  groupName: 'Sortable',
  columns: [
    { title: 'User ID', field: 'uid', sort: true, visible: 'true', weight: 1 },
    { title: 'Age', field: 'age', sort: true },
    { title: 'Create time', field: 'createTime', sort: true,
      thClass: 'w-240', tdClass: 'w-240', thComp: 'CreatetimeTh', tdComp: 'CreatetimeTd' }
  ]
}, {
  groupName: 'Extra (radio)',
  type: 'radio',
  columns: [
    { title: 'Operation', tdComp: 'Opt' },
    // don't forget to set the columns below `visible: false`, since the `type` is `radio`
    { title: 'Color', field: 'color', explain: 'Favorite color', visible: false, tdComp: 'Color' },
    { title: 'Language', field: 'lang', visible: false, thComp: 'FilterTh' },
    { title: 'PL', field: 'programLang', explain: 'Programming Language', visible: false, thComp: 'FilterTh' }
  ]
}]
```

实际上 `Basic` 的这种简写最终都会被转为 `Advanced` 的标准形式（见源码 [`lib/index.vue`](lib/index.vue) 中的 `computed.columns$`）

下面列出 `columns[i]` 中的可配置项：

| 参数 | 说明 | 类型 | 可选项 | 默认值 | 是否必须 |
|---------|--------------------------------------------------|----------------|---------------------------|--------|----------|
| title | 显示名称 | String | - | - | 否 |
| field | 字段名称 | String | - | - | 否 |
| explain | 说明文字 | String | - | - | 否 |
| sort | 是否支持排序 | Boolean | - | false | 否 |
| weight | 显示排名权重 | Number | - | 0 | 否 |
| visible | 是否显示（若为字符串类型则禁止设置该列显隐状态） | Boolean / String | true / false / 'true' / 'false' | true | 否 |
| thClass | 用于 `<th>` 的类名 | String | - | - | 否 |
| thStyle | 用于 `<th>` 的内联样式 | String | - | - | 否 |
| thComp | 用于 `<th>` 的动态组件名 | String | - | - | 否 |
| tdClass | 用于 `<td>` 的类名 | String | - | - | 否 |
| tdStyle | 用于 `<td>` 的内联样式 | String | - | - | 否 |
| tdComp | 用于 `<td>` 的动态组件名 | String | - | - | 否 |

>【 JS 小技巧 】  
>
```js
cols.map(col => {
  if (!col.weight) col.weight = 0
  return col
})
// 利用逗号运算符，可以把上面的代码缩写为一行
cols.map(col => ((col.weight = col.weight || 0), col))
```
***

#### `:data`
实际上该项应该叫 `rows` 才合理，但主流的 Datatable 都是这样称呼，我也不能免俗  
本身该项是没啥好讲的，但本 Datatable 支持**无限递归内嵌组件**，靠的就是在这里做文章  
在此把源码 `lib/index.vue` 中的 `computed.data$` 直接搬出来：

```js
data$ () {
  const { data } = this
  if (this.supportNested) {
    // support nested components with extra magic
    data.forEach(item => {
      if (!item.__nested__) {
        this.$set(item, '__nested__', {
          comp: '', // name of nested component
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
        Object.defineProperty(item, '__nested__', { enumerable: false })
      }
    })
  }
  return data
}
```

由源码可知，我们对 `data (rows)` 内的各个元素 `item (row)` 设置了一个不可遍历属性 `__nested__`，包含以下三个属性：

| 参数 | 说明 | 类型 | 可选项 | 默认值 |
|---------|--------------|----------|-------------------------------------------------------------|--------|
| comp | 内嵌组件名 | String | - | '' |
| visible | 是否显示 | Boolean | true / false | false |
| $toggle | 便捷操作函数 | Function | $toggle(comp) /  $toggle(visible) /  $toggle(comp, visible) | - |

将 `__nested__` 作为 `props.nested` 传入到对应的 `tdComp` 与 `nested component` 中  
由此，在对应的动态组件内部即可通过 `nested.$toggle` 实现对 `nested component` 的控制  
（当然，您要直接操作 `row.__nested__.$toggle` 也是没问题的，都是同一个东西）

***

#### `:query`
让我们来看看 Datatable 是如何初始化 `query` 的（见源码 [`lib/index.vue`](lib/index.vue) 中的 `created` 钩子函数）：

```js
created () { // init query
  const { query } = this
  const q = { limit: 10, offset: 0, sort: '', order: '', ...query }
  Object.keys(q).forEach(key => this.$set(query, key, q[key]))
}
```

一般情况下，您只需要传入一个空对象 `{}` 即可。若还有其他查询条件（例如 `search`），则以下两种方式二选一：  
  1. 在初始化时就传入 `{ search: '' }`（推荐）  
  2. 自行使用 [`Vue.set / $vm.$set`](https://vuejs.org/v2/api/#Vue-set) 设置：`this.$set(this.query, 'search', '')`

上述两种方式均在 `example/Advanced` 中有所体现，最终目的都是让额外的查询属性变成[响应式](https://vuejs.org/v2/guide/reactivity.html)的  
（其中第 2 种见 [`example/Advanced/comps/th-Filter.vue`](example/Advanced/comps/th-Filter.vue) 中的 `methods.search`）

在此提一个常见的需求：实现刷新后保持查询条件  
最常见的解决方案是**同步查询条件到 URL**。拿 `example/Basic` 来说：

```html
<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
</template>
<script>
import Datatable from 'vue2-datatable'
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
        this.$router.push({ path: this.$route.path, query })
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

***

#### `:selection`
一般情况下，您只需要传入一个空数组 `[]` 即可  
若有行被勾选，则对应的 `row` 将会进入到 `selection` 中  
假如您的产品经理要求默认就是全部勾选，也是没问题的。就以 `example/Advanced` 为例：

```js
methods: {
  handleQueryChange () {
    mockData(this.query).then(({ rows, total, summary }) => {
      this.data = rows
      this.total = total
      this.summary = summary
        
      // 就是这么简单！
      this.$nextTick(() => this.selection = [...this.data])
    })
  }
}
```

***

#### `:xprops`
由于 `thComp / tdComp / nested component` 都是通过动态组件实现  
而业务需求又是不固定的，很可能需要传入很多额外的 props  
那么，源码 [`lib/index.vue`](lib/index.vue) 中的模板，很有可能会演变成这样子：

```html
<component
  ...
  :XXX="XXX"
  :YYY="YYY"
  :ZZZ="ZZZ"
  :XYZ="XYZ"
  :ZYX="ZYX"
  ...><!-- 100+ extra props -->
</component>
```

再三斟酌下，我引入了 `xprops`，用于承载这些额外的 props，以避免污染源码

最常见的用处是，传入一个仅限于当前 Datatable 内部使用的 [eventbus](https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication)，这样的话就不需要区分命名空间了  
（可以实现无限递归嵌套的 `example/Advanced` 就是通过这种方式来避免不必要的麻烦）

## 深入

## 设计理念
full ES5
关键：扁平的动态组件（全局化 局部化）
反范式：允许子组件修改状态，毋须引入鸡肋的状态管理
xprops 传递其余属性
源码技巧 缩短 .map
同步 URL 技巧
