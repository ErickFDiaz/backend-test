import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { registerEntry,registerExit } from "../services/stay.service";

const registerParkingEntry = async ({ body }: Request, res: Response) => {
  try {
    const { licensePlate } = body;
    const response = await registerEntry(licensePlate);
    //const data = response ? response : "NOT_FOUND";
    res.status(201);
    res.send(response);
  } catch (e) {
    handleHttp(res, "Error registering parking entry",e);
  }
};

const registerParkingExit = async ({ body }: Request, res: Response) => {
  try {
    const { licensePlate } = body;
    const response = await registerExit(licensePlate);
    //const data = response ? response : "NOT_FOUND";
    res.status(201);
    res.send(response);
  } catch (e) {
    handleHttp(res, "Error registering parking exit",e);
  }
};

export { registerParkingEntry,registerParkingExit };