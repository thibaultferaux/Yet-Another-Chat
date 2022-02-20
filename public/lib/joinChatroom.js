import { sendNotif } from "./sendNotif.js";

/**
 * Joins a chatroom and styles elements when clicked
 */
export const joinChatroom = (e, userId) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection('chatrooms').doc(e.target.value).update({
        users: firebase.firestore.FieldValue.arrayUnion(userId)
    })
    e.target.classList.add('joined');
    e.target.innerHTML = '<i class="fas fa-check"></i>';
    e.target.disabled = true;

    sendNotif(userId, e.target.value, 'joined');
}