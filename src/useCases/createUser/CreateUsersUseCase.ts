import { hash } from "bcryptjs";

import { client } from "../../prisma/client"

interface IUserRequest {

    email: string;
    name:  string;
    password: string;
    username: string;

}

class CreateUserUseCase {

    async execute({ email, name, username, password }: IUserRequest) {

        //Verificar se o usuario existe 

        const userAlreadyExists = await client.user.findFirst({
            where: {
                email,
            },
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        //Cadastrar o usuário

        const passwordHash = await hash(password, 8);

        const user = await client.user.create({
            data: {
                email ,
                username,
                name,
                password: passwordHash,
            },
        });
        return user;
    }

}

export { CreateUserUseCase }