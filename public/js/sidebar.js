// Dash display
(function(){
    let links = document.querySelectorAll('#sidebar a');
    let text = document.getElementById('sidebar-content');

    for (let i = 0, length = links.length; i < length; i++) {
        links[i].addEventListener('click', function() {
            let current = document.getElementsByClassName('active');
            current[0].className = current[0].classList.remove('active');
            this.className = 'active';

            let inner = this.firstChild.innerHTML.toLowerCase();
            for (let i = 0, length = text.children.length; i < length; i++) {
                text.children[i].className = 'sidebar-content-text hide';
            }
            document.getElementById(inner)
                .className = 'sidebar-content-text show';
        }, false);
    }
})();
