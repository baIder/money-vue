<template>
  <Layout>
    <div class="tags">
      <router-link
          class="tag"
          v-for="tag in tags"
          :key="tag.id"
          :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <svg class="icon">
          <use href="#right"></use>
        </svg>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import Button from '@/components/Button.vue';

@Component({Button})
export default class Labels extends Vue {
  tags = window.tagList;

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      window.createTag(name);
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

  > .tag {
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
    margin-top: 44px;
  }
}
</style>
