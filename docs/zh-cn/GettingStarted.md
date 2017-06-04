# § 开始

我们以 [`example/Basic/index.vue`](https://github.com/kenberkeley/vue2-datatable/blob/master/example/Basic/index.vue) 为例，效果见 [demo](https://kenberkeley.github.io/vue2-datatable/example-dist)

```html
<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
</template>
<script>
import Datatable from 'vue2-datatable'
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
