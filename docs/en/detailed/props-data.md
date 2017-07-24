# `:data`

> In a more semantic way, it should be called `rows`.  
> However, most of the popular Datatables prefer `data`. So I have to compromise.

Normally, it's not necessary to talk about this attribute since it's so simple.  
But this Datatable supports **nested components** by performing magic in it.

It would be more direct to deep into the source (`computed.data$` in [`lib/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/lib/index.vue)) to see how it works:

```js
data$ () {
  const { data } = this
  if (this.supportNested) {
    data.forEach(item => {
      if (!item.__nested__) {
        this.$set(item, '__nested__', {
          comp: '',
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
        ... // omit the implementation of accordion
        Object.defineProperty(item, '__nested__', { enumerable: false })
      }
    })
  }
  return data
}
```

According to the above, each item (row) of data (rows) is `$set` an **unenumerable `__nested__`**, including three attributes:

| Attr | Desc | Type | Optional values / usages | Default value |
|---------|--------------|----------|-------------------------------------------------------------|--------|
| comp | name of the current nested component | String | - | '' |
| visible | Is the nested component visible | Boolean | true / false | false |
| $toggle | API to control `comp` and `visible` conveniently | Function | `$toggle(comp)` / `$toggle(visible)` / `$toggle(comp, visible)` | - |

In the source， **`__nested__`** would be passed to the related **`tdComp`** and **nested components**:

```html
<!-- table body component (tdComp) -->
<component
  :is="comp[column.tdComp]"
  :row="item"
  :field="column.field"
  :value="item[column.field]"
  :nested="item.__nested__"
  v-bind="$props">
</component>

<!-- nested component -->
<component
  :is="comp[item.__nested__.comp]"
  :row="item"
  :nested="item.__nested__"
  v-bind="$props">
</component>
```

By doing all these, we could control the **nested component** by `props.nested.$toggle` in the related dynamic components.  
(Of cource, you can invoke `props.row.__nested__.$toggle`, which is the same thing)

> In the advanced example, component [`Opt`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps/td-Opt.vue) made a full use of **`nested`**, which is highly recommended to study and imitate.
