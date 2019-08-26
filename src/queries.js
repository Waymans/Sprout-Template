const queries = (() => {
    
    const login_info = (() => {
        return `SELECT id, first_name, last_name, user_email, user_pass, 
                    created_user_on, last_login 
                FROM sprout_users 
                WHERE user_email=$1`
    })();
    
    const find_user = (() => {
        return `SELECT id 
                FROM sprout_users 
                WHERE user_email=$1`
    })();
    
    const create_user = (() => {
        return `INSERT INTO sprout_users 
                    (first_name, last_name, user_email, user_pass) 
                VALUES ($1, $2, $3, $4)`
    })();
    
    const forgot_user = (() => {
        return `SELECT user_pass 
                FROM sprout_users 
                WHERE user_email=$1`
    })();
    
    const get_articles = (() => {
        return `SELECT user_titles, user_messages, created_article_on 
                FROM sprout_users WHERE id=$1`
    })();
    
    const add_article = (() => {
        return `UPDATE sprout_users 
                SET user_titles = array_cat(user_titles, array[$1]), 
                    user_messages = array_cat(user_messages, array[$2]), 
                    created_article_on = array_cat(created_article_on, array[now()]) 
                WHERE id=$3`
    })();
    
    const edit_article = (() => {
        return `UPDATE sprout_users 
                SET user_titles = array_replace(user_titles, user_titles[$1], $2), 
                user_messages = array_replace(user_messages, user_messages[$1], $3) 
                WHERE id=$4`
    })();
    
    const del_article = (() => {
        return `UPDATE sprout_users 
                SET user_titles = array_remove(user_titles, user_titles[$1]), 
                    user_messages = array_remove(user_messages, user_messages[$1]), 
                    created_article_on = array_remove(created_article_on, created_article_on[$1]) 
                WHERE id=$2`
    })();
    
    const del_test_table = (() => {
        return `DELETE FROM sprout_users 
                WHERE user_email=$1`
    })();
    
    return {
        login_info: login_info,
        find_user: find_user,
        create_user: create_user,
        forgot_user: forgot_user,
        get_articles: get_articles,
        add_article: add_article,
        edit_article: edit_article,
        del_article: del_article,
        del_test_table: del_test_table
    }
    
})();

module.exports = queries;