import io from 'socket.io-client'

const socket = io('https://localhost/socket')
socket.on('msg', msg => {
  console.log(msg)
})
