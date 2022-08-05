<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清除</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="OK">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop() readonly value!: number;

  mounted() {
    this.output = this.value.toString();
  }

  output = '0';

  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const input = button.textContent!;
    if (this.output.length === 16) {
      return;
    }
    if (
        this.output.indexOf('.') === this.output.length - 3 &&
        this.output.indexOf('.') >= 0
    ) {
      return;
    } //只能输入两位小数
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  ok() {
    this.$emit('update:value', parseFloat(this.output));
    this.$emit('submit', this.output);
    this.output = '0';
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.numberPad {
  .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }

  .buttons {
    @extend %clearfix;
    background: #f5f5f5;

    > button {
      padding: 1px;
      transition: all 20ms;
      box-shadow: 0 0 2px $color-shadow;
      font-size: 24px;

      &:active {
        transform: scale(0.95);
        background: lighten(#6ca280, 20%) !important;
      }

      width: calc(25% - 4px);
      height: 61px;
      float: left;
      background: transparent;
      border: none;
      margin: 2px;
      border-radius: 4px;

      &.OK {
        height: 126px;
        float: right;
      }

      &.zero {
        width: calc(50% - 4px);
      }

      &:nth-child(4), &:nth-child(8) {
        font-size: 20px;
      }

      &:nth-child(1) {
        background: $color-button-bg;
      }

      &:nth-child(2),
      &:nth-child(5) {
        background: darken($color-button-bg, 4%);
      }

      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($color-button-bg, 8%);
      }

      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($color-button-bg, 12%);
      }

      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($color-button-bg, 16%);
      }

      &:nth-child(12) {
        background: darken($color-button-bg, 24%);
      }

      &:nth-child(14) {
        background: darken($color-button-bg, 20%);
      }
    }
  }
}
</style>
