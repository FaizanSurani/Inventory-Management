import express from 'express';
import DB from './config/db.js';
import cors from 'cors';
import inventoryRoutes from './routes/inventory.routes.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from "./routes/user.routes.js";

const PORT = 5000;
const app = express();
DB();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "*"]
}))

app.use("/api", inventoryRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

app.listen(PORT,() => {
    console.log(`Server is listening to ${PORT} PORT`);
})