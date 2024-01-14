const socket=io('http://localhost:8000');

const form= document.getElementById('sendicon');
const messageImp= document.getElementById('messageI')
const messageContainer= document.querySelector(".container")

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('click',(e)=>{
    e.preventDefault();
    const message=messageImp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageImp.value='';
})

const name = prompt("Enter your name to join chat");
socket.emit('new-user-joined', name);

socket.on('user-joind', name =>{
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', data =>{
    append(`${name} left thhe chat`, 'left')
})