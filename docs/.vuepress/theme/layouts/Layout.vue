<template>
  <Layout>
    <template #page-bottom>
      <div class="my-footer">
        <div class="beian">
          <div>
            <a target="_blank" href="http://beian.miit.gov.cn/"
              >鄂ICP备2021017859号</a
            >
          </div>
          <div>
            <a
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011502001402"
            >
              <img style="margin:0 0px -3px 5px;" src="/images/batb.png" />
              鄂公网安备 42011502001402号
            </a>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'

export default {
  components: {
    Layout,
  },
}
</script>

<style lang="css">
.my-footer {
  text-align: center;
}
.beian {
  display: flex;
  text-align: center;
  margin: 0 auto;
  padding: 20px 0;
  justify-content: center;
}
.beian a {
  color: #939393;
  float: left;
}
</style>
