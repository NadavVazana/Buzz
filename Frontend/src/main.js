import { createApp } from 'vue'
import router from './router'
import App from '../App.vue'
import {ObserveVisibility} from 'vue-observe-visibility';
import './assets/style.scss'
import store from './store';




const app = createApp(App)
app.use(router)
app.directive('observe-visibility', {
    beforeMount: (el, binding, vnode) => {
      vnode.context = binding.instance;
      ObserveVisibility.bind(el, binding, vnode);
    },
    update: ObserveVisibility.update,
    unmounted: ObserveVisibility.unbind,
  });
app.component('observe-visibility', ObserveVisibility)




app.use(store)
app.mount('#app')
