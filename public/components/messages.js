const chatBox = document.querySelector('.chatBox');

/**
 * Builds normal messages in the chatroom
 */
const buildMessages = (userId, userName, content, userImg) => {
    const currentUserId = firebase.auth().currentUser.uid

    const divMessage = document.createElement('div');
    divMessage.className = 'message';
    if (userId === currentUserId) divMessage.classList.add('mine');
    chatBox.appendChild(divMessage);

    const img = document.createElement('img');
    if(userImg) img.src = userImg;
    else img.src = 'img/default.png';
    divMessage.appendChild(img);

    const messageBubble = document.createElement('div');
    messageBubble.className = 'messageBubble';
    divMessage.appendChild(messageBubble);

    if(userId !== currentUserId) {
        const author = document.createElement('div');
        author.className = 'author';
        author.innerText = userName;
        messageBubble.appendChild(author);
    }

    const text = document.createElement('div');
    text.className = 'textBalloon';
    text.innerText = content;
    messageBubble.appendChild(text);
}


/**
 * Builds the notification messages in the chatroom
 */
const buildNotif = (name, state) => {
    const divNotif = document.createElement('div');
    divNotif.classList.add('message', 'notif');
    chatBox.appendChild(divNotif);

    const text = document.createElement('p');
    text.innerText = `${name} has ${state} the chat`;
    divNotif.appendChild(text);
}

export { buildMessages, buildNotif }