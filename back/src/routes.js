const express = require("express");
const routes = express.Router();

import MessageController from './controller/MessageController';

routes.get('/messages', MessageController.GetAll);
routes.get('/messages/data', MessageController.GetData);
routes.get('/messages/historic/:hashConnection', MessageController.GetHistoric);

routes.get('/', (req, res) =>{
    return res.send("Hello World")
});

module.exports = routes;