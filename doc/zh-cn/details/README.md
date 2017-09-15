# § 详解

在讲解配置项前，我们先来了解一下本 Datatable 的构造

源码目录树 [`src/`](https://github.com/OneWayTech/vue2-datatable/tree/master/src) 如下所示：

```
src/
 ├─ HeaderSettings/
 │   ├─ ColumnGroup.vue
 │   └─ index.vue
 ├─ MainTable
 │   ├─ HeadSort.vue
 │   ├─ index.vue
 │   ├─ MultiSelect.vue
 │   ├─ SCROLLBAR_WIDTH.js
 │   ├─ shouldRenderSelection.mixin.js
 │   ├─ syncScroll.js
 │   ├─ TableBody.vue
 │   ├─ TableFooter.vue
 │   ├─ TableFrame.vue
 │   └─ TableHeader.vue
 ├─ Datatable.vue
 ├─ index.js
 ├─ LimitSelect.vue
 ├─ Pagination.vue
 └─ props.mixin.js
```

以高级例子 [`examples/src/Advanced/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/index.vue) ([demo - examples#advanced](https://OneWayTech.github.io/vue2-datatable/examples/dist#advanced)) 为例，标注出对应的基本构成组件如下图所示：

<a href="_images/structure.png" target="_blank" title="点击放大">
  <img src="_images/structure.png" alt="Structure">
</a>
