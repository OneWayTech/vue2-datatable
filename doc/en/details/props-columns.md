# `:columns`

These are the properties of `columns[i]`:

| Attr | Desc | Type | Optional values | Default value | Required |
|---|---|---|---|---|---|
| title | Displayed title | String | - | - | N |
| label | Label in `HeaderSettings` (`title` will take its place if not set) | String | - | - | N |
| field | Field name of the row | String | - | - | N |
| explain | Explanation of the field (tooltip) | String | - | - | N |
| sortable | Is sortable | Boolean | true / false | false | N |
| visible | Is visible | Boolean / String (if the type is String, the visibility is not allowed to toggle) | true / false / 'true' / 'false' | true | N |
| fixed | Is fixed | Boolean / String | true / false / 'left' / 'right' | - | N |
| group | Group name | String | - | - | N |
| colClass | Classes for the whole column | String / Object | - | - | N |
| colStyle | Inline styles for the whole column | Object | - | - | N |
| thClass | Classes for `<th>` | String | - | - | N |
| thStyle | Inline styles for `<th>` | Object | - | - | N |
| thComp | Name of dynamic component for `<th>` | String | - | - | N |
| tdClass | Classes for `<td>` | String | - | - | N |
| tdStyle | Inline styles for `<td>` | Object | - | - | N |
| tdComp | Name of dynamic component for `<td>` | String | - | - | N |
