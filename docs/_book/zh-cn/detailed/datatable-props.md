# § Datatable 配置项（`props`）

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必须 |
|----------------|------------------------------------------------|---------|--------------|--------|----------|
| columns | 列定义 | Array | - | - | 是 |
| data | 当页记录 (rows) | Array | - | - | 是 |
| total | 记录总数 | Number | - | - | 是 |
| query | 查询对象 | Object | - | - | 是 |
| selection | 多项选择的容器 | Array | - | - | 否 |
| summary | 汇总行 (summary row) | Object | - | - | 否 |
| HeaderSettings | 是否显示表头设置组件 | Boolean | true / false | true | 否 |
| Pagination | 是否显示分页相关组件 | Boolean | true / false | true | 否 |
| xprops | 额外传给动态组件的承载容器 | Object | - | - | 否 |
| support-backup | 是否支持保存表头设置 | Boolean | true / false | false | 否 |
| support-nested | 是否支持内嵌组件 (nested component) | Boolean | true / false | false | 否 |
| table-bordered | 是否添加 `.table-bordered` 类到 `<table>` 元素 | Boolean | true / false | false | 否 |

> 源码见 [`lib/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/lib/index.vue) 中的 `props`  
> 高级例子 [`examples/src/Advanced/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/index.vue) 几乎涵盖上述所有配置，建议参考

往下着重讲解：

* `columns`
* `data`
* `query`
* `selection`
* `summary`
* `xprops`
* 动态组件（`thComp / tdComp / nested component`）
