<script setup lang="ts">
import { ref, onMounted } from 'vue'
const root = ref<HTMLElement>()
onMounted(() => {
  if (!root.value) {
    return
  }
  let script = document.createElement('script')
  let url = root.value.innerText
  root.value.innerHTML = ''
  script.src = url
  root.value.appendChild(script)
})
</script>
<template>
  <div ref="root" class="jsfiddlediv">
    <slot></slot>
  </div>
</template>

<style scoped>
.jsfiddlediv {
  max-height: 700px;
  overflow: scroll;
}
</style>
