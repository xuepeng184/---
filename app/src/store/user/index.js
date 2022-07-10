import {
  reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister
} from "@/api"
import {setToken,removeToken} from '@/utils/token'

const state = {
  code:'',
  token:localStorage.getItem("TOKEN"),
  userInfo:{},
}
const mutations = {
  GETCODE(state,code){
    state.code=code
  },
  USERLOGIN(state,token){
    state.token=token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo=userInfo
  },
  CLEAR(state){
    state.token='';
    state.userInfo={};
    removeToken()
  }
}

const actions = {
  //获取验证码
  async getCode({
    commit
  }, phone) {
    let result = await reqGetCode(phone);
    if(result.code==200){
      commit('GETCODE',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error("faile"))
    }
  },
  //用户注册
  async userRegister({commit},user){
    let result=await reqUserRegister(user); 
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error("faile"))
    }
  },
  //登录业务
  async userLogin({commit},data){
    let result=await reqUserLogin(data);
    if(result.code==200){
      commit('USERLOGIN',result.data.token)
      setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error("faile"))
    }
  },
  //获取用户信息
  async getUserInfo({commit}){
    let result =await reqUserInfo();
    console.log(result)
    if(result.code==200){
      commit('GETUSERINFO',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  //退出登录
  async userLogout({commit}){
    let result= await reqLogout()
    console.log(result)
    if(result.code==200){
      commit('CLEAR')
      return 'ok'
    }else{
      return Promise.reject(new Error("faile"))
    }
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}