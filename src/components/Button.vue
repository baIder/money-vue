<template>
  <button class="button">
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.button {
  background: $tabs-bg;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  box-shadow: 0 0 2px 1px #cdcdcd;
}
</style>
