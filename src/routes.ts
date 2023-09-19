import { Router } from 'express';

import {  CreateUserController } from './useCases/createUser/CreateUserController';
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController';

const router = Router();

const createUserController = new  CreateUserController();
const authenticateUserController = new  AuthenticateUserController();
const refreshTokenController = new RefreshTokenUserController();

router.get("/", (request, response) => {
    return response.send("Server is running!")
})

router.post("/cadastro",  createUserController.handle); 
router.post("/login", authenticateUserController.handle );
router.post("/refresh-token", refreshTokenController.handle );

router.get("/bills", ensureAuthenticated, (request, response) => {
    return response.json([
        { id: 1  ,message: "Hello World - Bills" },
        { id: 2  ,message: "Hello World" },
        { id: 3  ,message: "Hello" },
        { id: 4  ,message: "Hello" },
        { id: 5  ,message: "Hello" },
        { id: 6  ,message: "Hello" }
    ])
})

export { router }