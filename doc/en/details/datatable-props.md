# § `props` of Datatable

> Source: [`src/_mixins/props.js`](https://github.com/OneWayTech/vue2-datatable/blob/master/src/_mixins/props.js)

| prop | Desc | Type | Optional values | Default value | Required |
|---|---|---|---|---|---|
| columns | Defination of columns | Array | - | - | Y |
| data | Data of the current page (rows) | Array | - | - | Y |
| total | Total number of the records | Number | - | - | Y |
| query | Query object | Object | - | - | Y |
| selection | Container for multi-select | Array | - | - | N |
| summary | Summary row | Object | - | - | N |
| xprops | Carrier for extra props passed to dynamic components | Object | - | - | N |
| HeaderSettings | Whether to render `HeaderSettings` | Boolean | true / false | true | N |
| Pagination | Whether to render pagination relevant | Boolean | true / false | true | N |
| pageSizeOptions | options for `PageSizeSelect` | Array | - | [10, 20, 40, 80, 100] | N |
| tbl-class | Classes for `<table>` | String / Object / Array | - | - | N |
| tbl-style | Inline styles for `<table>` | String / Object / Array | - | - | N |
| fixHeaderAndSetBodyMaxHeight | (Just as its name implies) | Number | - | - | N |
| support-backup | Whether to enable backup of `HeaderSettings` | Boolean | true / false | false | N |
| support-nested | Whether to enable `nested components` feature (`accordion` mode is available) | Boolean / String | true / false / 'accordion' | false | N |

> The advanced example (source: [`examples/src/Advanced/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/index.vue), demo: [examples#advanced](https://OneWayTech.github.io/vue2-datatable/examples/dist#advanced))  
> almost covers all the usages, which is highly recommended to study and imitate.

In the following sections, these props would be elaborated:  

* `columns`
* `data`
* `query`
* `selection`
* `summary`
* `xprops`
* Dynamic components（`thComp / tdComp / nested component`）
