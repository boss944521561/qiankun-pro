<template>
  <div class="vue2_container">
    sdfsfd
    <div id="echarts_vue2"></div>
  </div>
</template>

<script>
import { echarts_vue2 } from '~/echarts/echarts_vue2';

export default {
  name: 'About',
  setup() {},
  mounted(){
    echarts_vue2()
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
  .vue2_container{
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
    #echarts_vue2 {
        width: 100%;
        height: 400px;
    }
  }
</style>
