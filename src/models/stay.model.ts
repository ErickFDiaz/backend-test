import { Schema, Types, model, Model,Document } from "mongoose";
import { IVehicle } from "./vehicle.model";
//import { User } from "../interfaces/user.interface";

export interface IStay extends Document {
  entryTime: Date;
  exitTime?: Date;
  amountPaid?: number;
  _vehicle: IVehicle["_id"];
}

const StaySchema = new Schema<IStay>(
  {
    _vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
    entryTime: { type: Date, required: true },
    exitTime: { type: Date },
    amountPaid: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const VehicleModel = model("stays", StaySchema);
export default VehicleModel;
