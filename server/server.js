import { app } from "./app.js";
import { backendUrl } from "./config/constants.js";
import { connectDB } from "./config/database.js";
import { connectRedis, redisClient } from "./config/redis.js";

connectDB();
connectRedis();

app.listen(process.env.PORT, () => {
    console.log(
        `Server is running on  ${backendUrl} in ${process.env.NODE_ENV} mode`,
    );
});
