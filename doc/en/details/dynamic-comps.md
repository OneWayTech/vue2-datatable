# § Dynamic Components（`thComp / tdComp / nested component`）

## ⊙ `thComp`

> Source: [`src/Table/TableHeader.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/src/Table/TableHeader.vue)

```html
<!-- <th> component (thComp) -->
<component
  v-if="col.thComp"
  :is="forDynCompIs(col.thComp)"
  :column="col"
  :field="col.field"
  :title="col.title"
  v-bind="$props">
</component>
```

| prop | Desc | Type |
|---|---|---|
| column | Defination of column | Object |
| field | Field name | String / undefined |
| title | Displayed title | String / undefined |
| `...$props` | all the `props` from Datatable | (Spread) |

## ⊙ `tdComp`

> Source: [`src/Table/TableBody.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/src/Table/TableBody.vue)

```html
<!-- <td> component (tdComp) -->
<component
  v-if="col.tdComp"
  :is="forDynCompIs(col.tdComp)"
  :row="summary"
  :field="col.field"
  :value="summary[col.field]"
  v-bind="$props">
</component>
```

| prop | Desc | Type |
|---|---|---|
| row | Current row | Object |
| field | Field name | String / undefined |
| value | Value | Any |
| nested | Controller of the related nested component（reference to `row.__nested__`） | Object / undefined |
| `...$props` | all the `props` from Datatable | (Spread) |

## ⊙ `nested component`

> Source: [`src/Table/TableBody.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/src/Table/TableBody.vue)

```html
<!-- nested component -->
<component
  :is="forDynCompIs(item.__nested__.comp)"
  :row="item"
  :nested="item.__nested__"
  v-bind="$props">
</component>
```

| prop | Desc | Type |
|---|---|---|
| row | Current row | Object |
| nested | Controller of the related nested component（reference to `row.__nested__`） | Object / undefined |
| `...$props` | all the `props` from Datatable | (Spread) |

> [`comps/`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps) of the advanced example covers all the use cases, which is highly recommended to study and imitate.
