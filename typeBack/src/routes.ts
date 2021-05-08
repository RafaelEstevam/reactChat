import {Router} from 'express';

import {UserController} from './controllers/User.controller';

const routes = Router();

const userController = new UserController();

routes.post('/users/new', userController.create, () => {});
routes.get('/users/:email', userController.storeByEmail, () => {});
routes.get('/users/user/:id', userController.store, () => {});

export {routes};

