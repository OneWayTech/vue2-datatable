<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="navbar-header">
        <button class="navbar-toggle collapsed"
          data-toggle="collapse" data-target="#nav-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Vue2 Datatable</a>
      </div>
      <div class="collapse navbar-collapse" id="nav-collapse">
        <i class="navbar-text">
          The Best Datatable for Vue.js 2.x which never sucks
        </i>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a target="_blank" href="https://OneWayTech.github.com/vue2-datatable/docs/_book">
              <i class="fa fa-book"></i> Documentation
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/OneWayTech/vue2-datatable">
              <i class="fa fa-github"></i> Github
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
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
