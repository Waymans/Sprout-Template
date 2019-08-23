// work on adding to db, and CLEANUP CODE
(function(){
  
let articleContainer = document.getElementById('sidebar-content'),
    linkContainer = document.getElementById('link-container'),
    removeModal = document.getElementById('remove-modal'),
    editModal = document.getElementById('edit-modal'),
    editModalTitle = document.getElementById('title-edit'),
    editModalMessage = document.getElementById('message-edit'),

    articleIndex = 1,
    indexToRemove,
    indexToEdit;

let links = document.querySelectorAll('main aside .article'); // let links; once db is setup

(function listeners(){
    
    let addArticle = document.getElementById('addBtn'),
        createModal = document.getElementById('create-modal'),
        createBtn = document.getElementById('create-article'),
        removeBtn = document.getElementById('remove-btn'),
        editBtn = document.getElementById('edit-btn'),
        closeModalBtns = document.getElementsByClassName('close');

    addArticle.addEventListener('click', function(){
        createModal.style.display = 'flex';
    }, false);
  
    for (let i = 0, length = closeModalBtns.length; i < length; i++) {
        closeModalBtns[i].addEventListener('click', function() {
            closeModalBtns[i].parentNode.parentNode.parentNode
                .style.display = 'none';
        }, false);
    }

    createBtn.addEventListener('submit', function(e) {
        e.preventDefault();
        let title = e.target[0].value, 
            message = e.target[1].value;

        domInterface.addArticleOnPage(title, message, new Date());
        dbInterface.addArticleOnDB(title, message);
        createModal.style.display = 'none';
    }, false);

    removeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        domInterface.removeArticleOnPage(indexToRemove);
        dbInterface.removeArticleOnDB(indexToRemove);
        removeModal.style.display = 'none';
    }, false);

    editBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let title = editModalTitle.value,
            message = editModalMessage.value;

        domInterface.editArticleOnPage(title, message, indexToEdit);
        dbInterface.editArticleOnDB(title, message);
        editModal.style.display = 'none';
    }, false);
  
    window.addEventListener('click', function(e) {
        if (e.target === createModal) {
            createModal.style.display = 'none';
        } else if (e.target === removeModal) {
            removeModal.style.display = 'none';
        } else if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    }, false);
  
    window.addEventListener('scroll', function() {
        let fromTop = window.scrollY + 200;

        for (let i = 0, length = links.length; i < length; i++) {
            let article = document.getElementById(links[i].hash.substring(1));
            if (
                article.offsetTop <= fromTop &&
                article.offsetTop + article.offsetHeight > fromTop
            ) {
                links[i].classList.add('active');
            } else {
                links[i].classList.remove('active');
            } 
        }
    }, false);
})();

let domInterface = (function(){

    let addArticleOnPage = function(title, message, date) {
        domElements.makeArticle(title, message, date);
        domElements.makeLink(title);
        articleIndex++;
        links = document.querySelectorAll('main aside .article');
    }

    let removeArticleOnPage = function(i) {
        let article = document.getElementById('A-' + i),
            link = document.getElementById('L-' + i);
        articleContainer.removeChild(article);
        linkContainer.removeChild(link);
        links = document.querySelectorAll('main aside .article');
    }

    let editArticleOnPage = function(title, message, i) {
        let article = document.getElementById('A-' + i),
            link = document.getElementById('L-' + i);
        link.firstChild.innerText = title;
        article.firstChild.innerText = title;
        article.lastChild.innerText = message;
    }

    return {
        addArticleOnPage: addArticleOnPage,
        removeArticleOnPage: removeArticleOnPage,
        editArticleOnPage: editArticleOnPage,
    }
})();

let dbInterface = (function(){

    let addArticleOnDB = function(title, message) {
        fetches.addArticle({title: title, message: message});
    }

    let removeArticleOnDB = function(title, message) {
        // db
    }

    let editArticleOnDB = function(title, message) {
        // db
    }

    return {
        addArticleOnDB: addArticleOnDB,
        removeArticleOnDB: removeArticleOnDB,
        editArticleOnDB: editArticleOnDB,
    }
})();

let domElements = (function(){

    function createNode(el) {
        return document.createElement(el);
    }
    function append(parent, el) {
        return parent.appendChild(el);
    }
  
    function compareTextOnSubmit() {
        // content.children
    }
    
    function prettyDate(d) {
        let newDateTime = (new Date(d)).getTime(),
            newDate = new Date(newDateTime),
            localTime = newDate.toLocaleTimeString(),
            localDate = newDate.toLocaleDateString(),
            i = localTime.indexOf(' '),
            shortTime = localTime.replace(localTime.substring(i - 3, i), '');
        return localDate + ' at ' + shortTime;
    };

    let makeArticle = function(title, message, date) {
        let article = createNode('article'),
            h2 = createNode('h2'),
            info = createNode('p'),
            remove = createNode('a'),
            edit = createNode('a'),
            p = createNode('p');
        article.id = 'A-' + articleIndex;
        h2.innerText = title;
        info.innerText = prettyDate(date);
        info.className = 'date';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////// change listeners?
        remove.innerText = 'remove';
        remove.className = 'float-right';
        remove.addEventListener('click', function(e) {
            indexToRemove = e.target.parentNode.parentNode.id.substring(2);
            removeModal.style.display = 'flex';
        }, false);

        edit.innerText = 'edit';
        edit.className = 'float-right';
        edit.addEventListener('click', function(e) {
            indexToEdit = e.target.parentNode.parentNode.id.substring(2);
            let article = document.getElementById('A-' + indexToEdit),
                title = article.firstChild.innerText,
                message = article.lastChild.innerText,
                modalTitle = editModalTitle,
                modalMessage = editModalMessage;

            modalTitle.value = title;
            modalMessage.value = message;
            editModal.style.display = 'flex';
        }, false);

        p.innerText = message;
        append(info, remove);
        append(info, edit);
        append(article, h2);
        append(article, info);
        append(article, p);
        append(articleContainer, article);
    }

    let makeLink = function(title) {  
        let a = createNode('a'),
            span = createNode('span');
        a.className = 'article';
        a.href = '#A-' + articleIndex;
        a.id = 'L-' + articleIndex;
        a.addEventListener('click', function(e) {
            let current = document.getElementsByClassName("active");
                current.length ? current[0].className = current[0].classList.remove("active") : null;
            this.className = 'active';
        }, false);
        span.innerText = title;
        span.className = 'btn-slide';
        append(a, span);
        append(linkContainer, a);
    }
    
    return {
        makeArticle: makeArticle,
        makeLink: makeLink,
    }
})();

// get articles on page load
let fetches = (function(){
    /*let getArticles = function() {
        axios.get('/db/articles')
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (err) {
            console.log(err);
        })
    }*/
  
    let addArticle = function(form){
        axios.post('/db/articles', form)
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (err) {
            console.log(err);
        })
    }
  
    let editArticle = function(form){
        axios.put('/db/articles', {
            body: new FormData(form)
        })
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (err) {
            console.log(err);
        })
    }
  
    let removeArticle = function(form){
        axios.delete('/db/articles', {
            body: new FormData(form)
        })
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (err) {
            console.log(err);
        })
    }
  
    return {
        //getArticles: getArticles,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle
    }
})();

//fetches.getArticles();
  
})();