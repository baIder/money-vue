<template>
    <Layout prefixClass="layout">
        <NumberPad />
        <Types />
        <Notes />
        <Tags :dataSource.sync="tags" />

    </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/numberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
export default {
    name: "Money",
    components: { NumberPad, Tags, Notes, Types },
    data() {
        return {
            tags: ['衣', '食', '住', '行'],
        };
    }

};
</script>

<style lang="scss">
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}
</style>

