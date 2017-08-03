# `:columns`

我们来对比一下 [`examples/src`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src) 中 基本例子 与 高级列子 的 `columns` 定义：

```js
// examples#basic - 简单写法
columns: [
  { title: 'User ID', field: 'uid', sort: true },
  { title: 'Username', field: 'name' },
  { title: 'Age', field: 'age', sort: true },
  { title: 'Email', field: 'email' },
  { title: 'Country', field: 'country' }
]

// examples#advanced - 标准写法
columns: [{
  groupName: 'Normal',
  columns: [
    { title: 'Email', field: 'email', visible: false, thComp: 'FilterTh', tdComp: 'Email' },
    { title: 'Username', field: 'name', thComp: 'FilterTh', tdStyle: { fontStyle: 'italic' } },
    { title: 'Country', field: 'country', thComp: 'FilterTh', thStyle: { fontWeight: 'normal' } },
    { title: 'IP', field: 'ip', visible: false, tdComp: 'IP' }
  ]
}, {
  groupName: 'Sortable',
  columns: [
    { title: 'UID', field: 'uid', label: 'User ID', sort: true, visible: 'true', weight: 1 },
    { title: 'Age', field: 'age', sort: true, thClass: 'text-info', tdClass: 'text-success' },
    { title: 'Create time', field: 'createTime', sort: true, colClass: 'w-240', thComp: 'CreatetimeTh', tdComp: 'CreatetimeTd' }
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

> 实际上 `#basic` 的这种简写最终都会被转为 `#advanced` 的标准形式（源码见 [`lib/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/lib/index.vue) 中的 `computed.columns$`）

下面列出 `columns[i]` 中的可配置项：

| 参数 | 说明 | 类型 | 可选项 | 默认值 | 是否必须 |
|---------|--------------------------|----------------------------------------------------------|---------------------------------|--------|----------|
| title | 显示名称 | String | - | - | 否 |
| label | 在 HeaderSettings 中的显示名称（若无则使用 title） | String | - | - | 否 |
| field | 字段名称 | String | - | - | 否 |
| explain | 说明文字 | String | - | - | 否 |
| sort | 是否支持排序 | Boolean | true / false | false | 否 |
| weight | 排名权重 | Number | - | 0 | 否 |
| visible | 是否显示该列 | Boolean / String（若为字符串类型则禁止设置该列显隐状态） | true / false / 'true' / 'false' | true | 否 |
| colClass | 同时用于 `<th> / <td>` 的类名 | String / Object | - | - | 否 |
| colStyle | 同时用于 `<th> / <td>` 的内联样式 | Object | - | - | 否 |
| thClass | 用于 `<th>` 的类名 | String | - | - | 否 |
| thStyle | 用于 `<th>` 的内联样式 | Object | - | - | 否 |
| thComp | 用于 `<th>` 的动态组件名 | String | - | - | 否 |
| tdClass | 用于 `<td>` 的类名 | String | - | - | 否 |
| tdStyle | 用于 `<td>` 的内联样式 | Object | - | - | 否 |
| tdComp | 用于 `<td>` 的动态组件名 | String | - | - | 否 |
