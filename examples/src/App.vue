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
        <a class="navbar-brand" href="#">
          vue2-datatable-component
        </a>
      </div>
      <div class="collapse navbar-collapse" id="nav-collapse">
        <i class="navbar-text">
          The best Datatable for Vue.js 2.x which never sucks
        </i>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a target="_blank" href="https://OneWayTech.github.io/vue2-datatable/doc">
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
        <li :class="{ active: showTab === 'fixed' }">
          <a href="#fixed">Fixed ( header and columns )</a>
        </li>
      </ul>
      <div class="tab-content" style="margin-top: 10px">
        <div class="tab-pane" :class="{ active: showTab === 'basic' }">
          <basic v-if="showTab === 'basic'" />
        </div>
        <div class="tab-pane" :class="{ active: showTab === 'advanced' }">
          <advanced v-if="showTab === 'advanced'" />
        </div>
        <div class="tab-pane" :class="{ active: showTab === 'fixed' }">
          <fixed v-if="showTab === 'fixed'" />
        </div>
      </div>
      <hr />
      <button class="btn btn-default btn-block" @click="viewSource">
        <i class="fa fa-code"></i> &nbsp; View Source
      </button>
    </div>

    <footer>
      Open Devtools - Console to see what <code>_mockData</code> receives and responds
    </footer>
  </div>
</template>
<script>
import Basic from './Basic/'
import Advanced from './Advanced/'
import Fixed from './Fixed/'
import capitalize from 'lodash/capitalize'
const getCurHash = () => location.hash.replace(/^#/, '')

export default {
  components: { Basic, Advanced, Fixed },
  data: () => ({
    showTab: getCurHash() || 'advanced'
  }),
  mounted () {
    $(window).on('hashchange', () => {
      this.showTab = getCurHash()
      console.clear()
    })
  },
  methods: {
    viewSource () {
      window.open(`https://github.com/OneWayTech/vue2-datatable/blob/master/examples/src/${capitalize(this.showTab)}/index.vue`)
    }
  }
}
</script>
<style>
html {
  position: relative;
  min-height: 100%;
}
footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px 0;
  font-size: 12px;
  text-align: center;
  color: #afafaf;
}
</style>
