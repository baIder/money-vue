<template>
  <Layout>
    <div class="content">
      <div class="topBar">
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      </div>
      <div class="recordWrapper">
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <h3 class="title">{{ group.title }}</h3>
            <ol>
              <li class="record" v-for="item in group.items" :key="item.id">
                <span>{{ tagString(item.tags) }}</span>
                <span class="notes">{{ item.notes }}</span>
                <span>￥{{ item.amount }}</span>
              </li>
            </ol>

          </li>
        </ol>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const {recordList} = this;
    //TODO
    // eslint-disable-next-line no-undef
    type HashTableValue = { title: string, items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  width: 100vw;

  > .topBar {
    border: 1px solid blue;
  }

  > .recordWrapper {
    border: 1px solid red;
    flex-grow: 1;
    overflow: hidden;
  }
}


::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
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


.record {
  @extend %item;
  background: white;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 8px;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}

</style>