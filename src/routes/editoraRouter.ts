import { Router } from "express";
import { editoraCreate, editoraGetAll, editoraGetByArgument, editoraGetById, 
    editoraGetEditoresParceiros, editoraGetLivrosPublicados, editoraUpdate, editoraDelete
} from "../controllers/editoraController.js";

const router = Router();

//Editora
//GetAll - http://localhost:3000/api/editoras
router.get("/editoras", editoraGetAll);
//GetByArgument - http://localhost:3000/api/editoras/busca?nome=x | pais
router.get("/editoras/busca", editoraGetByArgument);
//GetLivrosPublicados - http://localhost:3000/api/editoras/:id/livrospublicados
router.get("/editoras/:id/livrospublicados", editoraGetLivrosPublicados);
//GetAutoresParceiross - http://localhost:3000/api/editoras/:id/autoresparceiros
router.get("/editoras/:id/autoresparceiros", editoraGetEditoresParceiros);
//GetById - http://localhost:3000/api/editoras/:id
router.get("/editoras/:id", editoraGetById);
//POST - http://localhost:3000/api/editoras
router.post("/editoras", editoraCreate);
//PUT - http://localhost:3000/api/editoras/:id
router.put("/editoras/:id", editoraUpdate);
//DELETE - http://localhost:3000/api/editoras/:id
router.delete("/editoras/:id", editoraDelete);


export default router;