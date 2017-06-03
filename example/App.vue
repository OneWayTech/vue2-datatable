<template>
  <div class="container m-t-10">
    <ul class="nav nav-tabs nav-justified">
      <li :class="{ active: showTab === 'basic' }">
        <a href="#basic">Basic</a>
      </li>
      <li :class="{ active: showTab === 'advanced' }">
        <a href="#advanced">Advanced</a>
      </li>
    </ul>
    <div class="tab-content m-t-10">
      <div class="tab-pane" :class="{ active: showTab === 'basic' }">
        <basic />
      </div>
      <div class="tab-pane" :class="{ active: showTab === 'advanced' }">
        <advanced />
      </div>
    </div>
  </div>
</template>
<script>
import Basic from './Basic/'
import Advanced from './Advanced/'
const getCurHash = () => location.hash.replace(/^#/, '')

export default {
  components: { Basic, Advanced },
  data: () => ({
    showTab: getCurHash() || 'basic'
  }),
  mounted () {
    $(window).on('hashchange', () => this.showTab = getCurHash())
  }
}
</script>
<style>
.m-t-10 {
  margin-top: 10px;
}
</style>
