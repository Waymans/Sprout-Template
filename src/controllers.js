const pool = require('./db');

function controller(){
  
    let userID; // or use pug

    const addUser = (req) => {
        const { first, last, email, password } = req

        pool.query('INSERT INTO sprout_users (first_name, last_name, user_email, user_pass) VALUES ($1, $2, $3, $4)', [first, last, email, password], err => {
            if (err) {
                throw err
            }
            return { status: 'Success', message: 'User added.' }; // 200
        })
    }

    const getUser = () => {

        pool.query('SELECT * FROM sprout_users WHERE id=($1)', [userID], (err, data) => {
            if (err) {
                throw err
            }
            userID = data.rows.id;
            return data.rows; // 200
        })
    }

    const addArticle = (req) => {
        const { title, message } = req

        // may have to have title, message be surrounded in {}
        pool.query('UPDATE sprout_users SET user_titles = array_cat(user_titles, ($1)), user_messages = array_cat(user_messages, ($2)) WHERE id=($3)', [title, message, userID], err => {
            if (err) {
                throw err
            }
            return { status: 'Success', message: 'Article added.' }; // 201
        })
    }

    const getArticles = () => {
      
        pool.query('SELECT user_titles, user_messages, created_article_on FROM sprout_users WHERE id=($1)', [userID], (err, data) => {
            if (err) {
                throw err
            }
            return data.rows; // 200
        })
    }

    const delArticle = (req) => {
        const { index } = req.body

        pool.query('UPDATE sprout_users SET user_titles = array_remove(user_titles, user_titles[($1)]), user_messages = array_remove(user_messages, user_messages[($1)]) WHERE id=($2)', [index, userID], err => {
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
        getUser: getUser,
        addArticle: addArticle,
        getArticles: getArticles,
        delArticle: delArticle,
        getPassword: getPassword
    }

}

module.exports = controller;