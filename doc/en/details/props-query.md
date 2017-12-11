# `:query`

Let's see how this Datatable initializes `query` (source: `created` hook in [`src/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/src/index.vue)):

```js
created () {
  // init query (make all the properties observable by using `$set`)
  const q = { limit: 10, offset: 0, sort: '', order: '', ...this.query }
  Object.keys(q).forEach(key => { this.$set(this.query, key, q[key]) })
}
```

> According to the above, `query` will change immediately.  
> That's why `immediate: true` is not added in `watch:query` (but `deep: true` is required).

Normally, you just have to pass an empty object `{}`.  
If there are any other query conditions (such as `keyword`), you should:
  1. **Either:** initially passing `{ keyword: '' }` (recommended)
  2. **Or:** manually `this.$set(this.query, 'keyword', '')` with [`Vue.set / $vm.$set`](https://vuejs.org/v2/api/#Vue-set)

> Both of the methods above are used in the advanced example.  
> They both have the same purpose: make the extra query conditions [reactive](https://vuejs.org/v2/guide/reactivity.html)!  
> (Method 2 can refer to `methods.search` in [`examples/src/Advanced/comps/th-Filter.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps/th-Filter.vue))
> 
> Tips: If you are using `Ajax - GET`, don't forget to use [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) to escape some special values (such as URLs, etc)

***

**Hereon, I have to point out a very common bug:**  
**Any changes to `query` should reset `query.offset` to `0` (e.g. [`examples/src/Advanced/comps/th-Filter.vue - Line 39`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps/th-Filter.vue#L39))**  
**Otherwise, the query result is doomed to be wrong!**

***

#### ⊙ Extention

Now we have a very common scenario: remain the query conditions after the full page reload.  
The most common solution is **synchronizing `query` with the URL query**.

Here is an example:

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
      query: this.$route.query // (mind the potential risks in production)
    }
  },
  watch: {
    // sync query to URL query
    query: {
      handler (query) {
        this.$router.push({ query })
      },
      deep: true
    },
    // listen for changes of URL query to reload data
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

> Q: when does `watch` need `deep: true`?  
> A: generally speaking, only two cases included:
> 
> 1. an object which is no a computed property
> 2. a nested array which you want to `watch` deeply  
> (e.g. `[{ id: 1, name: 'Ken' }, { id: 2, name: 'Berkeley' }]`)
> 
> For example, `$route.query` is an object, but it's also a computed property, so `deep: true` is unnecessary
