/**
 * The Main Application
 */

import { initFirebase } from "./firebase.js";
import { buildYourChats, removeFromYourChats } from "../components/yourChats.js";
import { deleteFromAvailableChats } from "../lib/deleteFromAvailableChats.js";
import { buildAvailableChats } from "../components/availableChats.js";
import { sendNotif } from "../lib/sendNotif.js";
import { leaveChatroom } from "../lib/leaveChatroom.js";

let userId;


/**
 * Init the app
 */

const app = async () => {
    initFirebase();
    
    firebase.auth().onAuthStateChanged(onAuthStateChanged)

    // add event handlers to logout button
    document.getElementById('btnLogout').addEventListener('click', logout)
    
    // add event handlers to + button
    const showCreateChat = document.getElementById('createChat');
    showCreateChat.addEventListener('click', showCreateChatTab);
    
    // add event handlers to join existing chats button
    const joinChat = document.getElementById('joinChat');
    joinChat.addEventListener('click', showAvailableChats);
    
    // add event handlers to create chat button
    const btnCreateChat =  document.getElementById('btnCreateChat');
    btnCreateChat.addEventListener('click', createChat);

        
}

/**
 * Logout user
 */

const logout = async (e) => {
    e.preventDefault();
    if(confirm('Are you sure you want to logout?')) {
        const db = firebase.firestore();
        const query = db.collection('chatrooms').where('users', 'array-contains', userId);
        await query.get().then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                await leaveChatroom(null, doc.id, userId);
            })
        })  
        setTimeout(() => {
            firebase.auth().signOut();
        }, 500);
    }
}


/**
 * When authentication state changes
 */

const onAuthStateChanged = async (firebaseUser) => {
    if(!firebaseUser) location.replace('/index.html');
    else {
        userId = firebaseUser.uid;
        
        //load available chats from database
        await getAvailableChats();

        //load your chats from database
        await getYourChats();
    }
}


/**
 * When clicked on createChat button
 * Shows form to create a chat
 */

const showCreateChatTab = (e) => {
    e.preventDefault();
    const backgroundBlur = document.querySelector('.backgroundBlur');
    backgroundBlur.classList.remove('hide');
    document.querySelector('.top i').addEventListener('click', () => {
        backgroundBlur.classList.add('hide');
    })
}


/**
 * When clicked on Join existing chat button
 * Shows tab with all available chats the user can join
 */

const showAvailableChats = (e) => {
    e.preventDefault();

    const availableChats = document.querySelector('.availableChatrooms');
    availableChats.style.transform = "translateY(-100vh)";
    document.querySelector('.headerAvChatrooms i').addEventListener('click', () => {
        availableChats.style.transform = "translateY(100vh)";
    })
    
    
}

/**
 * When we click on create chat
 * Creates a chatroom
 */

const createChat = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector('.createChat'));
    const chatName = formData.get('chatName');
    const { serverTimestamp } = firebase.firestore.FieldValue;
    const chatroomData = await createChatroom({ chatroomName: chatName, users: [userId], lastEdited: serverTimestamp() });
    sendNotif(userId, chatroomData.id, 'created')
    document.querySelector('input[name="chatName"]').value = '';
    document.querySelector('.backgroundBlur').classList.add('hide');

}

/**
 * Create chat
 */

const createChatroom = async (chatroomData) => {
    const db = firebase.firestore();
    
    const docRef = await db.collection('chatrooms').add(chatroomData);
    
    return { ...chatroomData, id: docRef.id }
}


/** 
 * Get your chats
 */

const getYourChats = async () => {
    const db = firebase.firestore();
    const query = db.collection('chatrooms').where('users', 'array-contains', userId);
    // const querySnapshot = await query.get();
    query.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(changed => {
            if(changed.type === "added") {
                deleteFromAvailableChats(changed.doc.id);
                buildYourChats(changed.doc.id, changed.doc.data().chatroomName);
            }
            if(changed.type === "removed") {
                removeFromYourChats(changed.doc.id);
                buildAvailableChats(changed.doc.id, changed.doc.data().chatroomName, userId);
            }
        })
    })
}


/**
 * Get available chats
 */

const getAvailableChats = async () => {
    const db = firebase.firestore();
    const query = db.collection('chatrooms').where('users', 'not-in', [[...userId]]);
    query.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(changed => {
            if(changed.type === "added") {
                buildAvailableChats(changed.doc.id, changed.doc.data().chatroomName, userId);
            }
        })
    })
}


// When the window is loaded
window.addEventListener('load', app);