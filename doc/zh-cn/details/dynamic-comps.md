# § 动态组件（`thComp / tdComp / nested component`）

## ⊙ `thComp`

> 源码见 [`src/MainTable/TableHeader.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/src/MainTable/TableHeader.vue)

```html
<!-- <th> component (thComp) -->
<component
  v-if="col.thComp"
  :is="comp[col.thComp]"
  :column="col"
  :field="col.field"
  :title="col.title"
  v-bind="$props">
</component>
```

| 参数 | 说明 | 类型 |
|---|---|---|
| column | 列定义 | Object |
| field | 字段名 | String / undefined |
| title | 显示名称 | String / undefined |
| `...$props` | Datatable 所有 `props` | (Spread) |

## ⊙ `tdComp`

> 源码见 [`src/MainTable/TableBody.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/src/MainTable/TableBody.vue)

```html
<!-- <td> component (tdComp) -->
<component
  v-if="col.tdComp"
  :is="comp[col.tdComp]"
  :row="summary"
  :field="col.field"
  :value="summary[col.field]"
  v-bind="$props">
</component>
```

| 参数 | 说明 | 类型 |
|---|---|---|
| row | 当前行 | Object |
| field | 字段名 | String / undefined |
| value | 值 | Any |
| nested | 嵌套组件控制（`row.__nested__` 的引用） | Object / undefined |
| `...$props` | Datatable 所有 `props` | (Spread) |

## ⊙ `nested component`

> 源码见 [`src/MainTable/TableBody.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/src/MainTable/TableBody.vue)

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
|---|---|---|
| row | 当前行 | Object |
| nested | 嵌套组件控制（`row.__nested__` 的引用） | Object / undefined |
| `...$props` | Datatable 所有 `props` | (Spread) |

> 高级例子中的 [`comps/`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps) 涵盖上述所有动态组件的运用，建议参考
