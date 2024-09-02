import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  getVehicles,
  createOfficialVehicle,
  createResidentVehicle,
} from "../services/vehicle.service";

const insertOfficialVehicle = async ({ body }: Request, res: Response) => {
  try {
    const { licensePlate } = body;
    const response = await createOfficialVehicle(licensePlate);
    res.status(201);
    res.send(response);
  } catch (error) {
    handleHttp(res, "Error registering a official vehicle");
  }
};

const insertResidentVehicle = async ({ body }: Request, res: Response) => {
  try {
    const { licensePlate } = body;
    const response = await createResidentVehicle(licensePlate);
    res.status(201);
    res.send(response);
  } catch (error) {
    handleHttp(res, "Error registering a resident vehicle");
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const response = await getVehicles();
    res.status(200);
    res.send(response);
  } catch (error) {
    handleHttp(res, "Error obtaining the list of vehicles");
  }
};

export { getAllVehicles, insertOfficialVehicle, insertResidentVehicle };
