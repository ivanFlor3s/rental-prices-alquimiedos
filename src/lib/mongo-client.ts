// lib/mongo.ts
import { MongoClient, Db } from "mongodb";
import { AveragePriceSurfaceReportItem, MongoReport, NeighborAverageReportItem } from "@/models/report";
import { MongoNeighborhoods } from "@/models/neighborhood";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:${process.env.MONGODB_PORT}`;


let client: MongoClient;


if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
const clientPromise = global._mongoClientPromise;

export async function getLatestMeanReport(filter: { rooms: number }): Promise<MongoReport<NeighborAverageReportItem> | null> {
  const client = await clientPromise;
  const db: Db = client.db(process.env.MONGO_INITDB_DATABASE || "rental_prices");

  const filtersForQuery = filter.rooms == 0 ? { "filters.rooms": null } : { "filters.rooms": filter.rooms };

  const latestReport = await db.collection<MongoReport<NeighborAverageReportItem>>("reports").findOne(
    { ...filtersForQuery, "metadata.analysisType": "mean prices" }, // ejemplo, depende de cómo guardaste la estructura
    { sort: { "metadata.generatedAt": -1 } });

  return latestReport;
}


export const getNeighborhoods = async (): Promise<MongoNeighborhoods | null> => {
  const client = await clientPromise;
  const db: Db = client.db(process.env.MONGO_INITDB_DATABASE || "rental_prices");
  const neighborhoods = await db.collection<MongoNeighborhoods>("neighborhoods").findOne({ "location": "CABA" });
  if (!neighborhoods) return null;
  return neighborhoods;
}

export const getLatestPriceSurfaceReport = async (): Promise<MongoReport<AveragePriceSurfaceReportItem> | null> => {
  const client = await clientPromise;
  const db: Db = client.db(process.env.MONGO_INITDB_DATABASE || "rental_prices");

  const latestReport = await db.collection<MongoReport<AveragePriceSurfaceReportItem>>("reports").findOne(
    { "metadata.analysisType": "surface" },
    { sort: { "metadata.generatedAt": -1 } }
  );

  return latestReport;
}