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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
