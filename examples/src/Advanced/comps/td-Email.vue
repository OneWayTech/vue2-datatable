<template>
  <a :href="`mailto:${value}`">{{ value }}</a>
</template>
<script>
export default {
  props: ['value']
}
</script>
