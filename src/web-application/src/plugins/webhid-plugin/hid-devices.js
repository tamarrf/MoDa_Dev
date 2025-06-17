import Observer from './observer'
// import Emitter from './emitter'

export default {
    install(Vue, hid_id, hid_opts = {}) {
        let observer = null

        hid_opts.$setInstance = (hidInstance) => {
            if (hidInstance)
                Vue.prototype.$webhid = hidInstance
            else
                if (Vue.prototype.$webhid) delete Vue.prototype.$webhid
        }

        observer = new Observer(hid_id, hid_opts)
        Vue.prototype.$webhid = observer.device

        Vue.prototype.$webhidConnect = (device_id = hid_id, device_opts = hid_opts) => {
            device_opts.$setInstance = hid_opts.$setInstance
            if (observer) {
                observer.connectManually(device_id)
            }
            else {
                observer = new Observer(device_id, device_opts)
                observer.connectManually(device_id)
            }
        }

        Vue.prototype.$webhidDisconnect = () => {
            if (observer) {
                observer.closeDevice()
                if (Vue.prototype.$webhid) delete Vue.prototype.$webhid
            }
        }
    }
}