<template>
  <nav>

    <router-link to="/labels" class="item" active-class="selected">
      <svg class="icon">
        <use href="#bookmark-one"></use>
      </svg>
      标签
    </router-link>

    <router-link to="/money" class="item" active-class="selected">
      <svg class="icon">
        <use href="#consume"></use>
      </svg>
      记账
    </router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <svg class="icon">
        <use href="#analysis"></use>
      </svg>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">

export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  padding: 5px 3px 0 0;
  font-size: 12px;

  > .item {
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2px 0;

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.selected {
    color: $color-highlight;
  }

  a {
    font-weight: bold;
  }

}
</style>