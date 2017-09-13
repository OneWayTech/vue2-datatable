<template>
  <div class="-nested-dsp-row-comp">
    <button class="btn btn-xs btn-link -nested-dsp-row-close-btn"
      @click="nested.$toggle(false)">
      <i class="fa fa-times fa-lg"></i>
    </button>
    <dl class="dl-horizontal">
      <template v-for="(val, key) in row">
        <dt>{{ key }}</dt>
        <dd>
          {{ val }}
          <button v-if="key === 'friends'" class="btn btn-xs btn-default"
            @click="nested.$toggle('FriendsTable', true)"
            title="Display friends table">
            <i class="fa fa-users"></i>
            {{ row.friends.length }}
          </button>
        </dd>
      </template>
    </dl>
  </div>
</template>
<script>
export default {
  props: ['row', 'nested']
}
</script>
<style>
.-nested-dsp-row-comp {
  position: relative;
  padding: 10px;
}
.-nested-dsp-row-close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
