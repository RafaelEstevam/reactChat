import {getCustomRepository, Repository} from 'typeorm';
import {MessageRepository} from '../repositories/Message.repository';
import {Message} from '../entities/Message.entity';

interface MessageInterface {
    name?: string,
    email?: string,
    user_id?: string,
    message: string,
    hash_connection?: string,
    is_attendant?: string,
    to: string,
    from: string
}

class MessageService{

    private messageRepository: Repository<Message>;

    constructor(){
        this.messageRepository = getCustomRepository(MessageRepository);
    }

    async create({name, email, message, user_id, hash_connection, to, from, is_attendant}:MessageInterface){

        const newMessage = await this.messageRepository.create({
            name,
            email,
            user_id,
            message,
            hash_connection,
            is_attendant,
            to,
            from
        });
        
        await this.messageRepository.save(newMessage);
        return newMessage;
    }

    async getMessagesByHashAndUser(hash_connection: string, user_id){
        const messages = await this.messageRepository.find({
            where: {hash_connection, user_id}
        });
        return messages;
    }

    async index(hash_connection: string){
        const messages = await this.messageRepository.find({
            where: {hash_connection}
        });
        return messages;
    }
}

export {MessageService}