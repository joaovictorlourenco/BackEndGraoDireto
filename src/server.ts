import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { router } from "./routes";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000

app.use(router)
 
app.use(( error : Error, request: Request, response: Response, next: NextFunction) => {

    return response.status(400).json({

        status: "error",
        message: error.message,

    })

})

app.listen(port, () => { console.log(`Server is running on port http://localhost:${port}`)})