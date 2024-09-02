import { Router } from "express";
import { getAllVehicles,insertOfficialVehicle,insertResidentVehicle } from "../controllers/vehicle.controller";
const router = Router();

router.get("/", getAllVehicles);
router.post("/official", insertOfficialVehicle);
router.post("/resident", insertResidentVehicle);


export { router };
