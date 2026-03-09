import { Router } from "express";
import { autorCreate, autorDelete, autorGetAll, autorGetByArgument, autorGetById, autorUpdate,
    autorGetLivrosLancados
} from "../controllers/autorController.js";

const router = Router();

//Autor
//GetAll - http://localhost:3000/api/autor
router.get("/autor", autorGetAll);
//GetByArgument - http://localhost:3000/api/autor/busca?nome=x | pais
router.get("/autor/busca", autorGetByArgument);
//GetLivrosLancados - http://localhost:3000/api/autor/:id/livroslancados
router.get("/autor/:id/livroslancados", autorGetLivrosLancados);
//GetById - http://localhost:3000/api/autor/:id
router.get("/autor/:id", autorGetById);
//POST - http://localhost:3000/api/autor
router.post("/autor", autorCreate);
//PUT - http://localhost:3000/api/autor/:id
router.put("/autor/:id", autorUpdate);
//DELETE - http://localhost:3000/api/autor/:id
router.delete("/autor/:id", autorDelete);


export default router;