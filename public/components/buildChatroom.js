const rightSide = document.querySelector('.rightSide');
const header = document.querySelector('.rightSide header');


/**
 * Builds the empty chatroom
 */
export const buildChatroom = (e, name) => {
    e.preventDefault();

    rightSide.style.width = '100vw';

    const arrowCloseChatroom = document.createElement('i');
    arrowCloseChatroom.classList.add('fas', 'fa-chevron-left');
    header.appendChild(arrowCloseChatroom);
    
    const chatName = document.createElement('p');
    chatName.className = 'chatroomName';
    chatName.innerText = name;
    header.appendChild(chatName);

    const btnLeave = document.createElement('i');
    btnLeave.classList.add('fas', 'fa-door-open');
    header.appendChild(btnLeave);
}