import { IVehicle } from "../models/vehicle.model";
import VehicleModel from "../models/vehicle.model";
import { IStay } from "../models/stay.model";
import StayModel from "../models/stay.model";

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

// const getCar = async (id: string) => {
//   const responseItem = await VehicleModel.findOne({ _id: id });
//   return responseItem;
// };

// const updateCar = async (id: string, data: Car) => {
//   const responseItem = await VehicleModel.findOneAndUpdate({ _id: id }, data, {
//     new: true,
//   });
//   return responseItem;
// };

// const deleteCar = async (id: string) => {
//   const responseItem = await VehicleModel.remove({ _id: id });
//   return responseItem;
// };

export { getVehicles, createOfficialVehicle, createResidentVehicle,getCarBylicensePlate };
