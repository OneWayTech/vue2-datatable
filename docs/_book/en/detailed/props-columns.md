# `:columns`

Let's compare the `columns` definitions of the basic and advanced examples:

```js
// examples#basic - shorthand version
columns: [
  { title: 'User ID', field: 'uid', sort: true },
  { title: 'Username', field: 'name' },
  { title: 'Age', field: 'age', sort: true },
  { title: 'Email', field: 'email' },
  { title: 'Country', field: 'country' }
]

// examples#advanced - standard version
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

> According to the source (`computed.columns$` in [`lib/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/lib/index.vue)), shorthand version would always be converted to standard version

These are attributes of `columns[i]`:

| Attr | Desc | Type | Optional values | Default value | Required |
|---------|--------------------------|----------------------------------------------------------|---------------------------------|--------|----------|
| title | Displayed title | String | - | - | N |
| label | label in HeaderSettings (title will take its place if not set) | String | - | - | N |
| field | Field name of row | String | - | - | N |
| explain | Explaination of the field | String | - | - | N |
| sort | Is sortable | Boolean | true / false | false | N |
| weight | Ranking weight | Number | - | 0 | N |
| visible | Is visible | Boolean / String (if the type is String, the visibility is not allowed to toggle) | true / false / 'true' / 'false' | true | N |
| colClass | classnames for `<th> / <td>` | String | - | - | N |
| colStyle | inline styles for `<th> / <td>` | Object | - | - | N |
| thClass | classnames for `<th>` | String | - | - | N |
| thStyle | inline styles for `<th>` | Object | - | - | N |
| thComp | name of dynamic component for `<th>` | String | - | - | N |
| tdClass | classnames for `<td>` | String | - | - | N |
| tdStyle | inline styles for `<td>` | Object | - | - | N |
| tdComp | name of dynamic component for `<td>` | String | - | - | N |
