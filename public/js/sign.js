var socket = io.connect('/sign');

const signInButton = document.querySelector('#sign-in-button');
const signUpButton = document.querySelector('#sign-up-button');

const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');

if (signInButton) {
    signInButton.addEventListener('click', () => {
        socket.emit('signin', { username: usernameInput.value, password: passwordInput.value });
    });
}

if (signUpButton) {
    signUpButton.addEventListener('click', () => {
        socket.emit('signup', { username: usernameInput.value, password: passwordInput.value });
    });
}

socket.on('signin_success', (cookieValue, expiresDays) => {
    setCookie('Authorization', cookieValue, expiresDays);
    window.location.href = '/main.html';
});

socket.on('signin_failed', (errorMessage) => {
    alert(errorMessage);
});

socket.on('signup_success', () => {
    window.location.href = '/signin.html';
});

socket.on('signup_failed', (errorMessage) => {
    alert(errorMessage);
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}