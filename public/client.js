const socket = io()
let name ;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message-area')
do{
   name =  prompt('Please Enter Your name to JOIN')
}while(!name)

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user : name,
        message : message.trim()
    }
//Append
appendMessage(msg,'outgoing')
textarea.value=''
scrollBottom()


//send to server
socket.emit('message' ,msg)
}


function appendMessage(msg , type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
    <h4> ${msg.user} </h4>
    <p> ${msg.message} </p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//RECEIVE THE MESSAGE :-

socket.on('message' , (msg) => {
    appendMessage(msg , 'incoming')
    scrollBottom()
})


function scrollBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}





