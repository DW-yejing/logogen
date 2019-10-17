<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body,
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  height: 100%;
  margin: 0;
  background-color: #000;
  color: #f90;
  font-family: Arial,Helvetica,sans-serif;
}
.description {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
<style lang="less" rel="stylesheet/less">
 @import './assets/style/font.css';
</style>
