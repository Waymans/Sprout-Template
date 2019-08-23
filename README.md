# Sprout

1. db setup
2. organize
3. mocha tests
4. README
5. comments
7. how to handle db/page additions
6. cookie - session token (with user ip)

## Table of contents
- [Install](#install)
- [Create](#create)
- [Edit](#add-a-template)
- [Notes](#notes)

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
- [ ] CSS => BEM
- [ ] OAuth setup
- [ ] Cookie for remember me
- [x] Nodemailer - /forgot
- [x] Nodemailer - /contact
- [x] Nodemailer - /create
- [ ] Chat functionality w/ Socket.io
- [ ] PostgreSQL DB for login storage

* [View the Deployed Site](https://grizzled-dessert.glitch.me/)

## Stack
Socketeer is built on the front-end with:
* HTML, CSS
* JavaScript

The back-end is built on:
* Node
* Express
* PostgreSQL
* Socket.io

## Authors
Waylan Hedine

---

## How to use locally
Make sure to have node and npm installed on your computer.

Clone the repo.

> `git clone https://github.com/Waymans/web-template <folder-name>`

Change into the folder directory.

> `cd <folder-name>`

Install the dependencies.

> `npm install`

Once installed, start the server.

> `node server`

Open browser at:

> `localhost:3000`

(Optional) - To run tests:

> `npm run tests`

---

## Personal changes
Change if your going to be using the login pages.

### Nodemailer
In server.js

```javascript

```

### PostgreSQL
In env

```

```

---

## Fixes
- [ ] fix /pages link-padding offset