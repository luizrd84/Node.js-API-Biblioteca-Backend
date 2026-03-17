import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import livroRoutes from "./routes/livroRoutes.js";
import emprestimoRoutes from "./routes/emprestimoRoutes.js";
import editoraRouter from "./routes/editoraRouter.js";
import categoriaRouter from "./routes/categoriaRouter.js";
import autorRouter from "./routes/autorRouter.js";

const app = express();

app.use(cors()); //Segurança nas requisições http. 
app.use(express.json());

app.use("/api", usuarioRoutes);
app.use("/api", livroRoutes);
app.use("/api", emprestimoRoutes);
app.use("/api", editoraRouter);
app.use("/api", categoriaRouter);
app.use("/api", autorRouter);

// endpoint health
app.get("/health", (req, res) => {
  res.json({ status: "online" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


