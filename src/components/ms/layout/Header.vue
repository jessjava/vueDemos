<template>
<header class="header bg-white height-md">
  <section>
      <aside class="col-sm-4 col-md-4 col-lg-4">
        <div class="container">
             <!--  -->
            <!-- <img src="../../../assets/logo1.png"></img> -->
             <h3>智能机基础数据平台</h3>
    
          </div>
      </aside>
      <aside class="col-sm-8 col-md-8 col-lg-8" style="text-align:right;padding-top:3px;">
        <div class="nav-avatar pos-rlt pull-right"  :class="{'open':showmenu}">
            <ul class="nav navbar-nav" >
              <li class="dropdown">
                <a  class="dropdown-toggle"  @click="showmenu=!showmenu">
                  <span class="thumb-sm avatar pull-left m-t-n-xs m-r-xs">
                    <img src="../../../assets/logo.png"></img>
                  </span>
                  {{username}}
                </a>
              </li>
            </ul>
            <ul class="dropdown-menu m-t-sm" style="margin-top:0;" >
              <span class="arrow top"></span>
              <li>
                <a @click="logout"><i class="fa fa-power-off"></i>&nbsp; 退出登录</a>
              </li>
            </ul>
          </div>
      </aside>
  </section>
</header>
</template>

<script>
import { dropdown } from "vue-strap";
import Bus from "../../../bus.js";
export default {
  name: "header",
  components: {},
  data() {
    return {
      userFullName: "",
      userImg: "",
      showmenu: false,
      keyword: "",
      corpName: localStorage.getItem("corpName")
    };
  },
  created() {
    let self = this;
    if (!localStorage.getItem("token_value")) {
      // self.$router.push("/");
    }
  },
  computed: {
    username() {
      return localStorage.getItem("fullname");
    },
    userHeadImg() {
      return localStorage.getItem("userimg");
    }
  },
  methods: {
    goIndex() {
      this.$router.push("/");
    },
    // search() {
    //   let self = this;
    //   let currentRoute = self.$router.currentRoute.name
    //   switch (currentRoute) {
    //     case "homework":
    //       Bus.$emit('searchHomework', this.keyword);
    //       this.keyword = '';
    //       break;
    //     case "notice":
    //       Bus.$emit('searchNotice', this.keyword);
    //       this.keyword = '';
    //       break;
    //     default:
    //       //default
    //       break;
    //   }
    //   // Bus.$emit('search', this.keyword);
    // },
    search() {
      let self = this;
      self.$router.push({ path: "/search", query: { key: self.keyword } });
      Bus.$emit("searchList", self.keyword);
    },
    logout() {
      let self = this;
      localStorage.removeItem("token_value");
      localStorage.removeItem("fullname");
      localStorage.removeItem("userimg");
      localStorage.removeItem("userId");
      localStorage.removeItem("source_origin");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("user:deptinfo");
      self.$router.push("/");
    },
    
  }
};
</script>

<style scoped>
header {
  color:#5CB497;
  background: linear-gradient(90deg, #353F4F 5%, #3F4C64 90%);
  height: 70px;
}
.dropdown-menu {
  min-width: 110px;
  text-align: center;
}
.input-sm {
  border-radius: 15px;
}
</style>

