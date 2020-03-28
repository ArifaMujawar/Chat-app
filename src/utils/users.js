const users=[];

const addUser=({id, username, room})=>{

  //clean the data
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  //validate the data
  if(!username || !room){
    return {
      error: 'Username and Room are required!'
    }
  }

  //Check for existing User
  const existingUser = users.find((user)=>{
    return user.room === room && user.username === username
  })

  //Validate Username
  if(existingUser){
    return {
      error: 'Username already exists!'
    }
  }

  //store user
  const user = {id, username, room}
  users.push(user)
  return {user}
}

const removeUser = (id) =>{
  const index =  users.findIndex((user)=> user.id === id )
  if(index !== -1){
    return users.splice(index, 1)[0]

  }
}

const getUsersInRoom = (room) => {
  if(!room){
    return {
      error: 'Room does not exist'
    }
  }
 return users.filter((user)=>user.room === room)
}

const getUser = (id) => {
return users.find((user)=>user.id === id)
}
module.exports= {
  getUser,
  getUsersInRoom,
  removeUser,
  addUser
}