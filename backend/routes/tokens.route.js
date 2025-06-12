import { Router } from "express";
import { tokensAdd, tokensGet, tokensUpdate, tokensDelete }from "../controller/tokens.controller";
import { authenticationToken } from "../middleware/auth";

const router = Router();

router.get("/",authenticationToken, tokensGet);
router.post("/",authenticationToken, tokensAdd);
router.put("/",authenticationToken, tokensUpdate);
router.delete("/",authenticationToken, tokensDelete);

export default router;