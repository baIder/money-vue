<template>
  <div class="wrapper" ref="wrapper">chart</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartsOption;

  @Watch('options', {immediate: true})
  onOptionsChanged(newValue: EChartsOption) {
    //第一次加载图表的时候还未挂载，因此echarts.init(this.$refs.wrapper as HTMLDivElement)为undefined，通过setTimeout来进行第一次渲染
    setTimeout(() => {
      echarts.init(this.$refs.wrapper as HTMLDivElement).setOption(newValue);
    }, 0);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}

</style>