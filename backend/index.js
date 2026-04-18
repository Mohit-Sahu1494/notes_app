import dotenv from 'dotenv'
import app from './app.js'
import connectDB from "./src/db/index.js";

dotenv.config()
connectDB().then(()=>{
    const port = process.env.PORT || 8000 
    app.listen(port,()=>{
         console.log("Server is running successfully at : ", port);
    })
})

.catch((error)=>console.log("DB Connection Error: ", error))
