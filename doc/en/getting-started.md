# § Getting started

### ⊙ npm

`>_ npm i -S vue2-datatable-component`

```js
// Webpack configuration
module: {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory',
      include: [
        <path to source directory>,
        /vue2-datatable-component/ // <-- add this!
      ]
    }
  ]
}
```

```js
import Vue from 'vue'
import Datatable from 'vue2-datatable-component'

Vue.use(Datatable) // done!
```

Let's roll up with the basic example (source: [`examples/src/Basic/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Basic/index.vue), demo: [examples#basic](https://OneWayTech.github.io/vue2-datatable/examples/dist#basic))

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
  <link href="//unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <link href="//unpkg.com/vue2-datatable-component/dist/min.css" rel="stylesheet">
</head>
<body>

  <div id="app"></div>
  
<script src="//unpkg.com/vue@2.4.4/dist/vue.min.js"></script>
<script src="//unpkg.com/jquery@2.1.4/dist/jquery.min.js"></script>
<script src="//unpkg.com/bootstrap@3.3.5/dist/js/bootstrap.min.js"></script>
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
