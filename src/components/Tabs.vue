<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li class="tabs-item" v-for="item in dataSource" :key="item.value"
        :class="liClass(item)" @click="select(item)">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string, value: string }
@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
  @Prop() readonly value!: string;
  @Prop(String) classPrefix?: string;

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }

  liClass(item: DataSourceItem) {
    return {
      selected: item.value === this.value,
      [this.classPrefix + '-tabs-item']: this.classPrefix
    };
  }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.tabs {
  background: $tabs-bg;
  display: flex;
  text-align: center;
  font-size: 24px;
  box-shadow: 0 0 4px $color-shadow;

  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: $color-highlight;
    }
  }
}
</style>