import { Router } from "express";
import { bloodAdd, bloodGet, bloodUpdate, bloodDelete } from "../controller/blood.controller.js";
import { authenticationToken } from "../middleware/auth.js";
import { emergencyAdd, emergencyDelete, emergencyGet, emergencyUpdate } from "../controller/emergency.controller.js";

const router = Router();

router.post("/get",authenticationToken, emergencyGet);
router.post("/",authenticationToken, emergencyAdd);
router.put("/",authenticationToken, emergencyUpdate);
router.delete("/",authenticationToken, emergencyDelete);

export default router;