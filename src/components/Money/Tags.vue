<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li
          v-for="tag in tagList"
          :key="tag.id"
          :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
          @click="toggle(tag)"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import tagHelper from '@/minxins/TagHelper';
import {mixins} from 'vue-class-component';

@Component
export default class Tags extends mixins(tagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.tags {
  background: linear-gradient(315deg, rgba(234, 242, 213, 1) 0%, rgba(192, 215, 129, 1) 100%);
  font-size: 14px;
  padding: 16px;
  margin: 8px;
  border-radius: 4px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  box-shadow: 0 0 3px $color-shadow;

  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    padding: 2px;

    > li {
      //$bg: #d9d9d9;
      background: $tabs-bg;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      padding: 0 20px;
      //margin-right: 12px;
      //margin-top: 4px;
      margin: 4px 12px 4px 0px;
      box-shadow: 0 0 2px grey;

      &.selected {
        background: lighten($color-highlight, 20%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: $color-font;
      padding: 0 4px;
    }
  }
}
</style>
