// login popup
(function(){
    let popupSwitch = document.getElementById('popupSwitch');

    popupSwitch.addEventListener('click', function(){
        let popup = document.getElementById('myPopup');
        popup.classList.toggle('show-popup');
    }, false);
})();

