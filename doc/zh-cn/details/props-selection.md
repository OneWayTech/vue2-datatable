# `:selection`

一般情况下，您只需要传入一个空数组 `[]` 即可  
若有行被勾选，则对应的 `row` 将会进入到 `selection` 中

编程式勾选第一条，可以这样操作：

```js
this.selection = [ this.data[0] ]
```

假如产品经理要求默认就要全部勾选，也是没问题的。就拿高级例子改一下：

```js
methods: {
  handleQueryChange () {
    mockData(this.query).then(({ rows, total, summary }) => {
      this.data = rows
      this.total = total
      this.summary = summary
        
      // 就是这么简单！
      this.$nextTick(() => this.selection = [...this.data])
    })
  }
}
```

!> 在此必须明确指出，全选不能这样操作： `this.selection = this.data`  
因为这样会导致引用一致，任意点击取消勾选，则当前 `data` 就会被清空！
