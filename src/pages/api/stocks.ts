import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Stock from "../../models/Stock";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/finance", {
      dbName: "finance",
    });
  }

  const { symbol } = req.query;
  const data = await Stock.find({ symbol: (symbol as string).toUpperCase() })
    .sort({ timestamp: -1 })
    .limit(20);
  res.json(data);
};

export default handler;
