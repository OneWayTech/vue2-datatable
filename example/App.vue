<template>
  <div class="container m-t-10">
    <ul class="nav nav-tabs nav-justified">
      <li class="active">
        <a href="#basic" data-toggle="tab">Basic</a>
      </li>
      <li>
        <a href="#advanced" data-toggle="tab">Advanced</a>
      </li>
    </ul>
    <div class="tab-content m-t-10">
      <div class="tab-pane active" id="basic">
        <basic />
      </div>
      <div class="tab-pane" id="advanced">
        <advanced />
      </div>
    </div>
  </div>
</template>
<script>
import Basic from './Basic'
import Advanced from './Advanced'

export default {
  components: { Basic, Advanced }
}
</script>
<style>
.m-t-10 {
  margin-top: 10px;
}
</style>
