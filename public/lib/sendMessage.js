/**
 * Sends a message and saves it in the database
 */
export const sendMessage = async (e, chatId) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector('.sendMessage'));
    const content = formData.get('textMessage');
    if(content.trim() != '') {  // idee van Milan Bauwens om met trim te werken
        const db = firebase.firestore();
        const { serverTimestamp } = firebase.firestore.FieldValue;
        const user_id = firebase.auth().currentUser.uid;
        const user_name = firebase.auth().currentUser.displayName;
        const user_img = firebase.auth().currentUser.photoURL;
        const messageData = { chatroom_id: chatId, content: content, createdOn: serverTimestamp(), user_id: user_id, user_name: user_name, user_image: user_img, isNotif: false}
        await db.collection('messages').add(messageData);
        
        document.querySelector('input[name="textMessage"]').value = '';
    }
}