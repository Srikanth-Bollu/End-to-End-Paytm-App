// backend/index.js
import e from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import rootRouter from "./routes/index.js";
import mongoose from "mongoose";
const app = e();

app.use(cors());
app.use(e.json());

app.use("/api/v1", rootRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
