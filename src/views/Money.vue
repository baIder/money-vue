<template>
  <Layout prefixClass="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <div class="notesWrapper">
      <Notes
        fieldName="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/numberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import { Component, Watch } from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: { NumberPad, Tags, Notes, Types },
})
export default class Money extends Vue {
  tags = tagList;
  recordList = recordList;
  record: Recorditem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
  };
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    const record2 = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChanged() {
    recordListModel.save(this.recordList);
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
