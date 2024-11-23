import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  
app.use("/api/employees", employeeRoutes);
  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
export default app;
