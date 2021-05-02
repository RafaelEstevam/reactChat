import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';

const app = express();

const http = createServer(app);
const io = new Server(http, {
    cors: {
        origin: '*',
    }
});

app.get('/', (req, res) => {
    return res.send('hello word');
})

io.on("connection", (socket) => { //cria a rota web de conexão websocket
    console.log("Se conectou", socket.id);

    // socket.on('disconnect', () => {
    //     console.log("Se desconectou", socket.id)
    // })
})

export {http, io};