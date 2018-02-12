import io from 'socket.io-client'
import { order } from '~/assets/lib/constant'

export default ({ store }) => {
  const socket = io('https://imuntil.com/socket')
  socket.on('msg', msg => {
    console.log(msg)
    if (msg && msg.count !== undefined) {
      store.commit({
        type: `order/${order.SET_TO_BE_DELEVERED}`,
        count: msg.count
      })
    }
  })
// 新的待发货订单
  socket.on('new-order', msg => {
    store.dispatch({
      type: `order/${order.REMIND_NEW_ORDER}`
    })
  })
}
