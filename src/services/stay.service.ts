import { IVehicle } from "../models/vehicle.model";
import VehicleModel from "../models/vehicle.model";
import { IStay } from "../models/stay.model";
import StayModel from "../models/stay.model";

const registerEntry = async (licensePlate: string) => {
  // Intentar encontrar el vehículo
  const vehicle = await VehicleModel.findOne({ licensePlate });

  if (!vehicle) {
    // Si el vehículo no existe, lo creamos y registramos la estancia
    const newVehicle = await VehicleModel.create({
      licensePlate,
      type: "non-resident",
    });
    const stay = await StayModel.create({
      _vehicle: newVehicle._id,
      entryTime: new Date(),
    });
    return stay;
  }

  // Verificar si el último aparcamiento no tiene un exitTime
  const lastStay = await StayModel.findOne({ _vehicle: vehicle._id }).sort({
    entryTime: -1,
  });

  if (lastStay && !lastStay.exitTime) {
    throw new Error("This vehicle already has an open stay.");
  }

  // Crear y devolver la nueva estancia
  const stay = await StayModel.create({
    _vehicle: vehicle._id,
    entryTime: new Date(),
  });

  return stay;
};

const registerExit = async (licensePlate: string) => {
  // Intentar encontrar el vehículo y la última estancia en una sola llamada
  const vehicle = await VehicleModel.findOne({ licensePlate });
  if (!vehicle) {
    throw new Error("This vehicle is not registered.");
  }

  const lastStay = await StayModel.findOne({ _vehicle: vehicle._id }).sort({ entryTime: -1 });
  if (!lastStay || lastStay.exitTime) {
    throw new Error("This vehicle has no open stay.");
  }

  // Calcular el tiempo de la estancia
  const currentTime = new Date();
  const durationInMinutes = (currentTime.getTime() - lastStay.entryTime.getTime()) / 6000;

  // Procesar según el tipo de vehículo
  await processExitByVehicleType(vehicle, lastStay, durationInMinutes);

  // Actualizar la estancia con el tiempo de salida
  lastStay.exitTime = currentTime;
  await lastStay.save();

  return lastStay;
};


const processExitByVehicleType = async (vehicle: IVehicle, stay: IStay, durationInMinutes: number) => {
  switch (vehicle.type) {
    case "official":
      // No hay acciones adicionales para vehículos oficiales
      break;
    case "resident":
      // Acumular el tiempo en el vehículo
      vehicle.accumulatedTime = (vehicle.accumulatedTime || 0) + durationInMinutes;
      await vehicle.save();
      break;
    case "non-resident":
      // Calcular el importe a pagar y guardarlo en la estancia
      const amountToPay = parseFloat((durationInMinutes * 0.5).toFixed(2)); // MXN$0.5 por minuto
      stay.amountPaid = amountToPay;
      break;
    default:
      throw new Error("Unknown vehicle type");
  }
};


// const getCars = async () => {
//   const responseItem = await VehicleModel.find({});
//   return responseItem;
// };

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

export { registerEntry, registerExit };
