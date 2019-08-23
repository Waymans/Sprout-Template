// topnav
(function(){
    let navigation = document.getElementById('nav');
    let top = document.getElementById('topnav-opacity');
    top.style.background = 'rgba(85,139,110,0)';

    setInterval(function () {
        if (
            window.pageYOffset + 200 <= window.innerHeight && 
            !navigation.checked
        ) {
            top.style.background = 'rgba(85,139,110,0)';
        }
        else {
            top.style.background = 'rgba(85,139,110,1)';
        }
    },100);
})();
