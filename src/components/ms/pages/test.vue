<template>
  <div style="width:500px;height:320px;">
   <!-- it's test Page
   <br> -->

   <m-slide :list='list' :autoplay="true" :type="'transparent'" :option="true" :time="4000" :sildetype="'ease'"
    :arrowsize="'40,20'" :direction="'bottom'"></m-slide>
   <!-- <p style="font-size:16px;">
       <router-link to="/ttt/info"> test GO </router-link>
   </p> -->
  </div>
</template>

<script>

export default {
  name: 'test',
  data(){
      return{
          slide:"slide",
          left:"left",
          list:[
              {
                  src:'/static/img/bg.jpeg'
              },
              {
                  src:'/static/img/login-bg.jpg'
              }
          ]
      }
  }
}
</script>
<style>
    .options-area label{
        padding:0 10px;
        font-size:15px;
    }
    .options-area .select{
        min-width:80px;
    }


    body, ul, div, html {
        padding: 0;
        margin: 0;
    }

</style>
