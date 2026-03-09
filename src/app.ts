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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


/* NO projeto anterior tive que incluir varias coisas no app:
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use("/api/projects", projectRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/technologies", technologyRoutes);


// app.set("view engine", "pug");
app.set("views", "./Views"); //isso tem que ver como integrar ao front end


// app.post("/api/images/test", (req, res) => {
//     res.json({ ok: true });""
// });

*/