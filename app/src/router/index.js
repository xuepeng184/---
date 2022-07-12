//在这里配置路由
import Vue from 'vue';
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter);
//引入store
import store from "@/store"
//引入路由组件
import routes from './routes'
//配置路由
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
let router = new VueRouter({
  routes,
  //滚动行为，切换到最顶上
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {
      y: 0
    }
  },
});
//全局前置守卫
router.beforeEach(async (to, from, next) => {
  next()
  let name = store.state.user.userInfo.name
  if (store.state.user.token) {
    //登陆了就不能去login页面了
    if (to.path == "/login") {
      next('/home')
    } else {
      // 登陆了去其他页面
      if (name) next()
      else {
        try {
          //获取用户信息展示
          await store.dispatch('user/getUserInfo')
        } catch (error) {
          //token失效，重新登录
          store.dispatch("user/userLogout")
          next("/login")
        }
      }
    }
  } else {
    //未登录
    next();
  }
})


export default router