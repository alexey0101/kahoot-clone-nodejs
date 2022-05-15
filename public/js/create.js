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

socket.on('connect', function(){
    socket.emit('requestDbNames');//Get database names to display to user
});

socket.on('connect_error', err => {
    window.location.href = '../signin.html';
});

socket.on('gameNamesData', function(data, userId){
    for(var i = 0; i < Object.keys(data).length; i++){
        var div = document.getElementById('game-list');
        var button = document.createElement('button');
        
        button.innerHTML = data[i].name;
        button.setAttribute('onClick', "startGame('" + data[i].id + "')");
        button.setAttribute('id', 'gameButton');
        
        div.appendChild(button);
        if (data[i].creator === userId) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.setAttribute('onClick', "deleteGame('" + data[i].id + "')");
            div.appendChild(deleteButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.setAttribute('onClick', "editGame('" + data[i].id + "')");
            div.appendChild(editButton);
        }
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('br'));
    }
});

socket.on('delete_success', () => {
    window.location.reload();
});

socket.on('delete_error', () => {
    alert('Delete error!');
    window.location.reload();
});

function startGame(data){
    window.location.href="/host/" + "?id=" + data;
}

function deleteGame(gameId) {
    socket.emit('deleteGame', gameId);
}

function editGame(gameId) {
    window.location.href="quiz-editor/?id=" + gameId;
}
