<template>
  <nav>
    <router-link to="/labels" class="item" active-class="selected">
      <svg class="icon">
        <use href="#bookmark-one"></use>
      </svg>
      <span class="text">
      标签
      </span>
    </router-link>

    <router-link to="/money" class="item" active-class="selected">
      <svg class="icon">
        <use href="#consume"></use>
      </svg>
      <span class="text">
      记账
      </span>
    </router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <svg class="icon">
        <use href="#analysis"></use>
      </svg>
      <span class="text">
      统计
      </span>
    </router-link>
    <div class="indicator"></div>
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
  height: 50px;

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

  //> .indicator {
  //  position: fixed;
  //  //top: 90%;
  //  left: 30px;
  //  width: 70px;
  //  height: 70px;
  //  background: #d2ebcd;
  //  border-radius: 50%;
  //  border: 6px solid var(--clr);
  //  transition: all 250ms;
  //  z-index: 1;
  //
  //
  //  &::before {
  //    content: '';
  //    position: absolute;
  //    top: 50%;
  //    left: -22px;
  //    width: 20px;
  //    height: 20px;
  //    background: transparent;
  //    border-top-right-radius: 20px;
  //    box-shadow: 1px -10px 0 0 var(--clr);
  //  }
  //
  //  &::after {
  //    content: '';
  //    position: absolute;
  //    top: 50%;
  //    right: -22px;
  //    width: 20px;
  //    height: 20px;
  //    background: transparent;
  //    border-top-left-radius: 20px;
  //    box-shadow: -1px -10px 0 0 var(--clr);
  //  }
  //}


  //> .item {
  //  z-index: 2;
  //  position: relative;
  //  display: flex;
  //  justify-content: center;
  //  align-items: center;
  //  flex-direction: column;
  //  width: 100%;
  //  text-align: center;
  //  font-weight: 500;
  //
  //  transition: all 250ms;
  //
  //  > .icon {
  //    position: relative;
  //    display: block;
  //    line-height: 75px;
  //    font-size: 1.5em;
  //    text-align: center;
  //    transition: 250ms;
  //    color: var(--clr);
  //  }
  //
  //  > .text {
  //    position: absolute;
  //    color: var(--clr);
  //    font-weight: 400;
  //    font-size: 0.75em;
  //    letter-spacing: 0.05em;
  //    transition: 250ms;
  //    opacity: 0;
  //    transform: translateY(20px);
  //  }
  //
  //  &.selected {
  //    > .icon {
  //      transform: translateY(-32px);
  //    }
  //
  //    > .text {
  //      opacity: 1;
  //      transform: translateY(10px);
  //    }
  //  }
  //
  //
  //  &:nth-child(1).selected ~ .indicator {
  //    transform: translateX(calc(70px * 0));
  //  }
  //
  //  &:nth-child(2).selected ~ .indicator {
  //    transform: translateX(130px);
  //  }
  //
  //  &:nth-child(3).selected ~ .indicator {
  //    transform: translateX(260px);
  //  }
  //}


}
</style>