const localStorageKeyName = 'recordList';
const model = {
  fetch() {
    return JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || '[]'
    ) as Recorditem[];
  },
  save(data: Recorditem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
  clone(data: Recorditem[] | Recorditem) {
    return JSON.parse(JSON.stringify(data));
  },
};

export default model;
