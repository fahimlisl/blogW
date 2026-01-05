import { app } from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./db/index.js"


dotenv.config({
    path:"./.env"
});


connectDB()
.then(() => {
    app.listen(process.env.PORT || 5632 , () => {
        console.log(`app is running on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    throw new Error(`error in catch block of ${error}`)
})