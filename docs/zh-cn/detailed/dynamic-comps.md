# § 动态组件（`thComp / tdComp / nested component`）

> 以下代码均由源码模板 [`lib/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/lib/index.vue) 中截取

## ⊙ `thComp`

```html
<!-- table head component (thComp) -->
<component v-if="column.thComp"
  :is="comp[column.thComp]"
  :column="column"
  :field="column.field"
  :title="column.title"
  v-bind="$props">
</component>
```

| 参数 | 说明 | 类型 |
|-----------|------------------------|--------------------|
| column | 列定义 | Object |
| field | 字段名 | String / undefined |
| title | 显示名称 | String / undefined |
| `...$props` | Datatable 所有 `props` | (Spread) |

## ⊙ `tdComp`

```html
<!-- table body component (tdComp) -->
<component v-if="column.tdComp"
  :is="comp[column.tdComp]"
  :row="item"
  :field="column.field"
  :value="item[column.field]"
  :nested="item.__nested__"
  v-bind="$props">
</component>
```

| 参数 | 说明 | 类型 |
|-----------|------------------------|--------------------|
| row | 当前行 | Object |
| field | 字段名 | String / undefined |
| value | 值 | Any |
| nested | 嵌套组件控制（`row.__nested__` 的引用） | Object / undefined |
| `...$props` | Datatable 所有 `props` | (Spread) |

## ⊙ `nested component`

```html
<!-- nested component -->
<component
  :is="comp[item.__nested__.comp]"
  :row="item"
  :nested="item.__nested__"
  v-bind="$props">
</component>
```

| 参数 | 说明 | 类型 |
|-----------|------------------------|--------------------|
| row | 当前行 | Object |
| nested | 嵌套组件控制（`row.__nested__` 的引用） | Object / undefined |
| `...$props` | Datatable 所有 `props` | (Spread) |

> 高级例子中的 [`comps/`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps) 涵盖上述所有动态组件的运用，建议参考
