import { Router } from "express";
import { categoriaGetAll } from "../controllers/categoriaController.js";

const router = Router();

//Categoria
//GetAll - http://localhost:3000/api/categorias
router.get("/categorias", categoriaGetAll);


export default router;