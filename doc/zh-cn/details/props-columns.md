# `:columns`

下面列出 `columns[i]` 中的可配置项：

| 参数 | 说明 | 类型 | 可选项 | 默认值 | 是否必须 |
|---|---|---|---|---|---|
| title | 显示名称 | String | - | - | 否 |
| label | 在 HeaderSettings 中的显示名称（若无则使用 title） | String | - | - | 否 |
| field | 字段名称 | String | - | - | 否 |
| explain | 说明文字 | String | - | - | 否 |
| sortable | 是否支持排序 | Boolean | true / false | false | 否 |
| visible | 是否显示该列 | Boolean / String（若为字符串类型则禁止设置该列显隐状态） | true / false / 'true' / 'false' | true | 否 |
| fixed | 是否固定该列 | Boolean / String | true / false / 'left' / 'right' | - | 否 |
| group | 归组 | String | - | - | 否 |
| colClass | 作用于整列的类 | String / Object | - | - | 否 |
| colStyle | 作用于整列的内联样式 | Object | - | - | 否 |
| thClass | 作用于 `<th>` 的类名 | String | - | - | 否 |
| thStyle | 作用于 `<th>` 的内联样式 | Object | - | - | 否 |
| thComp | 作用于 `<th>` 的动态组件名 | String | - | - | 否 |
| tdClass | 作用于 `<td>` 的类名 | String | - | - | 否 |
| tdStyle | 作用于 `<td>` 的内联样式 | Object | - | - | 否 |
| tdComp | 作用于 `<td>` 的动态组件名 | String | - | - | 否 |
