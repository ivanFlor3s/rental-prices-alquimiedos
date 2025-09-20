export interface MongoReport<T> {
    metadata: Metadata
    labels: ChartLabels
    filter: ChartFilters
    data: T[]
}

export interface Metadata {
    generatedAt: Date
    totalDepartments: number
    totalNeighborhoods: number
    analysisType: string
}

export interface ChartLabels {
    x: string,
    y: string
}

export interface ChartFilters {
    rooms: number
}


export interface NeighborAverageReportItem {
    neighborhood: string
    neighborhoodId: number
    averageExpense: number
    averagePrice: number
    sample: number
}

export interface AveragePriceSurfaceReportItem {
    neighborhoodId: number
    neighborhoodName: string
    averagePriceMM: number,
    medianPriceMM: number
}
