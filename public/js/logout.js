const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', () => {
    socket.emit('logout'); 
});

socket.on('logout_success', () => {
    document.cookie = 'Authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/';
});

socket.on('logout_error', (e) => {
    alert('Logout error!');
});