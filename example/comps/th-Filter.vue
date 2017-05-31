<template>
  <div class="btn-group">
    {{ title }}
    <a href="javascript:;" data-toggle="dropdown">
      <i class="fa fa-filter" :class="{ 'text-muted': !keyword }"></i>
    </a>
    <ul class="dropdown-menu p-3">
      <div class="input-group input-group-sm">
        <input type="search" class="form-control" ref="input"
          v-model="keyword" @keydown.enter="search" :placeholder="`Search ${field}...`">
          <span class="input-group-btn">
            <button class="btn btn-default fa fa-search" @click="search"></button>
          </span>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['field', 'title', 'query'],
  data: () => ({
    keyword: ''
  }),
  mounted () {
    $(this.$el).on('shown.bs.dropdown', e => this.$refs.input.focus())
  },
  watch: {
    keyword (kw) {
      // reset immediately if empty
      if (kw === '') this.search()
    }
  },
  methods: {
    search () {
      // `$props.query` is set to `{ limit: 10, offset: 0, sort: '', order: 'asc' }` by default
      // custom query fields must be set to observable by `Vue.set / $vm.$set` manually
      this.$set(this.query, this.field, this.keyword)
    }
  }
}
</script>
<style>
input[type=search]::-webkit-search-cancel-button {
  -webkit-appearance: searchfield-cancel-button;
  cursor: pointer;
}
.p-3 {
  padding: 3px;
}
</style>
