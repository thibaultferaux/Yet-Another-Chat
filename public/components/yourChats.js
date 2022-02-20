import { chatroom } from "../lib/chatroom.js";
import { buildChatroom } from "./buildChatroom.js";

const yourChatsWrapper = document.querySelector('section.yourChats');

/**
 * Builds the chatrooms the user created/joined
 */
const buildYourChats = (chatId, name) => {
    // Button
    const button = document.createElement('button');
    button.className = 'chatRoomElement';
    button.value = chatId;
    yourChatsWrapper.appendChild(button);
    
    // Icon 1
    const chatIcon = document.createElement('i');
    chatIcon.classList.add('fas', 'fa-comments');
    button.appendChild(chatIcon);
    
    // Chat name
    const chatName = document.createElement('p');
    chatName.className = 'chatName';
    chatName.innerText = name;
    button.appendChild(chatName);
    
    // Icon 2
    const arrowRight = document.createElement('i');
    arrowRight.classList.add('fas', 'fa-chevron-right', 'arrow-grey');
    button.appendChild(arrowRight);
    
    button.addEventListener('click', e => {
        buildChatroom(e, name);
        chatroom(e, button.value);
    });
}

/**
 * Removes chatroom button from the users chats
 */
const removeFromYourChats = (chatId) => {
    const buttonToRemove = document.querySelector(`button[value="${chatId}"]`);
    buttonToRemove.remove(); 
}

export { buildYourChats, removeFromYourChats }