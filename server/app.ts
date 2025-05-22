import express from "express";
import cors from "cors";
import productRouter from "./routes/products";
import errorHandler from "./error";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRouter);

app.use(errorHandler);

const port = process.env.port || 3030;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
