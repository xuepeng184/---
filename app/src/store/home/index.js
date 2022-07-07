import {
  reqCategoryList,
  reqGetBannerList,
  reqGetFloorList
} from '@/api'

const state = {
  //三级联动的数据
  categoryList: [],
  //轮播图的数据
  bannerList: [],
  floorList:[],

};
//处理业务逻辑
const actions = {
  //向服务器发请求
  async categoryList({
    commit
  }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  //获得首页轮播图的数据
  async getBannerList({
    commit
  }) {
    let result = await reqGetBannerList();
    // console.log(result)
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  //获取mock出的floor的数据
  async getFloorList({commit}){
    let result= await reqGetFloorList()
    // console.log(result)
    if(result.code==200){
      commit('GETFLOORLIST',result.data)
    }
  }
};
//修改state的手段
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList=bannerList
  },
  GETFLOORLIST(state,floorList){
    state.floorList=floorList
  }
};
//理解为计算属性，用于简化仓库数据
const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}