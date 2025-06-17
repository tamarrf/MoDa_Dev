import Emitter from './emitter'

export default class {
    constructor(device_id = {}, device_opts = {}) {
        this.format = device_opts.format && device_opts.format.toLowerCase()

        this.device = null
        this.deviceId = device_id
        this.deviceOpts = device_opts

        this.connectionStatus = false

        this.passToStoreHandler = this.deviceOpts.passToStoreHandler || false

        //? pass user store and muations to used in class plugin
        if (device_opts.store) { this.store = device_opts.store }
        if (device_opts.mutations) { this.mutations = device_opts.mutations }

        this.registerConnectionEvent()
        this.connectManually(device_id, false)
    }

    async openDevice() {
        if (!this.device.opened) {
            await this.device.open()
        }
        //? set prototype instance
        this.deviceOpts.$setInstance(this.device)

        //? starting event handler but its register after connected so `onconnect` is not firing
        this.registerUserEvent()
        this.device.onconnect(this.device)
        this.connectionStatus = true
    }

    async closeDevice() {
        if (this.device.opened) {
            await this.device.close()
        }
        this.device.ondisconnect(this.device)
        this.connectionStatus = false

        //? set prototype instance
        this.deviceOpts.$setInstance(null)
        this.device = null
    }

    async connectManually(device_id, isUserPrompt = true) {
        const vendorId = device_id.hid_vid;
        const productId = device_id.hid_pid;

        let devices = await navigator.hid.getDevices();
        if (!devices.length && isUserPrompt) {
            devices = await navigator.hid.requestDevice({
                filters: [{ vendorId, productId }],
            });
        }
        if (devices.length > 1) {
            devices.forEach(device => {
                if (device.collections.length) {
                    this.device = device
                }
            });
        }
        else {
            this.device = devices[0];
        }
        if (!this.device) return;

        await this.openDevice()
        return this.device;
    }

    registerConnectionEvent() {
        ['connect', 'disconnect'].forEach((eventType) => {
            navigator.hid.addEventListener(eventType, async ({ device }) => {
                if (device.collections.length) {
                    if (eventType === 'connect') {
                        this.device = device
                        await this.openDevice()
                    }
                    else if (eventType === 'disconnect') {
                        await this.closeDevice()
                    }
                }
            })
        })
    }

    registerUserEvent() {
        ['oninputreport', 'onconnect', 'ondisconnect'].forEach((eventType) => {
            this.device[eventType] = (event) => {
                Emitter.emit(eventType, event)

                if (this.store) { this.passToStore('HID_' + eventType, event) }
            }
        })
    }

    passToStore(eventName, event) {
        if (this.passToStoreHandler) {
            this.passToStoreHandler(eventName, event, this.defaultPassToStore.bind(this))
        } else {
            this.defaultPassToStore(eventName, event)
        }
    }

    defaultPassToStore(eventName, event) {
        if (!eventName.startsWith('HID_')) { return }
        let method = 'commit'
        let target = eventName.toUpperCase()
        let msg = event
        if (this.format === 'json' && event.data) {
            msg = JSON.parse(JSON.stringify(Array.from(new Uint8Array(event.data.buffer))))
            if (msg.mutation) {
                target = [msg.namespace || '', msg.mutation].filter((e) => !!e).join('/')
            } else if (msg.action) {
                method = 'dispatch'
                target = [msg.namespace || '', msg.action].filter((e) => !!e).join('/')
            }
        }
        if (this.mutations) {
            target = this.mutations[target] || target
        }
        this.store[method](target, msg)
    }
}