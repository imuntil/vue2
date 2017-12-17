import io from 'socket.io-client'

export default ({ store }) => {
  const socket = io('https://localhost/socket')
  socket.on('msg', msg => {
    console.log(msg)
  })
// 新的待发货订单
  socket.on('new-order', msg => {
    console.log(msg)
  })
}
