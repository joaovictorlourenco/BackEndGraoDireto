import { client } from "../../prisma/client";


interface IRestaurantTypes {

    name:       string;
    category:   string;
    star:       number;
    delivery:   number;
    address:    string; 
    tax:        number;
    icon?:       string;
    background?: string;

}

class RestaurantUseCase{

    async execute({ name, category, star, delivery, address, tax, icon, background }: IRestaurantTypes) {

        const restaurantAlreadyExists = await client.restaurant.findFirst({
            where: {
                name,
            },
        });

        if (restaurantAlreadyExists) {
            throw new Error("Restaurant already exists");
        }

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

        return restaurant;
    }


}

export { RestaurantUseCase }