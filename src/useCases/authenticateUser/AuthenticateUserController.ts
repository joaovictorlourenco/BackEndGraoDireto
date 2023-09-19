import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUserCase";


class AuthenticateUserController {

   async handle(request: Request, response: Response){

        try {

            const { email, password } = request.body;
            
            const authenticateUserUseCase = new AuthenticateUserUseCase();

            const token = await authenticateUserUseCase.execute({ 
                email, 
                password 
            });
            
            return response.json(token);
 
        } catch (error) {

            return response.status(400).json({ error: error.message });

        }

    }
}

export { AuthenticateUserController }