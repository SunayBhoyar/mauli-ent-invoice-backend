import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import invoiceRoutes from "./routes/invoice-routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/invoicedb")
  .then(() => console.log("MongoDB connected to server"))
  .catch(err => console.error("MongoDB error :", err));

app.use("/api/invoices", invoiceRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Invoice Management API");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));