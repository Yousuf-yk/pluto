import express from "express";
import productRoutes from "./routes/productRoutes.js";
import db from "./config/db.js";


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use(express.json());

app.use("/api/products", productRoutes);
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// GET    /api/products          
// GET    /api/products/:id
// POST   /api/products
// PUT    /api/products/:id
// DELETE /api/products/:id