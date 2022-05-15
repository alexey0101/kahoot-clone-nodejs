var socket = io.connect('/app', {
    query : {
        AuthorizationCookie: getCookie('Authorization')
    }
});

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

//When player connects to server
socket.on('connect', function() {
    
    var params = jQuery.deparam(window.location.search); //Gets data from url
    
    //Tell server that it is player connection
    socket.emit('player-join', params);
});

socket.on('connect_error', err => {
    window.location.href = 'signin.html';
});

//Boot player back to join screen if game pin has no match
socket.on('noGameFound', function(){
    window.location.href = '../';
});
//If the host disconnects, then the player is booted to main screen
socket.on('hostDisconnect', function(){
    window.location.href = '../';
});

//When the host clicks start game, the player screen changes
socket.on('gameStartedPlayer', function(){
    window.location.href="/player/game/" + "?id=" + socket.id;
});


