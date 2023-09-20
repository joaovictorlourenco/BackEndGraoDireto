import { Router } from 'express';

import {  CreateUserController } from './useCases/createUser/CreateUserController';
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController';
import { RestaurantController } from './useCases/restaurant/RestaurantController';

const router = Router();

const createUserController = new  CreateUserController();
const authenticateUserController = new  AuthenticateUserController();
const refreshTokenController = new RefreshTokenUserController();
const restaurantController = new RestaurantController();

router.get("/", (request, response) => {
    return response.status(200).send("Server is running!")
})

router.post("/cadastro",  createUserController.handle); 
router.post("/login", authenticateUserController.handle );
router.post("/refresh-token", refreshTokenController.handle );
router.post("/addRestaurant", restaurantController.addNewRestaurant);

router.get("/getAllRestaurant", restaurantController.getAllRestaurant );
router.get("/bills", ensureAuthenticated, (request, response) => {
    return response.status(200).json([
        { id: 1  ,message: "Hello World - Bills" },
        { id: 2  ,message: "Hello World" },
        { id: 3  ,message: "Hello" },
        { id: 4  ,message: "Hello" },
        { id: 5  ,message: "Hello" },
        { id: 6  ,message: "Hello" }
    ])
})

export { router }