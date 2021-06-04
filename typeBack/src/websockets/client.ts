import {io} from '../http';
import {MessageService} from '../services/Message.service';


io.on('connect', (socket) => {
    socket.on('access_client', (params) => {
        io.emit('client_on_row', params);
    });

    socket.on('delivery_message_to_client', (params) => {
        
        const messageService = new MessageService();
        messageService.create(params);

        io.to(params.to).emit('recieve_message_of_attendant', params);
    });

    socket.on('delivery_attendant_to_client', (params) => {
        io.to(params.to).emit('recieve_new_attendant', params);
    })

    socket.on('client_disconnect', (params) => {
        io.emit('client_get_out', (params));
        socket.on('disconnect', () => {
            console.log("Cliente se desconectou", socket.id)
        })
    })
   
});