CREATE TABLE sprout_users (
    id serial primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    user_email varchar(255) not null,
    user_pass varchar(255) not null,
    created_user_on timestamp with time zone default now(),
    last_login timestamp with time zone default now(),
    user_titles text[],
    user_messages text[],
    created_article_on timestamp with time zone[]
);