import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, { dbName: "Backend-Todo" }).then((c)=> {
    console.log(`MongoDB connected successfully with ${c.connection.host}`);
}).catch((err)=> {
    console.log(err);
});