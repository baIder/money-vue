import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {

  //record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => {
    return recordListModel.create(record);
  },


  //tag store
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  tagList: tagListModel.fetch(),
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复了');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  findTag(id) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.tagList.find(t => t.id === id);
  },

};


export default store;