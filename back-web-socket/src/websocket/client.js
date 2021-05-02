import {io} from '../http';

io.on('connect', (socket) => {
    socket.on('access_client', (params) => {
        io.emit('client_on_row', params);
    });

    socket.on('delivery_message_to_client', (params) => {
        io.to(params.to).emit('recieve_message_of_attendant', params);
    });

    socket.on('client_disconnect', (params) => {

        io.emit('client_get_out', (params));

        socket.on('disconnect', () => {
            console.log("Cliente se desconectou", socket.id)
        })
    })
   
});