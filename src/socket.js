const passport         = require('passport');
const cookieParser     = require('cookie-parser');
const session          = require('express-session');
const sessionStore     = new session.MemoryStore();
const passportSocketIo = require('passport.socketio');

module.exports = function (app) {

    const http         = require('http').Server(app);
    const io           = require('socket.io')(http); 

    app.use(cookieParser());

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        key: 'express.sid',
        store: sessionStore,
    }));

    /* socket code */
    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key: 'express.sid',
        secret: process.env.SESSION_SECRET,
        store: sessionStore
    }));

    io.on('connection', function(socket){
        let user = socket.request.user,
            userName = user[0].username,
            userPhoto = user[0].photo,
            addedUser = true;

        io.emit('connect', { msg: 'User joined.' });

        socket.on('chat message', function(msg){
            socket.broadcast.emit('chat message', { msg: msg, name: userName, photo: userPhoto });
        });  

        socket.on('typing', function(){
            socket.broadcast.emit('typing', { name: userName });
        });

        socket.on('not typing', function(){
            socket.broadcast.emit('not typing');
        });

        socket.on('disconnect', function(socket){
            if (addedUser) {
                io.emit('disconnect', { msg: 'User left.' });
            }
        });
    });

}