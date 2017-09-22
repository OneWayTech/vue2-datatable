# § Details

It would be better for you to understand the structure of this Datatable before the details.

The source tree [`src/`](https://github.com/OneWayTech/vue2-datatable/tree/master/src) is shown as below:

```
 ├─ _mixins/
 ├─ _utils/
 ├─ HeaderSettings/
 │   ├─ ColumnGroup.vue
 │   └─ index.vue
 ├─ Table/
 │   ├─ HeadSort.vue
 │   ├─ index.vue
 │   ├─ MultiSelect.vue
 │   ├─ TableBody.vue
 │   ├─ TableFooter.vue
 │   ├─ TableFrame.vue
 │   └─ TableHeader.vue
 ├─ index.vue
 ├─ main.js
 ├─ PageSizeSelect.vue
 └─ Pagination.vue
```

Here is the illustration for the tree above, which is captured from the advanced example (source: [`examples/src/Advanced/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/index.vue), demo: [examples#advanced](https://OneWayTech.github.io/vue2-datatable/examples/dist#advanced)):

<a href="_images/structure.png" target="_blank" title="Click to enlarge">
  <img src="_images/structure.png" alt="Structure">
</a>
