import { Router } from "express";
import { usuarioGetAll, usuarioCreate, usuarioDelete, usuarioGetAvaliacoes,usuarioGetById,
    usuarioGetByName, usuarioGetEmprestimos, usuarioUpdate
} from "../controllers/usuarioController.js";

const router = Router();

//Usuário
//GetAll - http://localhost:3000/api/usuarios
router.get("/usuarios", usuarioGetAll);
//GetByName - http://localhost:3000/api/usuarios?nome=busca
router.get("/usuarios/busca", usuarioGetByName); 
//GetEmprestimos - http://localhost:3000/api//usuarios/:id/emprestimos
router.get("/usuarios/:id/emprestimos", usuarioGetEmprestimos);
//GetAvaliacoes - http://localhost:3000/api/usuarios/:id/avaliacoes
router.get("/usuarios/:id/avaliacoes", usuarioGetAvaliacoes);
//GetById - http://localhost:3000/api/usuarios/:id
router.get("/usuarios/:id", usuarioGetById);
//POST - http://localhost:3000/api/usuarios
router.post("/usuarios", usuarioCreate);
//PUT - http://localhost:3000/api/usuarios/:id
router.put("/usuarios/:id", usuarioUpdate);
//DELETE - http://localhost:3000/api/usuarios/:id
router.delete("/usuarios/:id", usuarioDelete);


export default router;