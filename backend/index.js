import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import customerRouter from "./routes/customer.routes.js";


dotenv.config();

const app = express();

app.use(express.json());       // parses incoming JSON request bodies into req.body
app.use(cookieParser());       // parses cookies into req.cookies
app.use("/customers", customerRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});