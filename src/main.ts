import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/defaultLayout.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.tagList = tagListModel.fetch();
window.createTag = (name) => {
  const message = tagListModel.create(name);
  if (message === 'duplicated') {
    window.alert('标签名重复了');
  }
};
window.removeTag = (id) => {
  return tagListModel.remove(id);
};
window.updateTag = (id, name) => {
  return tagListModel.update(id, name);
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.findTag = (id) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return window.tagList.find(t => t.id === id);
};


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
