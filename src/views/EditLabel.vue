<template>
  <Layout>
    <div>
      <svg class="icon">
        <use href="#left"></use>
      </svg>
      <span>编辑标签</span>
    </div>
    <Notes fieldName="标签名" placeholder="请输入标签名" />
    <Button>删除标签</Button>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import Notes from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue';

@Component({
  components: { Notes, Button },
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.find((t) => t.id === id);
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404');
    }
  }
}
</script>

<style lang="scss" scoped></style>
