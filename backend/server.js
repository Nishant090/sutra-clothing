import app from "./app.js";
import connectDB from "./src/db/db.js";
import { env } from "./src/config/env.config.js";

const port = env.port || 5000;



const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log("Server failed");
    process.exit(1)
  }
};

startServer();
