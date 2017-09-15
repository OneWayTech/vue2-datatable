# § Getting started

### ⊙ npm

`>_ npm i -S vue2-datatable-component`

```js
import Vue from 'vue'
import Datatable from 'vue2-datatable-component'

Vue.use(Datatable) // done!
```

Let's roll up with the basic example (source: [`examples/src/Basic/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Basic/index.vue), demo: [examples#basic](https://OneWayTech.github.io/vue2-datatable/examples/dist))

```html
<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
</template>
<script>
import mockData from '../_mockData'

export default {
  data: () => ({
    columns: [
      { title: 'User ID', field: 'uid', sortable: true },
      { title: 'Username', field: 'name' },
      { title: 'Age', field: 'age', sortable: true },
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

### ⊙ CDN

Import the latest JS and CSS file from https://unpkg.com/vue2-datatable-component/dist in your page:

```
<link href="//unpkg.com/vue2-datatable-component/dist/min.css" rel="stylesheet">
<script src="//unpkg.com/vue2-datatable-component/dist/min.js"></script>
```

Here is an example:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CDN Example</title>
  <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
  <link href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <link href="//unpkg.com/vue2-datatable-component/dist/min.css" rel="stylesheet">
</head>
<body>

  <div id="app"></div>
  
<script src="//cdn.bootcss.com/vue/2.4.2/vue.min.js"></script>
<script src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="//unpkg.com/vue2-datatable-component/dist/min.js"></script>
<script>
  new Vue({
    el: '#app',
    template: [
      '<div class="container">',
        '<code>query: {{ query }}</code>',
        '<datatable v-bind="$data" />',
      '</div>>'
    ].join(''),
    data: function () {
      return {
        columns: [
          { title: 'User ID', field: 'uid', sortable: true },
          { title: 'Username', field: 'name' },
          { title: 'Age', field: 'age', sortable: true },
          { title: 'Email', field: 'email' },
          { title: 'Country', field: 'country' }
        ],
        data: [], // no data
        total: 0,
        query: {}
      }
    }
  })
</script>
</body>
</html>
```
