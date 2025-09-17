export interface MongoReport {
    metadata: Metadata
    charts: Charts
}

export interface Metadata {
    generated_at: Date
    total_departments: number
    total_neighborhoods: number
    analysis_type: string
}

export interface Charts {
    prices_expenses_by_neighborhood: AveragePrices
}

export interface AveragePrices {
    title: string
    y_axis_label: string
    x_axis_label: string
    data: NeighborAverageReportItem[]
}

export interface NeighborAverageReportItem {
    neighborhood: string
    neighborhoodId: number
    average_expenses: number
    average_price: number
    count: number
}
