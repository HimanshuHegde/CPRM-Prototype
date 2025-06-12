import { Router } from "express";
import { departmentAdd, departmentGet, departmentUpdate, departmentDelete } from "../controller/department.controller.js";
import { authenticationToken } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticationToken, departmentGet);
router.post("/",authenticationToken, departmentAdd);
router.put("/", authenticationToken,departmentUpdate);
router.delete("/",authenticationToken, departmentDelete);

export default router;