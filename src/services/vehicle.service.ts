import VehicleModel from "../models/vehicle.model";

const getVehicles = async () => {
  const vehicles = await VehicleModel.find({});
  return vehicles;
};

const createOfficialVehicle = async (licensePlate: string) => {
  const existingVehicle = await getCarBylicensePlate(licensePlate);
  if (existingVehicle) {
    throw new Error("This vehicle is already registered.");
  }
  const officialVehicle = await VehicleModel.create({
    licensePlate,
    type: "official",
  });
  return officialVehicle;
};
const createResidentVehicle = async (licensePlate: string) => {
  const existingVehicle = await getCarBylicensePlate(licensePlate);
  if (existingVehicle) {
    throw new Error("This vehicle is already registered.");
  }
  const residentVehicle = await VehicleModel.create({
    licensePlate,
    type: "resident",
  });
  return residentVehicle;
};

const getCarBylicensePlate = async (licensePlate: string) => {
  const responseItem = await VehicleModel.findOne({ licensePlate });
  return responseItem;
};


export { getVehicles, createOfficialVehicle, createResidentVehicle,getCarBylicensePlate };
