// chat-box animation
(function(){
    function openChat() {
        let x = document.getElementById('chat-box');
        x.children[0].className = 'form-container text-center show'
        x.className = 'chat-box show-chat';
    }
    function closeChat() {
        let x = document.getElementById('chat-box');
        x.className = 'chat-box hide-chat';
        setTimeout(function(){
          x.className = 'chat-box hidden';
          x.children[0].className = 'form-container text-center hide';
        },500);
    }
})();