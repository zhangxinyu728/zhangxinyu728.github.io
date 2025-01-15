<template>
  <div class="container">
      <MainNav />
      <router-view class="main-content"></router-view>
  </div>
</template>

<script>

import MainNav from "../components/MainNav"

export default {
  components:{
    MainNav
  }
}
</script>

<style scoped>

.container{
  
}

.main-content{
  margin-left: 210px;
  margin-top: 10px;
  margin-right: 10px;
}

</style>