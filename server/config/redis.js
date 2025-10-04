import { createClient } from "redis";

const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

const connectRedis = async () => {
    await redisClient.connect();
    console.log("Redis Connected...");

    try {
        const reply = await redisClient.ping();
        console.log("Redis PING response:", reply);
    } catch (err) {
        console.error("Failed to ping Redis:", err);
    }
};

export { redisClient, connectRedis };
