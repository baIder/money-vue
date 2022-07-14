<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag">
        <span>{{ tag }}</span>
        <svg class="icon"><use href="#right"></use></svg>
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

tagListModel.fetch();
@Component
export default class Labels extends Vue {
  tags = tagListModel.data;
  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名重复了');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '~@/assets/style/helper.scss';

.tags {
  background: white;
  font-size: 16px;
  margin: 12px;
  border-radius: 8px;
  > li {
    padding-left: 16px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    > .icon {
      width: 1.5em;
      height: 1.5em;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    padding: 16px;
    text-align: center;
    margin-top: 28px;
  }
}
</style>
