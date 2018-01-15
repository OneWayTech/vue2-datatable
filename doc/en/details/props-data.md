# `:data`

> In a more semantic way, it should be named `rows`.  
> However, most of the popular Datatables prefer `data`, which should be complied with.

Normally, it's not necessary to talk about this prop (it's too simple).  
But this Datatable supports `nested components` feature by performing magic on it.

It would be more direct to excerpt `watch:data` from the source code ([`src/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/src/index.vue)) to see how it works:

```js
watch: {
  data: {
    handler (data) {
      const { supportNested } = this
      // support nested components feature with extra magic
      if (supportNested) {
        const MAGIC_FIELD = '__nested__'
        data.forEach(item => {
          if (!item[MAGIC_FIELD]) {
            this.$set(item, MAGIC_FIELD, {
              comp: undefined, // current nested component
              visible: false,
              $toggle (comp, visible) {
                switch (arguments.length) {
                  case 0:
                    this.visible = !this.visible
                    break
                  case 1:
                    switch (typeof comp) {
                      case 'boolean':
                        this.visible = comp
                        break
                      case 'string':
                      case 'object':
                        this.comp = comp
                        this.visible = !this.visible
                        break
                    }
                    break
                  case 2:
                    this.comp = comp
                    this.visible = visible
                    break
                }
              }
            })
            // omit the implementation of accordion...
            Object.defineProperty(item, MAGIC_FIELD, { enumerable: false })
          }
        })
      }
    },
    immediate: true
  }
}
```

According to the above, an **unenumerable** property `__nested__`  is `$set` in every item (row) of data (rows), which includes three properties:

| Attr | Desc | Type | Optional values / usages | Default value |
|---|---|---|---|---|
| comp | Name of the current nested component | String | - | '' |
| visible | Is the nested component visible | Boolean | true / false | false |
| $toggle | A convenient API to control `comp` and `visible` | Function | `$toggle(comp)` / `$toggle(visible)` / `$toggle(comp, visible)` | - |

In the source template, `__nested__` would be passed to the related `tdComp` and `nested components`:

```html
<!-- <td> component (tdComp) -->
<component
  v-if="col.tdComp"
  :is="forDynCompIs(col.tdComp)"
  :row="item"
  :field="col.field"
  :value="item[col.field]"
  :nested="item.__nested__"
  v-bind="$props">
</component>

<!-- nested component -->
<component
  :is="forDynCompIs(item.__nested__.comp)"
  :row="item"
  :nested="item.__nested__"
  v-bind="$props">
</component>
```

By doing all these, we can control the `nested component` by `props.nested.$toggle` within the corresponding dynamic components.  
(Of cource, you can manipulate `props.row.__nested__` directly, which is the same thing but more verbose)

> In the advanced example, component [`Opt`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps/td-Opt.vue) makes a full use of `props.nested`, which is highly recommended to study and imitate.
