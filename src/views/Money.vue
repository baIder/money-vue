<template>
  <Layout prefixClass="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="createAt">
      <FormItem
          fieldName="日期"
          placeholder="在这里输入日期"
          :value.sync="record.createdAt"
          type="date"
      />
    </div>
    <div class="notesWrapper">
      <FormItem
          fieldName="备注"
          placeholder="在这里输入备注"
          :value.sync="record.notes"
      />
    </div>
    <Tags @update:value="onSelectTag"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/numberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/FormItem.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';


@Component({components: {Tabs, NumberPad, Tags, FormItem}})
export default class Money extends Vue {
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
    createdAt: new Date().toISOString()
  };

  recordTypeList = recordTypeList;

  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  onSelectTag(value: []) {
    this.record.tags = value;
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
    this.record.notes = '';
    this.record.tags = [];
  }

}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notesWrapper {
  padding: 12px 0;
}
</style>
