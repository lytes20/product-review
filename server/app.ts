import express from "express";
import productRouter from "./routes/products";
import errorHandler from "./error";

const app = express();

app.use(express.json());

// Routes
app.use("/api/products", productRouter);

app.use(errorHandler);

const port = 3030;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
