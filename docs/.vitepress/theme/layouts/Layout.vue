<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
</script>
<template>
  <DefaultTheme.Layout>
    <template #layout-bottom>
      <div class="beian">
        <div>
          <a target="_blank" href="http://beian.miit.gov.cn/">鄂ICP备2021017859号</a>
        </div>
        <div>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011502001402">
            <img src="/images/batb.png" />
            鄂公网安备 42011502001402号
          </a>
        </div>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style lang="scss">
.beian {
  display: flex;
  text-align: center;
  margin: 0 auto;
  padding: 20px 0;
  justify-content: center;
  a {
    color: #939393;
    float: left;
  }
  img {
    display: inline-block;
  }
}
</style>
