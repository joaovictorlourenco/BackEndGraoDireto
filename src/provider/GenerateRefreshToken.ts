import dayjs from "dayjs"

import { client } from "../prisma/client"


class GenerateRefreshToken{

    async execute(userId: string){

       const expiresIn = dayjs().add(1, "minute").unix();

        const refreshToken = await client.refreshToken.create({
            data: {
                userId,
                expiresIn
            }
        }).catch(err => {
            console.log(err)
            throw new Error('Error creating refresh token')
        })
        
        
        return refreshToken

    }

}

export { GenerateRefreshToken }