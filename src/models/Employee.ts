import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  position: string;
  salary: number;
  city: string;
}

const EmployeeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
