import mongoose from "mongoose";

export async function connect() {
  try {
    const uri: any = process.env.MONGO_URI;
    mongoose.connect(uri);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MONGODB CONNECTED SUCCESSFULLY");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error. Please make sure MongoDB is running." + err);
    });

    // Log when the connection is closed
    connection.on("disconnected", () => {
      console.log("MONGODB CONNECTION CLOSED");
    });

    // Handle process termination and close the connection
    process.on("SIGINT", async () => {
      await connection.close();
      process.exit(0);
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
