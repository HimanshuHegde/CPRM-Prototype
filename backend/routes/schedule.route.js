import { Router } from "express";
import { scheduleAdd, scheduleGet, scheduleUpdate, scheduleDelete  } from "../controller/schedule.controller.js";
import { authenticationToken } from "../middleware/auth.js";

const router = Router();

router.post("/get",authenticationToken, scheduleGet);
router.post("/", authenticationToken,scheduleAdd);
router.put("/",authenticationToken, scheduleUpdate);
router.delete("/",authenticationToken, scheduleDelete);

export default router;