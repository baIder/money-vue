<template>
    <label class="notes">
        <span class="name">备注</span>
        <input v-model="value" type="text" placeholder="在这里输入备注">
    </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
    value = '';
    @Watch('value')
    onValueChanged(value: string) {
        this.$emit('update:value', value);
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.notes {
    background: #f5f5f5;
    display: block;
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;

    .name {
        padding-right: 16px;
    }

    input {
        height: 64px;
        flex-grow: 1;
        background: transparent;
        border: none;
        padding-right: 16px;
    }
}
</style>