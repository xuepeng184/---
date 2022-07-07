//二次重写axios，增加拦截器
//引入axios
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//进入进度条样式
import 'nprogress/nprogress.css'

const requests =axios.create({
  baseURL: "/mock",
  timeout: 5000,
});

requests.interceptors.request.use( (config)=> {
  // 在发送请求之前做些什么
  //进度条开始
  nprogress.start()
  return config;
})

// 添加响应拦截器
requests.interceptors.response.use( (response) =>{
  // 对响应数据做点什么
  // 进度条结束
  nprogress.done()
  return response.data;
}, (error) =>{
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default requests