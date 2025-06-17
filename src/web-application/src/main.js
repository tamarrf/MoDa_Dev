import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import store from './store'
import {
    HID_ONCONNECT,
    HID_ONDISCONNECT,
    HID_ONERROR,
    HID_ONINPUTREPORT,
} from './store/mutation-types'
  
const mutations = {
    HID_ONCONNECT,
    HID_ONDISCONNECT,
    HID_ONERROR,
    HID_ONINPUTREPORT,
}
import HIDDevice from './plugins/webhid-plugin/hid-devices'
import { CONST } from '@/store/const'

Vue.config.productionTip = false;
// Add unimported components to ignore list to prevent warnings.
Vue.config.ignoredElements = ['field', 'block', 'category', 'xml', 'mutation', 'value', 'sep'];
Vue.prototype.$hidCompatible = true;
Vue.use(VueResource)
try {
    Vue.use(HIDDevice, {
        hid_vid: CONST.hid_vid,
        hid_pid: CONST.hid_pid,
      }, {
        store: store,
        mutations: mutations,
        format: "json",
    })
  }
catch (error) {
    Vue.prototype.$hidCompatible = false;
//     console.log(error);
//     // expected output: ReferenceError: nonExistentFunction is not defined
//     // Note - error messages will vary depending on browser
}


new Vue({
    store,
    render: h => h(App)
}).$mount('#app')

