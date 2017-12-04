<template>
  <section class="vbox stretch">
    <AppHeader/>
    <section style="top:70px">
      <section class="hbox stretch">
        <AppAside/>
        <div class="main-content">
           <transition name="fade">
            <router-view></router-view>
           </transition>
        </div>
      </section>
    </section>

  </section>
</template>

<script>
import AppHeader from './Header'
import AppAside from './Aside'

export default {
  name: 'mslayout',
  components: {
    AppHeader,
    AppAside
  }
}
</script>
<style>
  .main-content{
    overflow: auto;
    height: 100%;
    width: 100%;
    padding:20px;
  }
</style>
