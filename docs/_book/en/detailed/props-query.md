# `:query`

Let's see how this Datatable initializes `query` (source - hook `created` in [`lib/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/lib/index.vue)):

```js
created () { // init query
  const { query } = this
  const q = { limit: 10, offset: 0, sort: '', order: '', ...query }
  Object.keys(q).forEach(key => this.$set(query, key, q[key]))
}
```

> According to the above, `query` will change immediately.  
> That's why [`watch`](https://vuejs.org/v2/api/#watch): `query` doesn't need `immediate: true` (but `deep: true` is required)

Normally, you just need to pass an empty object `{}`.  
If there are any other query conditions (such as `keyword`), you should:
  1. **Either:** initially pass `{ keyword: '' }` (recommended)
  2. **Or:** manually `this.$set(this.query, 'keyword', '')` with [`Vue.set / $vm.$set`](https://vuejs.org/v2/api/#Vue-set)

> Both of the methods above were used in the advanced example.  
> They both have the same purpose: make the extra query conditions [reactive](https://vuejs.org/v2/guide/reactivity.html)!  
> (Method 2 see `methods.search` in [`examples/src/Advanced/comps/th-Filter.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps/th-Filter.vue))
> 
> Tips: If you are using `Ajax - GET`, don't forget to use [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) to escape complex values (such as a URL)

***

#### ⊙ Extended

Here we have a very common requirement: keep the query conditions after the full page reload.  
The most common solution is **sync query with URL**.

Let's make the basic example to meet the requirement:
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
  data () {
    return {    
      columns: [
        { title: 'User ID', field: 'uid', sort: true },
        { title: 'Username', field: 'name' },
        { title: 'Age', field: 'age', sort: true },
        { title: 'Email', field: 'email' },
        { title: 'Country', field: 'country' }
      ],
      data: [],
      total: 0,
      // initially pass URL query (pay attention to security in production)
      query: this.$route.query
    }
  },
  watch: {
    // sync query to URL query
    query: {
      handler (query) {
        this.$router.push({ path: this.$route.path, query })
      },
      deep: true
    },
    // listen to URL query changes to reload data
    '$route.query' (query) {
      mockData(query).then(({ rows, total }) => {
        this.data = rows
        this.total = total
      })
    }
  }
}
</script>
```

> Question: when does `watch` need `deep: true`?  
> Answer: generally speaking, only two cases need:
> 
> 1. an object which is no a computed property
> 2. nested array (e.g. `[{ id: 1, name: 'Ken' }, { id: 2, name: 'Berkeley' }]`)
> 
> For example, `$route.query` is an object but it's a computed property, so `deep: true` is unnecessary
