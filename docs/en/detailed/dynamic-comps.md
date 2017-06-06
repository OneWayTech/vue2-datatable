# § Dynamic Components（`thComp / tdComp / nested component`）

> The following code is excerpted from the source [`lib/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/lib/index.vue)

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

| prop | Desc | Type |
|-----------|------------------------|--------------------|
| column | Defination of column | Object |
| field | Field name | String / undefined |
| title | Displayed title | String / undefined |
| `...$props` | all the `props` from Datatable | (Spread) |

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

| prop | Desc | Type |
|-----------|------------------------|--------------------|
| row | Current row | Object |
| field | Field name | String / undefined |
| value | Value | Any |
| nested | Controller of the related nested component（reference to `row.__nested__`） | Object / undefined |
| `...$props` | all the `props` from Datatable | (Spread) |

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

| prop | Desc | Type |
|-----------|------------------------|--------------------|
| row | Current row | Object |
| nested | Controller of the related nested component（reference to `row.__nested__`） | Object / undefined |
| `...$props` | all the `props` from Datatable | (Spread) |

> [`comps/`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps) of the advanced example covers all the use cases, which is highly recommended to study and imitate.
