import { buildMessages, buildNotif } from "../components/messages.js";
import { sendMessage } from "./sendMessage.js";
import { hideChatroom } from "./hideChatroom.js";
import { leaveChatroom } from "./leaveChatroom.js";

const chatBox = document.querySelector('.chatBox');

/**
 * Init the chatroom
 */

export const chatroom = (e, chatroomId) => {
    e.preventDefault();
    const arrowCloseChatroom = document.querySelector('.rightSide header i:nth-child(1)');
    const btnLeave = document.querySelector('.rightSide header i:nth-child(3)');
    
    const userId = firebase.auth().currentUser.uid;
    
    // add eventhandlers to leave button
    btnLeave.addEventListener('click', (e) => {
        if(confirm('Are you sure you want to leave this chatroom?')) leaveChatroom(e, chatroomId, userId);
    });

    // delete previous event listeners
    // code snippit from https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
    let old_element = document.querySelector('.sendMessage');
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    // add event handlers to close button
    arrowCloseChatroom.addEventListener('click', e => {
        displayMessages();     // stop snapshotlistener
        hideChatroom(e);
    });
    
    // add event handlers to send chat button
    document.querySelector('.sendMessage').addEventListener('submit', (e) => { 
        sendMessage(e, chatroomId);
    });

    const db = firebase.firestore();
    const query = db.collection('messages').where('chatroom_id', '==', chatroomId);

    // display messages with snapshot listener
    const displayMessages = query.orderBy('createdOn').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(changed => {
                if(changed.type === "added") {
                    const data = changed.doc.data();
                    if (data.isNotif == true) {
                        buildNotif(data.user_name, data.typeNotif);
                    }
                    else {
                        buildMessages(data.user_id, data.user_name, data.content, data.user_image);
                    }
                }
        })
        chatBox.scrollTop = chatBox.scrollHeight ;
    })
}