import { deleteChatroom } from "./deleteChatroom.js";
import { hideChatroom } from "./hideChatroom.js";
import { sendNotif } from "./sendNotif.js";

/**
 * leaves a chatroom and checks if the chatroom is empty
 */
export const leaveChatroom = async (e, chatId, userId) => {
    if (e) {
        e.preventDefault();
    }
    const db = firebase.firestore();
    await db.collection('chatrooms').doc(chatId).update({
        users: firebase.firestore.FieldValue.arrayRemove(userId)
    })
    hideChatroom();
    await checkIfEmpty(chatId, userId);
}

const checkIfEmpty = async (chatId, userId) => {
    const db = firebase.firestore();
    await db.collection('chatrooms').doc(chatId).get()
        .then(async (doc) => {
            if(doc.data().users.length == 0) {
                deleteChatroom(chatId);
            } else {
                await sendNotif(userId, chatId, 'left');
            }
        })
}