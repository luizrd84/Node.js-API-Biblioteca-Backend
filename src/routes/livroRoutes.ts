import { Router } from "express";
import { livroGetAll, livroCreate, livroDelete, livroGetByArgument, livroGetById, livroUpdate,
    livroGetAvaliacoes, livroGetCategorias, livroGetEmprestimos
} from "../controllers/livroController.js";

const router = Router();

//Livro
//GetAll - http://localhost:3000/api/livros
router.get("/livros", livroGetAll);
//GetByArgument - livros/busca?autor_id=x | titulo | editora_id | ano (apenas um)
router.get("/livros/busca", livroGetByArgument);
//GetAvaliacoes - http://localhost:3000/api/livros/:id/avaliacoes
router.get("/livros/:id/avaliacoes", livroGetAvaliacoes);
//GetEmprestimos - http://localhost:3000/api/livros/:id/emprestimos
router.get("/livros/:id/emprestimos", livroGetEmprestimos);
//GetCategorias - http://localhost:3000/api/livros/:id/categorias
router.get("/livros/:id/categorias", livroGetCategorias);
//GetById - http://localhost:3000/api/livros/:id
router.get("/livros/:id", livroGetById);
//POST - http://localhost:3000/api/livros
router.post("/livros", livroCreate);
//PUT - http://localhost:3000/api/livros/:id
router.put("/livros/:id", livroUpdate);
//DELETE - http://localhost:3000/api/livros/:id
router.delete("/livros/:id", livroDelete);


export default router;