<template>
    <Layout prefixClass="layout">
        {{ recordList }}
        <NumberPad :value.sync="record.amount" @submit="saveRecord" />
        <Types :value.sync="record.type" />
        <Notes @update:value="onUpdateNotes" />
        <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />

    </Layout>
</template>

<script lang="ts">
import Vue, { readonly } from "vue";
import NumberPad from "@/components/Money/numberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import { Component, Watch } from "vue-property-decorator";


// const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
// const version = window.localStorage.getItem('version') || '0';
// if (version === '1.0') {
//     //数据迁移
//     recordList.forEach(record => {
//         record.createdAt = new Date(2022, 1, 1);
//     });
//     window.localStorage.setItem('recordList', JSON.stringify(recordList));
// }
// window.localStorage.setItem('version', '2.0');

type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
};

@Component({
    components: { NumberPad, Tags, Notes, Types }
})
export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    record: Record = {
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
        const record2: Record = JSON.parse(JSON.stringify(this.record));
        record2.createdAt = new Date();
        this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordListChanged() {
        window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
    }

}
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>

