import mongoose from "mongoose";

export async function connect() {
  try {
    const uri: any = process.env.MONGO_URI;
    mongoose.connect(uri);
    const connection = mongoose.connection;
    ``;

    connection.on("connected", () => {
      console.log("MONGODB CONNECTED SUCCESSFULLY");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB running." + err
      );
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
