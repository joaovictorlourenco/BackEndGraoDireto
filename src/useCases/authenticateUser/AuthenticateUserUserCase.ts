import { compare } from "bcryptjs";

import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

type IRequest = {
   
   email: string;
   password: string;

}

class AuthenticateUserUseCase{

   async execute({ email, password }: IRequest){
      
      //Verificar se o email existe
      //Verificar se a senha está correta
      //Gerar token
      
      const userAlreadyExists = await client.user.findFirst({
         where: {
            email
         }
      });


      if(!userAlreadyExists){
         throw new Error("Email or password incorrect!");
      }
      

      const passwordMatch = compare(password, userAlreadyExists.password);


      if(!passwordMatch){
         throw new Error("Email or password incorrect!");
      }
      

      //gerar token do user
      const generateTokenProvider = new GenerateTokenProvider;
   
      const token = await generateTokenProvider.execute(userAlreadyExists.id);
      
      await client.refreshToken.deleteMany({
         where: {
             userId: userAlreadyExists.id,
         }
     })

      const generateRefreshToken = new GenerateRefreshToken();

      const refreshToken = await generateRefreshToken.execute(
         userAlreadyExists.id
      )

      return { token, refreshToken };

   }

}

export { AuthenticateUserUseCase };