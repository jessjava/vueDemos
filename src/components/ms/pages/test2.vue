<template>
  <div>
   it's test2 Page
   <br>

   <p style="font-size:16px;">
       <router-link to="/ttt"> back test MainPage</router-link>
   </p>
  </div>
</template>

<script>
export default {
  name: 'test'
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
</style>
