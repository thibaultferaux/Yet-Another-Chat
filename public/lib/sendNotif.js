/**
 * Displays a notification in chat when a user creates, joins or left the chatroom
 */
const sendNotif = async (userId, chatId, type) => {
    const db = firebase.firestore();
    const query = db.collection('users').doc(userId);
    await query.get().then(async (doc) => {
        const name = doc.data().name;
        const { serverTimestamp } = firebase.firestore.FieldValue;
        const messageData = { chatroom_id: chatId, createdOn: serverTimestamp(), user_name: name, isNotif: true, typeNotif: type}
        await db.collection('messages').add(messageData);
    })
}


export { sendNotif }