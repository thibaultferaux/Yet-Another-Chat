/**
 * Login
 */

import { initFirebase } from "./firebase.js";
import { loginGoogle, loginFacebook, loginTwitter } from "../lib/altRegister.js";


/**
 * Init the login page
 */

const initLogin = () => {
    initFirebase();

    // add event handlers to login button
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', login);

    // add event handlers to google button
    const btnGoogle = document.getElementById('btnGoogle');
    btnGoogle.addEventListener('click', loginGoogle);

    // add event handlers to facebook button
    const btnFaceBook = document.getElementById('btnFaceBook');
    btnFaceBook.addEventListener('click', loginFacebook);

    // add event handlers to twitter button
    const btnTwitter = document.getElementById('btnTwitter');
    btnTwitter.addEventListener('click', loginTwitter);

    // when we are logged in or not ...
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
}


/**
 * When authentication state changed
 */

const onAuthStateChanged = async (firebaseUser) => {
    if(firebaseUser) {
        await firebase.firestore().collection("users").doc(firebaseUser.uid).set({
            name: firebaseUser.displayName
        })
        location.replace('/dashboard.html');
    }
}


/**
 * Empty input fields
 */

 const emptyInputs = () => {
    document.querySelector('input[name="email"]').value = '';
    document.querySelector('input[name="password"]').value = '';
}


/**
 * Show error
 */

const showError = (error) => {
    const errorContainer = document.querySelector('.error-container');
    errorContainer.innerHTML = error;
    errorContainer.classList.remove('hide');
    emptyInputs();
}


/**
 * Login
 */

const login = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector('form'));
    const email = formData.get('email');
    const password = formData.get('password');

    try
    {
        
        await firebase.auth().signInWithEmailAndPassword(email, password);
    }
    catch(e)
    {
        showError(e.message);
    }
}


// When the window is loaded
window.addEventListener('load', initLogin);