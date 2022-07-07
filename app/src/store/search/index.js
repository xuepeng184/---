import {
  reqGetSearchInfo
} from "@/api"

const state = {
  searchList: {}
}
//处理业务逻辑
const actions = {
  //获取search模块数据
  //params参数时diapatch时第二个参数
  async getSearchList({
    commit
  }, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data)
    }
  }
};
//修改state的手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
};
//理解为计算属性，用于简化仓库数据
const getters = {
  //当前仓库的state
  goodsList(state){
     return state.searchList.goodsList || [];
  },
  trademarkList(state){
    return state.searchList.trademarkList || [];
  },
  attrsList(state){
    return state.searchList.attrsList || [];
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}