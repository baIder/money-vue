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
      <Button class="createTag" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import tagHelper from '@/minxins/TagHelper';

@Component({components: {Button}})
export default class Labels extends mixins(tagHelper) {
  beforeCreate() {
    this.$store.commit('fetchTags');
  }

  get tags() {
    return this.$store.state.tagList;
  }

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      this.$store.commit('createTag', name);
    } else {
      return window.alert('标签名不能为空');
    }
  }
}
</script>

<style lang="scss" scoped>

.tags {
  background: white;
  font-size: 16px;
  margin: 12px;
  border-radius: 8px;
  box-shadow: 0 0 3px grey;

  > .tag {
    padding-left: 16px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    &:last-child {
      border-bottom: none;
    }

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
