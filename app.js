const socket = require('socket.io');
const web = require('express')();
const server = require('http').Server(web)
const PORT = process.env.PORT || 5000;
const bot = require('./bot')

const io = socket(server, {
    path: '/server',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
    cors:'*'
});
web.get('/',(req,res)=>{
    res.end("hello from bot!")
});

io.on('connect',client=>{
    console.log('a new client connect id:',client.id);
    client.emit('hello client,connection will close after 1 second');
    setTimeout(()=>{
        client.close();
    },1000);
});

server.listen(PORT,()=>{
    console.log('server start at %d you can visit http://localhost:%d',PORT,PORT)
})