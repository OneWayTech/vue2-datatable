# § Tricks

> Before getting started, you'd better do some homework for a better comprehension

***

#### ⊙ Grasp the usage of dynamic components
Take a look at the official docs: [Dynamic Components](https://vuejs.org/v2/guide/components.html#Dynamic-Components).

#### ⊙ Knowledge of state sharing
https://github.com/kenberkeley/vue-state-management-alternative

#### ⊙ Too many `props` to pass? [`v-bind`](https://cn.vuejs.org/v2/api/#v-bind) can help which is like spread operator (`...`) in JSX
> Refers to [vuejs/vue#4962](https://github.com/vuejs/vue/issues/4962)

```html
<template>
  <div>
    <hello-world
      :a="a"
      :b="b"
      :c="c"
      :d="d">
    </hello-world>
    <!-- Do the same thing but the following is more elegant -->
    <hello-world v-bind="$data" />
  </div>
</template>
<script>
export default {
  data: () => ({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  })
}
</script>
```

#### ⊙ Simplify template for `propType: Boolean`

Assume there is a `HelloWorld` component and its `props` is defined as below:

```js
props: {
  test: Boolean
}
```

Then the following patterns are coordinate, but the latter seems more elegant.

```html
<hello-world
  :test="true">
</hello-world>

<hello-world test />
```

#### ⊙ Shorten code with comma operator

```js
cols.map(col => {
  col.weight = col.weight || 0
  return col
})

// Shortened
cols.map(col => ((col.weight = col.weight || 0), col))
```
