const socket = io()

// socket.on('countUpdated', (count)=>{
//   console.log('The count has been updated!', count)
// }) 

// document.querySelector('#increment').addEventListener('click', ()=>{
//   console.log('clicked')
//   socket.emit('increment')
// })

socket.on('message', (message)=>{
  console.log(message)
})

document.querySelector('#submitButton').addEventListener('submit', (e)=>{
  e.preventDefault()
  const message = e.target.elements.message.value
  socket.emit('sendMessage', message, (error)=>{
    if(error){
      return console.log(error)
    }
    console.log('The message was delivered!')
  })
})

document.querySelector('#send-location').addEventListener('click', ()=>{
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser.')
  }
  navigator.geolocation.getCurrentPosition((position)=>{
    socket.emit('sendLocation',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, ()=>{
      console.log('location shared')
    })
  })
  
})