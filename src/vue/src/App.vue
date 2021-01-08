<template>
  <router-view/>
</template>

<script>
export default {
  // beforeRouteUpdate (to, from, next) {
  //   // react to route changes...
  //   // don't forget to call next()
  //   console.log(77777,to, from, next)
  // },
  // watch: {
  //   $route(to, from) {
  //     // 对路由变化作出响应...
  //     console.log(888888,to)
  //     console.log(99999999,from)
  //   }
  // }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
