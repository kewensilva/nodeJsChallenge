import express from 'express';
import * as cepController from './controllers/cepController';
import * as userController from './controllers/userController';
import * as authMiddleware from './middleware/auth';
import * as authUser from './controllers/authController';
const routes = express.Router();


routes.post('/cep', authMiddleware.AuthMiddleware, cepController.searchCep);
routes.post('/register', userController.userCreate);
routes.post('/login', authUser.authUser);


export default routes;