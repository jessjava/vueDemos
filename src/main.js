import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import _ from 'lodash'
import filters from './filters/'
import mSlider from './components/aside/index'
Vue.use(mSlider)

Vue.config.productionTip = false

Axios.defaults.headers.common.Accept = 'application/json'
Axios.defaults.headers.common.Authorization = 'Bearer ' //localStorage.getItem("token_value")

Vue.prototype.$axios = Axios;
Vue.prototype._ = _

// 注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

try {
    // window.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // window.userInfo.Roles = window.userInfo.Roles ? window.userInfo.Roles : []
} catch (e) {
    console.log("get user info from localstorage error")
}

Axios.interceptors.response.use(
    response => {
        // console.log(response)
        // 对 Axios 进行包装
        // 全局处理一些错误
        //if(response && response.data && (response.data.errCode=="200002")){
        //localStorage.removeItem('userInfo')
        //router.push('/login')
        // }
        console.log("axios response data", response, response.data)
        return response.data
    },
    error => {
        console.error(error);
        if (error.response == undefined || error.response.status == 500 || error.response.status == 502) {
            // 去500页

        } else if (error.response.status == 404) {
            // 去404 页面
        }
        return Promise.reject(error) // 返回接口返回的错误信息
    });

// router.beforeEach((to, from, next) => {
//     let token_value = window.localStorage.getItem("token_value");
//     // 根据路由判断页面是否需要 auth 验证
//     if (to.meta.auth) {
//         if (token_value == null || token_value == "") {
//             console.error("auth error")
//                 // next({path: '/IdentifyCode'})
//         } else {
//             next()
//         }
//     } else {
//         next()
//     }
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})