let comments = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : {};

const newComment = (id) => {
    return `
    <div id="comment-div-${id}">
    <textarea id="comment-${id}" cols="75" rows="5">${comments[id] ? comments[id].text : ''}</textarea><br />
    <button id="delete-${id}" onclick="deleteComment(${id})">Delete</button>
    <button id="reply-${id}" onclick="replyComment(${id})">Reply</button>
    <button id="add-${id}" onclick="saveComment(${id})">${comments[id] ? 'Edit' : 'Add'}</button>
    <br />
    <br />
    </div>
    `;
}

function firstRender() {
    let commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = '';
    Object.keys(comments).map((el, i) => {
        let newCommentDiv = document.createElement('div');
        newCommentDiv.id = `comment-div-${el}`;
        newCommentDiv.innerHTML = newComment(el);
        commentsDiv.appendChild(newCommentDiv);
    });
};

function appendComment() {
    let commentsDiv = document.getElementById('comments');
    let newCommentDiv = document.createElement('div');
    let commentIndex = parseInt(Object.keys(comments)[Object.keys(comments).length - 1]) + 1;
    newCommentDiv.id = `comment-div-${commentIndex}`;
    newCommentDiv.innerHTML = newComment(commentIndex);
    commentsDiv.appendChild(newCommentDiv);
}

function deleteComment(id) {
    delete comments[id];
    localStorage.setItem('comments', JSON.stringify(comments));
    firstRender();
}

function replyComment(id) {
    if (!comments[id]) {
        alert('Reply is not possible on this comment.');
    } else {
        // comments[id].children = 
    }
    firstRender();
}

function saveComment(id) {
    comments[id] = comments[id] ? comments[id] : { text: '', children: {} };
    comments[id].text = document.getElementById('comment-' + id).value;
    localStorage.setItem('comments', JSON.stringify(comments));
    firstRender();
}

firstRender();