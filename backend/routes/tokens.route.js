import { Router } from "express";
import { tokensAdd, tokensGet, tokensUpdate, tokensDelete }from "../controller/tokens.controller.js";
import { authenticationToken } from "../middleware/auth.js";

const router = Router();

router.post("/get",authenticationToken, tokensGet);
router.post("/",authenticationToken, tokensAdd);
router.put("/",authenticationToken, tokensUpdate);
router.delete("/",authenticationToken, tokensDelete);

export default router;