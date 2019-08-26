# Sprout

1. mailer
2. organize/move - modal
3. README
4. comments
5. download
6. how to handle db/page additions

## Table of contents
- [Info](#what-is-it/?)
- [Stack](#stack)
- [Author](#author)
- [Install](#how-to-use)
- [Testing](#testing)

## What is it?

Sprout is website template that fits many use cases that gives you everything needed to grow into something big! These use cases include:

- [x] Dynamic website
- [x] User login page
- [x] User dashboard 
- [x] Article Page
- [x] Create/forgot user page
- [x] Security features w/ Helmet.js
- [x] Function testing w/ Mocha/Chai
- [x] Generic term/policy pages
- [x] OAuth setup
- [x] Nodemailer
- [x] PostgreSQL DB for user storage

* [View the Deployed Site](https://sprout-template.glitch.me/)

## Stack
Sprout is built on the front-end with:
* Pug, CSS
* JavaScript

The back-end is built on:
* Node
* Express
* PostgreSQL

## Authors
Waylan Hedine

---

## How to use
Make sure to have node and npm installed on your computer.

Download the zip file from the website, or clone the repo.

> `git clone https://github.com/Waymans/web-template <folder-name>`

Change into the folder directory.

> `cd <folder-name>`

Install the dependencies.

> `npm install`

Edit `.env` file.

```
# email to use in production
EMAIL_HOST=realhost.net
EMAIL_USER=realuser
EMAIL_PASS=realpass

# email to use in development (get random account from ethereal.email)
FIRST=John
LAST=Doe
USER=john_doe@ethereal.email
PASS=10myP@ssword
SECURITY=STARTTLS
E_HOST=smtp.ethereal.email

# development or production
NODE_ENV=development

# origin domain to use during production
ORIGIN=https://www.example.com

# dev/pro DB urls in format: 
# postgres://<username>:<password>@<host>:<port>/<database_name>
DEV_DB_URL=
PRO_DB_URL=

# random session secret
SESSION_SECRET=rg35t24erf24t
```

Once installed, start the server.

> `node server`

Open browser at:

> `localhost:3000`

---

## Testing
To run tests:

> `npm test`
