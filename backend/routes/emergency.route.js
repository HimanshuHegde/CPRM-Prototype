import { Router } from "express";
import { bloodAdd, bloodGet, bloodUpdate, bloodDelete } from "../controller/blood.controller";
import { authenticationToken } from "../middleware/auth";

const router = Router();

router.get("/",authenticationToken, bloodGet);
router.post("/",authenticationToken, bloodAdd);
router.put("/",authenticationToken, bloodUpdate);
router.delete("/",authenticationToken, bloodDelete);

export default router;