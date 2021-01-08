<template>
  <div class="vue1_container">
    <div id="echarts_vue1"></div>
  </div>
</template>

<script>
import { echarts_vue1 } from './components/echarts';

export default {
  name: 'Home',
  setup() {},
  mounted(){
    echarts_vue1()
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
  .vue1_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    min-width: 900px;
    padding: 100px;
    #echarts_vue1 {
        width: 100%;
        height: 400px;
    }
  }
</style>
