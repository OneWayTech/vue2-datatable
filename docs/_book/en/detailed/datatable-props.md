# § `props` of Datatable

| prop | Desc | Type | Optional values | Default value | Required |
|----------------|------------------------------------------------|---------|--------------|--------|----------|
| columns | Defination of columns | Array | - | - | Y |
| data | Table data of the current page (rows) | Array | - | - | Y |
| total | Total number of records | Number | - | - | Y |
| query | Query object | Object | - | - | Y |
| selection | Container of multi-select | Array | - | - | N |
| summary | Summary row | Object | - | - | N |
| HeaderSettings | Should render HeaderSettings | Boolean | true / false | true | N |
| Pagination | Should render pagination related | Boolean | true / false | true | N |
| xprops | Container of extra props passed to dynamic components | Object | - | - | N |
| support-backup | Should support backup of HeaderSettings | Boolean | true / false | false | N |
| support-nested | Should support nested components | Boolean | true / false | false | N |
| table-bordered | Should add `.table-bordered` to `<table>` | Boolean | true / false | false | N |

> The above is based on the source ([`lib/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/lib/index.vue)).  
> By the way, the advanced example (source - [`examples/src/Advanced/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/index.vue), demo - [examples#advanced](https://OneWayTech.github.io/vue2-datatable/examples/dist#advanced))  
> almost covers all the usages, which is highly recommended to study and imitate.

In the following content, I would like to emphasize the props below:  

* `columns`
* `data`
* `query`
* `selection`
* `summary`
* `xprops`
* Dynamic components（`thComp / tdComp / nested component`）
