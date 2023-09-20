import { response } from "express";
import { client } from "../../prisma/client";

// interface IRestaurantTypes {

//     name:       string;
//     category:   string;
//     star:       number;
//     delivery:   number;
//     address:    string; 
//     tax:        number;
//     icon?:       string;
//     background?: string;

// }


class RestaurantController {

    async addNewRestaurant(request: Request, response: Response)  {
        
        const { name, category, star, delivery, address, tax, icon, background }  = request.body

        console.log(name, category, star, delivery, address,tax, icon, background)  

        const restaurant = await client.restaurant.create({
            data: {
                name,
                category,
                star,
                delivery,
                address,
                tax,
                icon,
                background
            },
        });

        return response.status(200).json(restaurant);


    }
     
    async getAllRestaurant() {

        try {        

            const GetAllRestaurant = await client.restaurant.findMany()
        
            return response.status(200).json(GetAllRestaurant)

        } catch (error) {
            
            return response.status(400).json({ error: error.message });

        }  


    }


}


export { RestaurantController }