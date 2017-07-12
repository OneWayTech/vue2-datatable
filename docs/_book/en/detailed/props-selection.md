# `:selection`

Normally, you just need to pass an empty array `[]`.  
If any row is selected, then it would be in `selection`.

For example, select the first row in programmatic way:

```js
this.selection = [ this.data[0] ]
```

If your PM wants all the rows selected by default, no problem.  
Let's take the advanced example to adapt:

```js
methods: {
  handleQueryChange () {
    mockData(this.query).then(({ rows, total, summary }) => {
      this.data = rows
      this.total = total
      this.summary = summary
        
      // Just so simple!
      this.$nextTick(() => this.selection = [...this.data])
    })
  }
}
```

Attention: **DO NOT `this.selection = this.data`** for selecting all.  
This leads to their references are the same. Any deselection would clear the whole `data`.
