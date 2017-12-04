<template>
  <section class="hbox stretch bgimg">
    <section class="v-middle">
      <section class="panel card">
        <header class="panel-heading text-center"></header>
        <div class="panel-body animated fadeIn" v-if="visibleContainer=='mobilelogin'" style="padding:15px">
          <div class="form-group" :class="mobileErrorClass">
            <div class="control-label">用户名
              <div class="pull-right">{{errorMsg}}</div>
            </div>
            <input type="text" v-model="mobile" placeholder="请输入用户名" @keyup="checkMobile" class="form-control">
          </div>
          <div class="form-group" :class="codeErrorClass">
            <div class="control-label">密&nbsp;&nbsp;&nbsp;&nbsp;码 
              <div class="pull-right">{{codeErrorMsg}}</div>
            </div>
            <div>
              <input type="password" v-model="code" placeholder="请输入密码" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <button type="button" @click="login" class="btn btn-info" style="width:100%">登 录</button>
          </div>
          
          <p class="text-center text-danger" style="min-height:20px;line-height:20px;">{{loginError}}</p>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { modal } from 'vue-strap'
import Axios from 'axios';
export default {
  name: 'landing-page',
  components: { modal },
  data() {
    return {
      isLogin: false,               //手机登录多用户时，是否已经登录，登录则显示多用户列表
      codeButtonInfo: "获取验证码",   //验证码按钮上的字
      codeButtonDisable: true,      //验证码button
      errorMsg: "",                 //手机号message
      mobile: "",                   //手机
      code: "",                     //验证码
      username: "",                 //姓名
      mobileValid: false,           //手机已验证
      codeValid: false,             //code已验证
      mobileErrorClass: "",         //手机错误class
      codeErrorClass: "",           //code错误class
      codeErrorMsg: "",             //code错误提示消息
      nameErrorClass: "",           //name错误class
      nameErrorMsg: "",             //name错误提示消息
      qrUrl: "",                    //二维码URL
      key: "",                      //取二维码的key
      checkLoginCount: 0,           //轮询次数
      visibleContainer: '',         //二维码手机号登录切换trigger
      loginStatus: '',              //初始状态
      roleList: [],                 //手机号登录时角色选择列表
      loginError:"",                 //登录错误信息
      modalShow:false,               //是否显示小程序二维码
      showQRbutton:false,            //是否显示toggle登录方式的button 
      window:window
    }
  },
  mounted() {
    let corpid = localStorage.getItem("corpid");
    if (!this._.isNull(corpid)) {
      this.visibleContainer = 'qrcode';
      this.showQRbutton = true;
      this.getQR();
    } else {
      this.visibleContainer = 'mobilelogin';
      this.showQRbutton = false;
    }
  },
  methods: {
    checkName() {//手机号验证
      let self = this;
      if (self._.isEmpty(self.username)) {
        self.nameErrorClass = "has-error";
        self.nameErrorMsg = "请输入姓名";
        self.nameValid = false;
      } else {
        self.nameErrorClass = "";
        self.nameErrorMsg = ""
        self.nameValid = true;
      }
    },
    checkMobile() {//手机号验证
      return true;  
      let self = this;
      console.log(/^1(3|4|5|7|8)\d{9}$/.test(self.mobile))
      if (!/^1(3|4|5|7|8)\d{9}$/.test(self.mobile)) {
        self.mobileErrorClass = "has-error";
        self.errorMsg = "请输入正确的手机号";
        self.codeButtonDisable = true;
        self.mobileValid = false;
      } else {
        self.mobileErrorClass = "";
        self.errorMsg = ""
        self.codeButtonDisable = false;
        self.mobileValid = true;
      }
    },
    async checkCode() {//validation验证码
      let self = this;
      let user = await this.$axios.get("api/user/info");
 


      console.log(/^\d{4}$/.test(self.code))
      if (!/^\d{4}$/.test(self.code)) {
        self.codeErrorClass = "has-error";
        self.codeErrorMsg = "请输入正确验证码";
        self.codeValid = false;
      } else {
        self.codeErrorClass = "";
        self.codeErrorMsg = ""
        self.codeValid = true;
      }
    },
    toggleLogin() {//切换微信、手机登录
      let self = this;
      if (self.visibleContainer=='qrcode') {
        this.visibleContainer = 'mobilelogin';
        clearInterval(self.interval);
      } else {
        this.visibleContainer = 'qrcode';
        // this.visibleContainer = true;
        this.getQR();
      }
      // self.visibleContainer = !self.visibleContainer;
    },
    getUUID() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    refreshQR() {//刷新二维码
      let self = this;
      self.getQR();
    },
    async getQR() {//取二维码
      let self = this
      self.key = self.getUUID()
      let corpid = localStorage.getItem('corpid');
      let resp = await self.$axios.get('auth/user/qrcode?key=' + self.key + '&corpid=' +corpid);
      // let resp = await self.$axios.get('auth/user/qrcode?key=' + self.key)
      console.log(resp)
      self.qrUrl = resp;
      self.loginStatus = 'waiting';
      self.interval = setInterval(() => { self.checkLogin() }, 2500);
    },
    async checkLogin() {//轮询扫码状态
      let self = this;
      if (!(self.key && self.checkLoginCount < 50)) {
        self.checkLoginCount = 0;
        clearInterval(self.interval);
        self.loginStatus = 'expired'
        return
      }
      self.checkLoginCount++;
      let resp = await self.$axios.get('auth/user/checkauth?key=' + self.key)
      if (resp.status == 1) {
        if (self.loginStatus == 'waiting') {
          self.checkLoginCount = 0;
        }
        self.loginStatus = 'authorizing';
        console.log("authorizing");
        return
      }
      if (resp.status == 2) {
        clearInterval(self.interval);
        self.checkLoginCount = 0;
        console.log("authorized");
        if (resp.token) {//这一句没太明白
          localStorage.setItem('token_value', resp.token);
          console.log('local token is ', localStorage.getItem('token_value'));
          Axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem("token_value");
          let userinfo = await self.$axios.get('auth/user/detail')
          self.loginStatus = 'authorized'
          console.log(userinfo)
          if(self._.isNull(userinfo.mobile)){
            self.loginStatus = 'bundleInfo'
            self.visibleContainer="bundleInfo";
            return false;
          }
          localStorage.setItem('userInfo',JSON.stringify(userinfo))
          localStorage.setItem('fullname', userinfo.fullname);
          localStorage.setItem('userimg', userinfo.headimg);
          localStorage.setItem('corpid', userinfo.corpid);
          localStorage.setItem('userId', userinfo.id);
          localStorage.setItem('corpName', userinfo.Corp.corp_name);
          
          
          setTimeout(() => {
            // self.$router.push('/notice');
            self.$router.push('/noticenew');
          }, 1000);
        }
        return
      }
      if (resp.status == -1) {
        console.log("expired");
        self.loginStatus = 'expired'
        clearInterval(self.interval);
        return
      }
    },
    async getCode() {//获取手机验证码
      let self = this;
      self.codeButtonDisable = true;
      self.codeButtonInfo = "发送中...";
      let res = await self.$axios.post('/auth/sendVerifyCode', { mobile: self.mobile })
      // 判断是否发送成功
      // let res = {status:true}
      if (res.status == "success") {
        let countdown = 60;
        let codeTimer = setInterval(() => {
          countdown--;
          if (countdown == 0) {
            self.codeButtonInfo = "获取验证码";
            self.codeButtonDisable = false;
            clearInterval(codeTimer);
          } else {
            self.codeButtonInfo = `${countdown} 秒`;
            self.checkcodebtnenable = true;
          }
        }, 1000);
      } else {
        //do something 短信发送失败后
        self.loginError = "短信发送失败";
        setTimeout(() => {
        this.loginError = '';
        }, 1500);
      }
    },
    login(){
      let self = this;
      self.$router.push('/dashboard');
    },
    async login_old() {//手机验证码登录
      let self = this;
      self.$router.push('/noticenew');
      
      // self.isLogin = !self.isLogin
      let res = await self.$axios.post('/auth/user/verifyauth', { mobile: self.mobile, verifyCode: self.code })
      console.log(res);
      if (res.status == "error") {
        self.loginError = '验证码错误';
        setTimeout(()=>{
          self.loginError = '';
        },3000)
      } else if (res.status == "no_user") {
        //没这个人，该干嘛干嘛去。。。
        self.loginError = "无此用户";
        setTimeout(()=>{
          self.loginError = '';
        },3000)
        self.modalShow = true;
      }else{
         if (res.users) {
          //一堆人 
          console.log(2)
          self.roleList = res.users;
          self.isLogin = true; 

        } else {
          //一个人。
          console.log(3)
          localStorage.setItem('token_value', res.token);
          console.log('local token is ', localStorage.getItem('token_value'));
          Axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem("token_value");
          // let userinfo = res.userinfo;
          let userinfo = await self.$axios.get('auth/user/detail')
          console.log(userinfo)
          localStorage.setItem("userInfo", JSON.stringify(userinfo))
          localStorage.setItem('fullname', userinfo.fullname);
          localStorage.setItem('userimg', userinfo.headimg);
          localStorage.setItem('userId',userinfo.id);
          localStorage.setItem('corpid', userinfo.corpid);
          localStorage.setItem('corpName', userinfo.Corp.corp_name);
          window.userInfo = userinfo;
          setTimeout(() => {
            // self.$router.push('/notice');
            self.$router.push('/noticenew');
          }, 1000);
        }
      }
    },
    async bundleInfo(){//绑定用户信息
      let self = this;
      let coroid = localStorage.getItem("corpid");
      let res = await self.$axios.post('/auth/web/register', {fullname: self.username, mobile: self.mobile, verifyCode: self.code,coroid: coroid })
      let userinfo = res
      // console.log(res.data)
      

      if(!res.errorCode){
        let user_info = await self.$axios.get('auth/user/detail')
        localStorage.setItem("userInfo", JSON.stringify(user_info))
        localStorage.setItem('fullname', userinfo.fullname);
        localStorage.setItem('userimg', userinfo.headimg);
        localStorage.setItem('userId', userinfo.id);        
        localStorage.setItem('corpid', userinfo.corpid);
        localStorage.setItem('corpName', user_info.Corp.corp_name);

        window.userInfo = userinfo;
        setTimeout(() => {
          // self.$router.push('/notice');
          self.$router.push('/noticenew');
        }, 1000);
        
      }
      
      console.log(res);
    },
    async selectCorp(corpid){
      //手机验证码登录后，选择人员
      let self = this;
      let res = await self.$axios.post('/auth/user/verifyauth', { mobile: self.mobile, verifyCode: self.code, corpid: corpid})
      console.log(res);
      if (res.status == "error") {
        self.loginError = '验证码错误';
        setTimeout(()=>{
          self.loginError = '';
        },3000)
      }else{
          localStorage.setItem('token_value', res.token);
          console.log('local token is ', localStorage.getItem('token_value'));
          Axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem("token_value");
          let userinfo = res.userinfo;
          let user_info = await self.$axios.get('auth/user/detail')
          console.log(userinfo)
          localStorage.setItem("userInfo", JSON.stringify(user_info))
          localStorage.setItem('fullname', userinfo.fullname);
          localStorage.setItem('userimg', userinfo.headimg);
          localStorage.setItem('userId', userinfo.id);          
          localStorage.setItem('corpid', userinfo.corpid);
          localStorage.setItem('corpName', userinfo.Corp.corp_name)
          setTimeout(() => {
            // self.$router.push('/notice');
            self.$router.push('/noticenew');
          }, 1000);
          window.userInfo = user_info;
        
      }
      
    }
  }
}
</script>

<style>
.control-label{
  line-height: 22px;
}
.bgimg {
  background-image: url('/static/img/login-bg.jpg');
  background-size: 100% 100%;
}
.form-control{
  padding: 0 0 0 10px;
}
.card {
  border: 0;
  border-radius: 0;
  -webkit-transition: .5s;
  transition: .5s;
  background-color: rgba(255, 255, 255, 0.8);
  width: 350px !important;
  /* height: 325px !important; */
  -webkit-box-shadow: 0 1px 25px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  background-color: transparent 0.8;
  position: relative;
}

.corp-slect {
  border: 0;
  border-radius: 0;
  -webkit-transition: .5s;
  transition: .5s;
  background-color: rgba(255, 255, 255, 0.8);
  width: 350px !important;
  -webkit-box-shadow: 0 1px 25px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  background-color: transparent 0.8;
  position: relative;
}

.corp-slect a {
  cursor: pointer;
}

.ewmdiv {
  height: 100%;
  text-align: center;
  padding: 20px;
}

.loadingimg {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  background-color: white;
  margin: 35px 75px;
  opacity: .9;
}

.landingsuccess {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  height: 200px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.9);
}

.landingsuccess>span {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.toggleLogin {
  cursor: pointer;
}

.toggleLogin>i.pull-left {
  line-height: 1.428571429
}
.modal-dialog {  
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
    width: 300px;
    height: 500px;  
}  

.btn-info[disabled],
.btn-info[disabled]:hover,
.btn-info[disabled]:focus,
.btn-info[disabled]:active,
.btn-info[disabled].active,
fieldset[disabled] .btn-info:active,
fieldset[disabled] .btn-info.active {
  background-color: #ccc;
  border-color: #ccc;
}
.btn:active,
.btn.active {
  background-image: none;
  outline: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.btn-info {
  color: #fff;
  background-color: #6CC5A5;
}
.btn-info:focus,
.btn-info.focus {
  color: #fff;
  background-color: #6CC5A5;
}
.btn-info:hover {
  color: #fff;
  background-color: #58a1f3;
}
.btn-info:active {
  color: #fff;
  background-color: #6CC5A5;
}
</style>
