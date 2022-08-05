<template>
  <Layout>
    <div class="navBar">
      <svg class="icon" @click="goBack">
        <use href="#left"></use>
      </svg>
      <span class="title">编辑标签</span>
      <span class="right"></span>
    </div>
    <div class="notesWrapper">
      <FormItem :value="currentTag.name" @update:value="update" fieldName="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="buttonWrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({components: {FormItem, Button}})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', id);
    if (!this.currentTag) {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.currentTag) {
      this.$store.commit('updateTag', {id: this.currentTag.id, name});
    }
  }

  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag', this.currentTag.id);
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .icon {
    width: 24px;
    height: 24px;
  }

  > .right {
    width: 24px;
    height: 24px;
  }
}

.notesWrapper {
  background: white;
  margin-top: 8px;
}

.buttonWrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44px;

  > Button {
    background: #d7000f;
  }
}
</style>
