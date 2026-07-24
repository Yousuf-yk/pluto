import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import db from "./config/db.js";

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());



import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/api/products", productRoutes);
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// GET    /api/products          
// GET    /api/products/:id
// POST   /api/products
// PUT    /api/products/:id
// DELETE /api/products/:id