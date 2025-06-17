const SOCKET_ONOPEN = '✅ Socket connected!'
const SOCKET_ONCLOSE = '❌ Socket disconnected!'
const SOCKET_ONERROR = '❌ Socket Error!!!'
const SOCKET_ONMESSAGE = 'Websocket message received'
const SOCKET_RECONNECT = 'Websocket reconnected'
const SOCKET_RECONNECT_ERROR = 'Websocket is having issues reconnecting..'

const HID_ONCONNECT = '✅ WebHID connected!'
const HID_ONDISCONNECT = '❌ WebHID disconnected!'
const HID_ONERROR = '❌ WebHID Error!!!'
const HID_ONINPUTREPORT = 'WebHID message received'

export {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR,

  HID_ONCONNECT,
  HID_ONDISCONNECT,
  HID_ONERROR,
  HID_ONINPUTREPORT,
}