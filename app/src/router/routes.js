//使用路由懒加载

export default [{
  path: '/home',
  component: ()=>import("@/pages/Home"),
  meta:{
    show:true
  }
},
{
  path: '/paysuccess',
  component: ()=>import("@/pages/PaySuccess"),
  meta:{
    show:true
  }
},
{
  path: '/center',
  component: ()=>import("@/pages/Center"),
  meta:{
    show:true
  },
  //二级路由
  children:[
    {
      path:'myorder',
      component:()=>import("@/pages/Center/myOrder")
    },
    {
      path:"grouporder",
      component:()=>import("@/pages/Center/groupOrder")
    },
    {
      path:"/center",
      redirect:"/center/myorder"

    }
  ]
},
{
  path: '/pay',
  component: ()=>import("@/pages/Pay"),
  meta:{
    show:true
  },
  beforeEnter: (to, from, next) => {
    if(from.path=="/trade"){
      next()
    }else{
      next(false)
    }
  }
},
{
  path: '/shopcart',
  component: ()=>import("@/pages/ShopCart"),
  meta:{
    show:true
  }
},
{
  path: '/trade',
  component: ()=>import("@/pages/Trade"),
  meta:{
    show:true
  },
  beforeEnter: (to, from, next) => {
    if(from.path=="/shopcart"){
      next()
    }else{
      next(false)
    }
  }
},
{
  name:"search",
  path: '/search/:keyword?',
  component: ()=>import('@/pages/Search') ,
  meta:{
    show:true
  }
},
{
  name:'addcartsuccess',
  path: '/addcartsuccess',
  component: ()=>import("@/pages/AddCartSuccess"),
  meta:{
    show:true
  }
},
{
  path: '/login',
  component: ()=>import("@/pages/Login"),
  meta:{
    show:false
  }
},
{
  path: '/Register',
  component: ()=>import("@/pages/Register"),
  meta:{
    show:false
  }
},
{
  //调到详情页时需要传id的参数
  path:"/detail/:skuId?",
  component:()=>import("@/pages/Detail"),
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