# `:selection`

Normally, you just have to pass an empty array `[]`.  

Select the first row in programmatic way:

```js
this.selection = [ this.data[0] ]
```

If you want all the rows selected by default, no problem:

```js
methods: {
  handleQueryChange () {
    mockData(this.query).then(({ rows, total, summary }) => {
      this.data = rows
      this.total = total
      this.summary = summary
        
      this.$nextTick(() => {
        this.selection = [...this.data] // that's it!
      })
    })
  }
}
```

!> Attention: **DO NOT USE `this.selection = this.data`** for selecting all.  
Since they share the same reference, any deselection would clear the whole `data`.
