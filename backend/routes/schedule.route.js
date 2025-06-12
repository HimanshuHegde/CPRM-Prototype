import { Router } from "express";
import { scheduleAdd, scheduleGet, scheduleUpdate, scheduleDelete  } from "../controller/schedule.controller";
import { authenticationToken } from "../middleware/auth";

const router = Router();

router.get("/",authenticationToken, scheduleGet);
router.post("/", authenticationToken,scheduleAdd);
router.put("/",authenticationToken, scheduleUpdate);
router.delete("/",authenticationToken, scheduleDelete);

export default router;