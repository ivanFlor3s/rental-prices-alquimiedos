
import { getLatestMeanReport } from "@/lib/mongo-client";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const roomsFilter = searchParams.get("rooms") || "0";
    const neighborhoods = searchParams.get("neighborhoods")?.split(",") || [];
    const report = await getLatestMeanReport({ rooms: parseInt(roomsFilter) });
    if (!report) {
        return NextResponse.json({ error: "No report found" }, { status: 404 });
    }

    if (neighborhoods.length > 0) {
        console.log("Neighborhoods filter applied:", { roomsFilter, total: report.data.length });

        const result = report.data.filter(item => neighborhoods.includes(item.neighborhoodId.toString()));
        return NextResponse.json(result);
    }
}
