import { deleteFromAvailableChats } from "./deleteFromAvailableChats.js";


/**
 * Deletes messages from a chatroom and the chatroom itself
 */
export const deleteChatroom = (chatId) => {
    const db = firebase.firestore();
    db.collection('messages').where('chatroom_id', '==', chatId).get()
        .then(querySnapshot => {

            // code snippit from user @samtstern on https://github.com/googleapis/nodejs-firestore/issues/64 
            let batch = db.batch();

            querySnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            batch.commit();
        });
    
    db.collection('chatrooms').doc(chatId).delete();
    deleteFromAvailableChats(chatId);
}