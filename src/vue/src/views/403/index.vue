<template>
  <div class="noAccess_container">
    <h2 class="title">403</h2>
    <button class="btn" @click="handleGoto('/')">
    没权限啊，咋混的
    </button>
  </div>
</template>

<script>
export default {
  name: '403',
  setup() {},
  methods: {
    handleGoto(path){
      this.$router.push(path);
    },
  },
};
</script>

<style scoped lang="less">
.noAccess_container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 20%;
  margin: auto;
  .title{
    margin-bottom: 20px;
    font-size: 50px;
  }
  .btn {
    height: 50px;
    font-size: 16px;
    letter-spacing: 2px;
    color: #fff;
    background-color: #3f51b5;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    padding: 6px 16px;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #303f9f;
  }
}
</style>
