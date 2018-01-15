# `:data`

> 实际上该项应该叫 `rows` 才合理，但主流的 Datatable 都是这样称呼，我也不能免俗

本身该项是没啥好讲的，但本 Datatable 支持**内嵌组件 (nested component)**，靠的就是在这里做文章  
直接把源码 [`src/index.vue`](https://github.com/OneWayTech/vue2-datatable/blob/master/src/index.vue) 中的 `watch:data` 搬出来：

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
            // 省略手风琴的实现...
            Object.defineProperty(item, MAGIC_FIELD, { enumerable: false })
          }
        })
      }
    },
    immediate: true
  }
}
```

由上可知，本 Datatable 对 `data (rows)` 内的各个元素 `item (row)` 设置了一个**不可遍历属性 `__nested__`**，包含以下三个属性：

| 属性 | 说明 | 类型 | 可选项 | 默认值 |
|---|---|---|---|---|
| comp | 内嵌组件名 | String | - | '' |
| visible | 是否显示 | Boolean | true / false | false |
| $toggle | 便捷操作函数 | Function | `$toggle(comp)` / `$toggle(visible)` / `$toggle(comp, visible)` | - |

在源码模板中， `__nested__` 作为 `props.nested` 传入到对应的 `tdComp` 与 `nested component` 中：

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


由此，在对应的动态组件内部，即可通过 `props.nested.$toggle` 实现对 `nested component` 的控制  
（当然，直接操作 `props.row.__nested__` 也是没问题的，因为是同一个东西）

> 高级例子中， [`Opt`](https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/Advanced/comps/td-Opt.vue) 组件对 `props.nested` 的用法相当详尽，建议参考
