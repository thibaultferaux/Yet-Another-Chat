import { joinChatroom } from "../lib/joinChatroom.js";

const availableChatroomsWrapper = document.querySelector('.containerAvChatrooms');

/**
 * Builds the availablechats section
 */
export const buildAvailableChats = (chatId, name, userId) => {
    // div
    const divWrapper = document.createElement('div');
    divWrapper.id = chatId;
    divWrapper.className = 'chatRoomElement';
    availableChatroomsWrapper.appendChild(divWrapper);

    // chat icon
    const chatIcon = document.createElement('i');
    chatIcon.classList.add('fas', 'fa-comments');
    divWrapper.appendChild(chatIcon);

    // chat name
    const chatName = document.createElement('p');
    chatName.className = 'chatName';
    chatName.innerText = name;
    divWrapper.appendChild(chatName);

    // join button
    const joinBtn = document.createElement('button');
    joinBtn.className = 'btnJoin';
    joinBtn.value = chatId;
    joinBtn.innerText = 'Join';
    divWrapper.appendChild(joinBtn);

    // add event handlers to join chatroom button
    joinBtn.addEventListener('click', e => joinChatroom(e, userId));
}