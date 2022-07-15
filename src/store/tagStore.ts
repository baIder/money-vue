import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || '[]'
    );
    return this.tagList;
  },
  createTag(name: string) {
    const names = this.tagList.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复了');
      return;
    }
    const id = createId().toString();
    this.tagList.push({id, name});
    this.saveTags();
    return 'success';
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.tagList.find(item => item.id === id);
        if (tag !== undefined) {tag.name = name;}
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not_found';
    }
  },
  findTag(id: string) {
    return this.tagList.find(t => t.id === id);
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },
};

tagStore.fetchTags();

export default tagStore;