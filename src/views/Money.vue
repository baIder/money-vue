<template>
    <Layout prefixClass="layout">
        {{ record }}
        <NumberPad :value.sync="record.amount" />
        <Types :value.sync="record.type" />
        <Notes @update:value="onUpdateNotes" />
        <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />

    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/numberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import { Component } from "vue-property-decorator";

type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
};

@Component({
    components: { NumberPad, Tags, Notes, Types }
})
export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];
    record: Record = {
        tags: [],
        notes: '',
        type: '-',
        amount: 100,
    };
    onUpdateTags(value: string[]) {
        this.record.tags = value;
    }
    onUpdateNotes(value: string) {
        this.record.notes = value;
    }
}
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>

