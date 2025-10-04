import mongoose from "mongoose";
import { dbName, mongoUri } from "./constants.js";

export const connectDB = () => {
    mongoose
        .connect(mongoUri, {
            dbName: dbName,
        })
        .then((c) => {
            console.log(`Database Connected with ${c.connection.host}`);
        })
        .catch((err) => {
            console.log("Database Connection failed");
            console.log(err);
        });
};
