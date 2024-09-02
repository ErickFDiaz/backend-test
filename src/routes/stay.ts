import { Router } from "express";
import { registerParkingEntry,registerParkingExit } from "../controllers/stay.controller";
const router = Router();

router.post("/entry", registerParkingEntry);
router.post("/exit", registerParkingExit);

export { router };
