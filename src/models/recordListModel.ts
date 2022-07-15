const localStorageKeyName = 'recordList';
const recordListModel = {
  data:[] as Recorditem[],
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || '[]'
    ) as Recorditem[];
    return this.data
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  clone(data: Recorditem[] | Recorditem) {
    return JSON.parse(JSON.stringify(data));
  },
};

export default recordListModel;
