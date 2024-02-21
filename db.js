import mongoose from "mongoose";
import env from "dotenv";

env.config();

const url = process.env.MONGO_ATLAS_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnection = mongoose.connection;

dbConnection.on("error", console.error.bind(console, "MongoDB connection error:"));
dbConnection.once("open", () => {
    console.log("Connected to the database");
});

export default dbConnection;
