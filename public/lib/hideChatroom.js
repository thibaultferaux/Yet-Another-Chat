const rightSide = document.querySelector('.rightSide');
const chatBox = document.querySelector('.chatBox');

/**
 * Hides the chatroom and empties the elements
 */
export const hideChatroom = () => {

    document.querySelector('.rightSide header').innerHTML = '';
    chatBox.innerHTML = '';
    rightSide.style.width = '0';

}