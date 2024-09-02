import { Schema, Types, model, Model, Document } from "mongoose";

export type VehicleType = "official" | "resident" | "non-resident";

export interface IVehicle extends Document {
  licensePlate: string;
  type: VehicleType;
  accumulatedTime?: number;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    licensePlate: {
      required: true,
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["official", "resident", "non-resident"],
    },
    accumulatedTime: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const VehicleModel = model("vehicles", VehicleSchema);
export default VehicleModel;
