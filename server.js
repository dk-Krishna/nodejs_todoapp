import app from "./app.js";

const port = process.env.PORT;

// connecting MONGODB
import "./config/database.js";

app.listen(port, ()=> {
    console.log(`Server is running on https://localhost:${port} in ${process.env.NODE_ENV} mode`);
});