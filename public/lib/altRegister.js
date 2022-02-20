/**
 * Login with Google
 */

const loginGoogle = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}


/**
 * Login with Facebook
 */

const loginFacebook = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider);
}


/**
 * Login with Twitter
 */

const loginTwitter = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider);
}







export { loginGoogle, loginFacebook, loginTwitter };