//在这里配置路由
import Vue from 'vue';
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter);
//引入路由组件
import routes from './routes'
//配置路由
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
  routes,
  //滚动行为，切换到最顶上
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})