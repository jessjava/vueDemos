<template>
<aside class="bg-white aside-custom only-icon b-r" :class="{'nav-vertical':toggle,'nav-off-screen':showaside}">
      <section class="vbox">
        <section>
          <ul class="nav nav-pills nav-stacked">
            <li v-for="(nav,index) in navList" role="presentation" :class="onRoutes==nav.path?'active':''">  
              
              <router-link :to="{path:nav.path}">
                {{nav.name}}<span class="glyphicon glyphicon-chevron-right" style="float:right;"></span>
              </router-link>
            </li>
          </ul>
        </section>
      </section>
    </aside>
</template>

<script>
// import Bus from '../../../bus.js';
export default {
  name: 'aside',
  components: {},
  computed:{
      onRoutes(){
          //console.log(this.$route.path);
          console.log('/'+this.$route.path.substring(1).split("/")[0])
          return '/'+this.$route.path.substring(1).split("/")[0];
      }
  },
  data(){
    return{
      navList:[
        {
          name:"18位渠道号管理",
          path:"/18admin"
        },{
          name:"合同录入",
          path:"/ttt"
        },{
          name:"游戏信息管理",
          path:""
        },{
          name:"主渠道信息管理",
          path:""
        },{
          name:"子渠道信息管理",
          path:""
        },{
          name:"支付方式",
          path:""
        },{
          name:"我方主题信息",
          path:""
        },{
          name:"签署人信息",
          path:""
        },{
          name:"商品信息管理",
          path:""
        },{
          name:"游戏道具管理",
          path:""
        },{
          name:"区服管理",
          path:""
        },{
          name:"基础配置信息",
          path:""
        },{
          name:"汇率管理",
          path:""
        }
      ],
      toggle:false,
      showaside:false,
      routeName:'',
    }
  },
  methods:{
    logout(){
      let self = this;
      localStorage.removeItem('token_value');
      self.$router.push('/');
    }
  }
}
</script>
<style scoped>
  aside{
    width: 180px;
  }

  .nav > li >a{
    padding:15px;
  }

  .nav > li.active{
    background-color: #3F4C64;
    text-shadow: none;
  }
 

  .nav > li.active > a {
    background-color: transparent !important;
    text-shadow: none;
  }
  .nav-pills > li.active > a {
    color:#5CB497;
  }
</style>

