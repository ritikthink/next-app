import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!); // this "!" is for saying to typescript that it will be handled by me

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully!");
    });
    connection.on("error", (err) => {
      console.log("Mongo db Connection error", err);
      process.exit();
    });
  } catch (err) {
    console.log("Something went wrong!", err);
  }
}
