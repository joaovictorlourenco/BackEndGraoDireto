import { Request,Response, response } from "express";
import { client } from "../../prisma/client";
import { RestaurantUseCase } from "./RestaurantUseCase";


class RestaurantController {

    async addNewRestaurant(request: Request, response: Response)  {
        
        const { name, category, star, delivery, address, tax, icon, background }  = request.body

        const restaurantUseCase = new RestaurantUseCase();

        const restaurant = await restaurantUseCase.execute({
            name,
            category,
            star,
            delivery,
            address,
            tax,
            icon,
            background
        });

        return response.status(200).json(restaurant);


    }
     
    async getAllRestaurant() {

        try {
            
            const GetAllRestaurant = await client.restaurant.findMany();

            return response.status(200).json(GetAllRestaurant);

        } catch (error) {

            return response.status(400).json({ error: error.message });

        }  


    }


}


export { RestaurantController }