import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api"
//生成一个随机的字符串作为游客id
import {getUUID} from "@/utils/uuid_token"
const state={
  goodInfo:{},
  uuid_token:getUUID()
}
const mutations={
  GETGOODINFO(state,goodInfo){
    state.goodInfo=goodInfo
  },
}
const actions={
  //获取产品相关信息的action
  async getGoodInfo({commit},skuId){
   let result= await reqGoodsInfo(skuId)
   if(result.code==200){
     commit('GETGOODINFO',result.data)
   }
  },
  //将产品添加到购物车中
  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    let result=await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code==200){
      return "ok"
    }
    else{
      return Promise.reject(new Error("falie"))
    }
  } 
}
const getters={

  //路径导航的简化
  categoryView(state){
    return state.goodInfo.categoryView || {};
  },
  //简化产品信息的数据
  skuInfo(state){
    return state.goodInfo.skuInfo || {};
  },
  //简化产品售卖属性
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}