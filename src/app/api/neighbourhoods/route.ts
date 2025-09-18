import { getNeighborhoods } from "@/lib/mongo-client";
import { NextResponse } from "next/server";

export const GET = async () => {
    const neighborhoods = await getNeighborhoods();
    return NextResponse.json(neighborhoods);
}