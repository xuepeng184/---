import Vue from 'vue'
import App from './App.vue'
// 按需引入element-ui
import {Icon} from 'element-ui';
Vue.use(Icon)
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

//引入swiper
import 'swiper/css/swiper.css'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)
//引入轮播图组件--全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)
//引入分页器--全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)
//引入路由
import router from './router'
//引入仓库
import store from '@/store'
//引入mock数据
import '@/mock/mockServe'

//引入并使用jquery
// import $ from 'jquery'
// Vue.use($)

//测试


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  beforeCreate() {
    //配置全局时间总线
    Vue.prototype.$bus=this;
  },
  //注册路由
  router,
  store
}).$mount('#app')
