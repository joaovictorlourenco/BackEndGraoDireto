import {  CreateUserUseCase } from "./CreateUsersUseCase";
import { Request, Response } from "express";


class  CreateUserController {

    async handle(request: Request, response: Response){

        const { email, name, username, password } = request.body;

        const createUserUseCase = new CreateUserUseCase();

        const user = await createUserUseCase.execute({
            email,
            name,
            username,
            password,
        });

        return response.status(200).json(user);
    }

}

export { CreateUserController }

