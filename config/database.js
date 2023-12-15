import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, { dbName: "Backend-Todo" }).then(()=> {
    console.log("MongoDB connected successfully");
}).catch((err)=> {
    console.log(err);
});