<style scoped>
.jsfiddlediv {
  max-height: 700px;
  overflow: scroll;
}
</style>
<template>
  <div class="jsfiddlediv">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Jsfiddle',
  data() {
    return {}
  },
  mounted: function() {
    let script = document.createElement('script')
    let url = this.$el.innerText
    this.$el.innerHTML = ''
    script.src = url
    this.$el.appendChild(script)
  },
}
</script>
