/**
 * Register
 */

import { initFirebase } from "./firebase.js";

const loader = document.getElementById('loader');
const appContainer = document.getElementById('app');

/**
 * Init the login page
 */

const initRegister = () => {
    initFirebase();

    // add event handlers to register button
    const btnRegister = document.getElementById('btnRegister');
    btnRegister.addEventListener('click', register);
}


/**
 * Empty input fields
 */

const emptyInputs = () => {
    document.querySelector('input[name="fullName"]').value = '';
    document.querySelector('input[name="email"]').value = '';
    document.querySelector('input[name="password"]').value = '';
    document.querySelector('input[name="confirmPassword"]').value = '';
}

/**
 * Show error
 */

const showError = (error) => {
    loader.classList.add('hide');
    appContainer.classList.remove('hide');
    const errorContainer = document.querySelector('.error-container');
    errorContainer.innerHTML = error;
    errorContainer.classList.remove('hide');
    emptyInputs();
}

/**
 * Register
 */

const register = async (e) => {
    loader.classList.remove('hide');
    appContainer.classList.add('hide');
    e.preventDefault();
    const formData = new FormData(document.querySelector('form'));
    const name = formData.get('fullName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confPassword = formData.get('confirmPassword');
    if (password === confPassword) {
        if (name !== '') {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)

                    // code snippet inspired by https://stackoverflow.com/questions/40389946/how-do-i-set-the-displayname-of-firebase-user/40429080
                    .then(async (result) => {
                        return result.user.updateProfile({
                            displayName: name
                        });
                    })
                    firebase.auth().signOut();
                    location.replace('/index.html');
                    
            } catch (e) {
                showError(e.message);
            }
        } else {
            showError("<em>Full Name</em> has not been entered")
        }
    } else {
        showError("Password and confirm password are not equal");
    }
}





// When the window is loaded
window.addEventListener('load', initRegister);