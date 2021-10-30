import {Router} from 'express';

import {UserController} from './controllers/User.controller';
import {MessageController} from './controllers/Message.controller';

const routes = Router();

const userController = new UserController();
const messageController = new MessageController();

routes.post('/users/new', userController.create, () => {});
routes.get('/users/all', userController.index, () => {});
routes.get('/users/email/:email', userController.storeByEmail, () => {});

routes.post('/messages/new', messageController.create, () => {});
routes.post('/messages/getMessagesByHashAndUser', messageController.getMessagesByHashAndUser, () => {});
routes.get('/messages/hash/:hash_connection', messageController.index, () => {});

export {routes};

