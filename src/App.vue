<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '~@/assets/style/helper.scss';
@import '~@/assets/style/reset.scss';

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-font;
  line-height: 1.5;
  font-family: $font-hei;
  font-size: 16px;
  background: $color-background;
}

#app {
  max-width: 500px;
  margin: 0 auto;
}

</style>
