import { Router } from "express";
import { bloodAdd, bloodGet, bloodUpdate, bloodDelete } from "../controller/blood.controller.js";
import { authenticationToken } from "../middleware/auth.js";
import { drugAdd, drugDelete, drugGet, drugUpdate } from "../controller/drug.controller.js";

const router = Router();    

router.post("/get",authenticationToken, drugGet);
router.post("/",authenticationToken, drugAdd);
router.put("/",authenticationToken, drugUpdate);
router.delete("/",authenticationToken, drugDelete);

export default router;