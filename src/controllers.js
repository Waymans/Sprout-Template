const pool = require('./db');

const controller = (() => {

    const addUser = (req) => {
        const { first, last, email, password } = req

        pool.query('INSERT INTO sprout_users (first_name, last_name, user_email, user_pass) VALUES ($1, $2, $3, $4)', [first, last, email, password], err => {
            if (err) {
                throw err
            }
            return { status: 'Success', message: 'User added.' }; // 200
        })
    }
    
    const getArticles = (req) => {
        pool.query('SELECT user_titles, user_messages, created_article_on FROM sprout_users WHERE id=$1', [req], (err, data) => {
            if (err) {
                throw err
            }
            return data.rows['0']; // 200
        })
    }

    const addArticle = (req) => {
        const { id, title, message } = req

        pool.query('UPDATE sprout_users SET user_titles = array_cat(user_titles, $1), user_messages = array_cat(user_messages, $2), created_article_on = array_cat(created_article_on, array[now()]) WHERE id=$3', ['{'+title+'}', '{'+message+'}', id], err => {
            if (err) {
                throw err
            }
            return { status: 'Success', message: 'Article added.' }; // 201
        })
    }
    
    const editArticle = (req) => {
        const { id, articleIndex, title, message } = req

        pool.query('UPDATE sprout_users SET user_titles = array_replace(user_titles, user_titles[$1], $2), user_messages = array_replace(user_messages, user_messages[$1], $3) WHERE id=$4', [articleIndex, title, message, id], err => {
            if (err) {
                throw err
            }
            return { status: 'Success', message: 'Article removed.' }; // 201
        })
    }

    const removeArticle = (req) => {
        const { id, articleIndex } = req
        
        pool.query('UPDATE sprout_users SET user_titles = array_remove(user_titles, user_titles[$1]), user_messages = array_remove(user_messages, user_messages[$1]), created_article_on = array_remove(created_article_on, created_article_on[$1]) WHERE id=$2', [articleIndex, id], err => {
            if (err) {
                throw err
            }
            return { status: 'Success', message: 'Article removed.' }; // 201
        })
    }

    const getPassword = (req) => {
        const { email } = req

        pool.query('SELECT password FROM sprout_users WHERE user_email=($1)', [email], (err, data) => {
            if (err) {
                throw err
            }
            return data.rows; // 200
        })
    }
    
    return {
        addUser: addUser,
        addArticle: addArticle,
        getArticles: getArticles,
        editArticle: editArticle,
        removeArticle: removeArticle,
        getPassword: getPassword
    }

})();

module.exports = controller;