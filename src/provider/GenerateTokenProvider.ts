import { sign } from "jsonwebtoken";



class GenerateTokenProvider{
    async execute(userId: string){
        //Gerar token
        const token = sign({}, process.env.PRIVATE_KEY_JWT, {
            subject: userId,
            expiresIn: "1d"
        });
        
        return token;
    }
}

export { GenerateTokenProvider }