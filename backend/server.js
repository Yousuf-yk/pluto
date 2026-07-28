import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

dotenv.config();

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());



import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/cart", cartRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})