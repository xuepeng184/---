<template>
  <div>
    <Header />
    <!-- 路由组件展示的地方 -->
    <router-view></router-view>
    <!-- 在home和seach是显示的，login和register是隐藏的 -->
    <!-- 这是一种解决方案<Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->

    <Footer v-if="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //挂载完毕，发送请求获取数据，且由于在App内所以只执行一次
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style>
a:hover{
  cursor: pointer;
}
</style>
