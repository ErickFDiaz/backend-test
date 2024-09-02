import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/',router);
db()
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => {
    console.error('MongoDB connection error:',error);
  });
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
