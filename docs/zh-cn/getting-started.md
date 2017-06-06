# § 开始

我们以基本例子 [`examples/src/Basic/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Basic/index.vue) 为例，效果见 [examples#basic](https://OneWayTech.github.io/vue2-datatable/examples/dist)

```html
<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
</template>
<script>
import Datatable from '../../../'
import mockData from '../_mockData'

export default {
  components: { Datatable },
  data: () => ({
    columns: [
      { title: 'User ID', field: 'uid', sort: true },
      { title: 'Username', field: 'name' },
      { title: 'Age', field: 'age', sort: true },
      { title: 'Email', field: 'email' },
      { title: 'Country', field: 'country' }
    ],
    data: [],
    total: 0,
    query: {}
  }),
  watch: {
    query: {
      handler (query) {
        mockData(query).then(({ rows, total }) => {
          this.data = rows
          this.total = total
        })
      },
      deep: true
    }
  }
}
</script>
```
