//引入路由
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from "@/pages/Detail"
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
export default [{
  path: '/home',
  component: Home,
  meta:{
    show:true
  }
},
{
  path: '/shopcart',
  component: ShopCart,
  meta:{
    show:true
  }
},
{
  path: '/trade',
  component: Trade,
  meta:{
    show:true
  }
},
{
  name:"search",
  path: '/search/:keyword?',
  component: Search,
  meta:{
    show:true
  }
},
{
  name:'addcartsuccess',
  path: '/addcartsuccess',
  component: AddCartSuccess,
  meta:{
    show:true
  }
},
{
  path: '/login',
  component: Login,
  meta:{
    show:false
  }
},
{
  path: '/Register',
  component: Register,
  meta:{
    show:false
  }
},
{
  //调到详情页时需要传id的参数
  path:"/detail/:skuId?",
  component:Detail,
  meta:{
    show:true
  }

},
//重定向，在项目跑起来时，访问/，立马定向到首页
{
  path:'*',
  redirect:"/home"
}
]