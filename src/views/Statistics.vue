<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="chartWrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>

      </li>
    </ol>
    <div v-else class="noResultWrapper">
      <router-link to="/money" class="noResult">
        快来记第一笔账叭！
      </router-link>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import * as echarts from 'echarts';
import _ from 'lodash';

type EChartsOption = echarts.EChartsOption;

@Component({
  components: {Tabs, Chart}
})
export default class Statistics extends Vue {
  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get chartArray() {
    const today = new Date();
    const array = [];
    for (let i = 29; i >= 0; i--) {
      const dateString = dayjs(today).subtract(i, 'day');
      const found = _.find(this.groupedList, {title: dateString.format('YYYY-MM-DD')});
      if (found) {
        if (found.total) {
          array.push({key: dateString.format('M-D'), value: found.total});
        }
      } else {
        array.push({key: dateString.format('M-D'), value: 0});
      }
    }
    return array;
  }

  get chartOptions() {
    const keys = this.chartArray.map(i => i.key);
    const values = this.chartArray.map(i => i.value);
    const chartOptions: EChartsOption = {
      height: 100,
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: '#5470C6'
          }
        },
        data: keys
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      tooltip: {
        show: true,
        triggerOn: 'click',
        formatter: '￥{c}',
        position: 'top',
        extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);',
      },
      series: [
        {
          symbolSize: 8,
          // symbol: 'image://https://img.bald3r.wang/img/钱.svg',
          itemStyle: {
            borderWidth: 1,
            color: '#5470C6'
          },
          data: values,
          type: 'line'
        }
      ]
    };
    return chartOptions;
  }

  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }

  get groupedList() {
    const {recordList} = this;
    if (recordList.length === 0) {return [];}
    const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [];}
    // eslint-disable-next-line no-undef
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  beautify(date: string) {
    const day = dayjs(date);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";


.chartWrapper {
  overflow-x: auto;
  overflow-y: hidden;
  height: 200px;
  z-index: 10;

  > .chart {
    width: 400%;
  }

}

.noResultWrapper {
  display: flex;
  justify-content: center;

  > .noResult {
    display: inline-block;
    padding-top: 32px;
    text-align: center;
    color: $color-noResult;
    border-bottom: 1px solid $color-noResult;
  }
}


::v-deep {
  .type-tabs {
    z-index: 1;
  }

  .type-tabs-item {
    background: #c4c4c4;

    &.selected {
      background: white;
      z-index: 10;

      &::after {
        top: 0;
      }
    }
  }

}

%item {
  line-height: 24px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

li ol {
  margin: 12px;
  border-radius: 8px;
  box-shadow: 0 0 3px grey;
  background: white;
}

.record {
  @extend %item;
  border-bottom: 1px solid #e6e6e6;

  &:last-child {
    border-bottom: none;
  }
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}


</style>