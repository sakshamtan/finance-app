import mongoose, { Document, Schema } from "mongoose";

interface IStock extends Document {
  symbol: string;
  price: number;
  timestamp: Date;
}

const stockSchema = new Schema<IStock>({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Stock =
  mongoose.models.Stock || mongoose.model<IStock>("Stock", stockSchema);
export default Stock;
