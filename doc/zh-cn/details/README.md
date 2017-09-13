# § 详解

在讲解配置项前，我们先来了解一下本 Datatable 的构造

源码目录树 [`lib/`](https://github.com/OneWayTech/vue2-datatable/tree/master/lib) 如下所示：

```
lib/
 ├─ HeaderSettings/          # 表头设置
 │   ├─ ColumnGroup.vue        # 表头设置分栏组件
 │   └─ index.vue              # 表头设置主体
 ├── MainTable               # 表格
 │   ├─ _SCROLLBAR_WIDTH.js    #（获取当前浏览器滚动条宽度）
 │   ├─ _syncScroll.js         #（同步滚动位置）
 │   ├─ HeadSort.vue           # 表头排序
 │   ├─ index.vue              # 表格主体
 │   ├─ MultiSelect.vue        # 行首多选框
 │   ├─ TableBody.vue          # 表身
 │   ├─ TableFooter.vue        # 表脚
 │   ├─ TableFrame.vue         # 表框
 │   └─ TableHeader.vue        # 表头
 ├─ index.vue           # Datatable 主体
 ├─ LimitSelect.vue     # 每页显示限制
 ├─ Pagination.vue      # 分页
 └─ props.mixin.js      # 通用 mixin
```

以高级例子 [`examples/src/Advanced/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/index.vue) ([demo - examples#advanced](https://OneWayTech.github.io/vue2-datatable/examples/dist#advanced)) 为例，标注出对应的基本构成组件如下图所示：

<a href="_images/structure.png" target="_blank" title="点击放大">
  <img src="_images/structure.png" alt="Structure">
</a>
