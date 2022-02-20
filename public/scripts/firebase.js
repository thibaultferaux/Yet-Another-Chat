


const firebaseConfig = {
    apiKey: "AIzaSyBG1HZ8YXxsPqUlTCu6dnIdLKPJNqkMmds",
    authDomain: "yet-another-chat-11bba.firebaseapp.com",
    projectId: "yet-another-chat-11bba",
    storageBucket: "yet-another-chat-11bba.appspot.com",
    messagingSenderId: "250587964950",
    appId: "1:250587964950:web:4df19e814ca7263637f737"
};
  
const initFirebase = () => {
    firebase.initializeApp(firebaseConfig);
}

export { initFirebase }