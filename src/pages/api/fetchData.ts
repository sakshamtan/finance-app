import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import axios from "axios";
import Stock from "../../models/Stock";

// Global variable to store data
let data: any[] = [];

const fetchData = async () => {
  try {
    const cryptoSymbols = [
      "bitcoin",
      "ethereum",
      "ripple",
      "litecoin",
      "bitcoin-cash",
    ];
    const promises = cryptoSymbols.map(
      (symbol) =>
        axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=inr&x_cg_demo_api_key=CG-6nizqwwsBWbCZaWJuS56ZNQh`
        )
      //   replce x_cg_demo_api_key with your newly generated one if this doesnt work, get your own api key from https://www.coingecko.com/en/developers/dashboard
    );

    const responses = await Promise.all(promises);
    const fetchedData = responses.map((response, index) => ({
      symbol: cryptoSymbols[index].toUpperCase(),
      price: response?.data[cryptoSymbols[index]].inr,
      timestamp: new Date(),
    }));

    for (const entry of fetchedData) {
      const stock = new Stock(entry);
      await stock.save();
    }

    // Update global data
    data = fetchedData;

    console.log("Data fetched and stored successfully");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Start the interval to fetch data every 5 seconds
setInterval(fetchData, 5000);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/finance",
      {
        dbName: "finance",
      }
    ); 
  }

  if (req.method === "POST") {
    await fetchData();
    res.status(200).json({ message: "Data fetched and stored successfully" });
  } else if (req.method === "GET") {
    res.status(200).json(data);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
