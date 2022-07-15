declare type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};
declare type Tag = {
  id: string;
  name: string;
};
declare type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; //联合类型   字符串子类型
  save: () => void;
  update: (id: string, name: string) => 'success' | 'not_found' | 'duplicated';
  remove: (id: string) => boolean;
};

declare interface Window {
  tagList: Tag;
}