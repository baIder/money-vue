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
      <Notes :value="tag.name" @update:value="update" fieldName="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="buttonWrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Notes, Button},
})
export default class EditLabel extends Vue {
  tag?: { id: string; name: string } = undefined;

  created() {
    this.tag = window.findTag(this.$route.params.id);
    if (!this.tag) {
      console.log('tag does not exist');
      // this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      window.updateTag(this.tag.id, name);
    }
  }

  remove() {
    if (this.tag) {
      if (window.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert('删除失败');
      }
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
}
</style>
