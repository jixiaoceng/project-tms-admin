/*
 * @Author: 季芳莉
 * @Date: 2019-06-04 20:17:04
 * @Last Modified by: 季芳莉
 * @Last Modified time: 2019-06-17 12:32:03
 */
import Vue from 'vue'
import axios from 'axios'
// import router from '@/router'
import qs from 'qs'
// import HandleToken from '@/utils/auth'
// const handleToken = new HandleToken()

axios.defaults.withCredentials = true

/**
 * 处理请求头数据和处理结果
 */
class HandleParamAndResult {
  constructor() {
    console.log(process.env.VUE_APP_BASE_API + '----')
    var HOST = process.env.VUE_APP_BASE_API

    this.api = HOST
  }

  // 添加请求头
  _addHeaders() {
    // 自定义headers
    const headers = {
      'Content-Type': 'application/json'
    }
    // 动态添加token
    // if (handleToken.getToken()) {
    //   headers.Authorization = `Token ${handleToken.getToken()}`
    // }
    return headers
  }
  _addHeadersPost() {
    // 自定义headers Post请求
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // 动态添加token
    // if (handleToken.getToken()) {
    //   headers.Authorization = `Token ${handleToken.getToken()}`
    // }
    return headers
  }

  // 处理请求
  dealAxios(url, options) {
    const _this = this
    if (options.method === 'post' || options.type === 'formData' || options.method === 'put') {
      options.headers = this._addHeadersPost()
    } else {
      options.headers = this._addHeaders()
    }

    // do something before request
    return new Promise((resolve, reject) => {
      axios(_this.api + url, options).then(res => {
        if (res.data.code === 1 && res.data.code !== 'undefined') {
          Vue.prototype.$message({
            message: res.data.message,
            type: 'error',
            duration: 3000
          })
          return
        }
        resolve(res)
      }).catch(err => {
        console.log(err.response.data)
        // if ((Number(err.response.status) === 401 && err.response.status !== 401100)) {
        //   handleToken.removeToken()
        //   router.push({ path: '/login' })
        //   return
        // }
        if (err.response.status === 'error') {
          err.response.data.detail = '网络连接失败，请检查网络，并刷新重试！'
        }
        Vue.prototype.$message({
          message: err.response.data.detail,
          type: 'error',
          duration: 3000
        })
        reject(err)
      })
    })
  }
}
/**
 * 封装请求方法
 * @param { Number | String } 平台传递的版本号
 */
class RequestMethod {
  constructor() {
    this.$get = this.$get.bind(this)
    this.$post = this.$post.bind(this)
    this.$put = this.$put.bind(this)
    this.$delete = this.$delete.bind(this)
    this.$upload = this.$upload.bind(this)
    this._method = this._method.bind(this)
  }

  /**
     * 整合请求方法
     * @param { String } url 接口路由
     * @param { Object } axios配置 请求参数
     */
  _method(url, options) {
    return new HandleParamAndResult().dealAxios(url, options)
  }

  /**
     * get方法
     * @param { String } url 接口路由
     * @param { Object } data 请求参数
     */
  $get(url, data) {
    return this._method(url, {
      params: data,
      method: 'get'
    })
  }

  /**
     * post方法
     * @param { String } url 接口路由
     * @param { Object } data 请求参数
     */
  $post(url, data) {
    return this._method(url, {
      data: qs.stringify(data),
      method: 'post',
      type: 'formData'
    })
  }

  /**
     * put方法
     * @param { String } url 接口路由
     * @param { Object } data 请求参数
     */
  $put(url, data) {
    return this._method(url, {
      data: qs.stringify(data),
      method: 'put',
      type: 'formData'
    })
  }

  /**
     * delete方法
     * @param { String } url 接口路由
     * @param { Object } data 请求参数
     */
  $delete(url, data) {
    return this._method(url, {
      params: data,
      method: 'delete'
    })
  }

  /**
     * 上传方法
     * @param { String } url 接口路由
     * @param { Object } data 请求参数
     */
  $upload(url, data) {
    return this._method(url, {
      body: data,
      method: 'post',
      type: 'formData'
    })
  }
}
export default RequestMethod
