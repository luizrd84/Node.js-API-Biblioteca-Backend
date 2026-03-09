import { Router } from "express";
import { emprestimoGetAll } from "../controllers/emprestimoController.js";

const router = Router();

//Emprestimo
//GetAll - http://localhost:3000/api/emprestimos
router.get("/emprestimos", emprestimoGetAll);



export default router;