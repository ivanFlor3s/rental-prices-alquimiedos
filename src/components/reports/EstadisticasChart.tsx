'use client';
import { ResponsiveContainer, Bar, XAxis, YAxis, Legend, Tooltip, CartesianGrid, ComposedChart, BarChart } from 'recharts';
import NeighboursSelector from './NeighboursSelector';
import { useEffect, useState } from 'react';
import { Neighborhood as MongoNeighborhood } from '@/models/neighborhood';
import { NeighborAverageReportItem } from '@/models/report';
import RoomFilter from './RoomsFilter';

const StackedCheckbox = ({ stacked, setStacked }: { stacked: boolean; setStacked: (stacked: boolean) => void }) => {
    return (
        <label className="inline-flex items-center ml-4">
            <input type="checkbox" className="form-checkbox h-3 w-3 text-blue-600" checked={stacked} onChange={() => setStacked(!stacked)} />
            <span className="ml-2 text-gray-700">Barras apiladas</span>
        </label>
    );
};

const EstadisticasChart: React.FC<{ neighborhoods: MongoNeighborhood[] }> = ({ neighborhoods }) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [filter, setFilter] = useState<{ rooms: number }>({ rooms: 0 });
    const [chartData, setChartData] = useState<NeighborAverageReportItem[]>([]);
    const [stacked, setStacked] = useState(true);

    const handleNeighbourChange = (selectedIds: number[]) => {
        console.log('Barrios seleccionados:', selectedIds);
        setSelectedIds(selectedIds);
    };

    const fetchData = async (neighborhoods: number[], filter: { rooms: number }) => {
        const queryParams = new URLSearchParams();
        if (neighborhoods.length > 0) {
            queryParams.append('neighborhoods', neighborhoods.join(','));
        }
        if (filter.rooms) {
            queryParams.append('rooms', filter.rooms.toString());
        }
        const response = await fetch(`/api/reports?${decodeURIComponent(queryParams.toString())}`);
        try {
            const data = (await response.json()) as NeighborAverageReportItem[];
            setChartData(data);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
        // setChartData(data.sort((a, b) => a.average_price + a.average_expenses - (b.average_price + b.average_expenses)));
    };

    useEffect(() => {
        console.log('desencadeno');
        if (selectedIds.length > 0) {
            fetchData(selectedIds, filter);
        }
    }, [selectedIds, filter]);

    return (
        <div className="w-full">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Promedios de Alquiler y Expensas por Barrio</h2>
                <p className="text-gray-600">Comparación de costos de vivienda en diferentes barrios de CABA</p>
            </div>

            <RoomFilter onRoomsChange={(rooms) => setFilter({ rooms })} maxRooms={3} />
            {/* checkbox stacked */}
            <StackedCheckbox stacked={stacked} setStacked={setStacked} />

            <NeighboursSelector onSelectorChange={handleNeighbourChange} neighbourhoods={neighborhoods.map((n) => ({ id: n.id, name: n.name, selected: false }))} />

            {chartData.length > 0 && (
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        layout="vertical"
                        width={500}
                        height={500}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            bottom: 20,
                            left: 80,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value) => `$${value}`} domain={[0, 'dataMax']} />
                        <YAxis
                            dataKey="neighborhoodName"
                            type="category"
                            scale="band"
                            width={70}
                            tick={({ x, y, payload }) => (
                                <text x={x - 10} y={y + 60} textAnchor="end" fontSize={12}>
                                    {payload.value}
                                </text>
                            )}
                        />
                        <Tooltip formatter={(value, name) => [`$${value} ARS`, name === 'alquiler' ? 'Alquiler' : name === 'expensas' ? 'Expensas' : 'Total']} labelFormatter={(label) => `Barrio: ${label}`} />
                        <Legend formatter={(value) => (value === 'alquiler' ? 'Alquiler promedio' : value === 'expensas' ? 'Expensas promedio' : 'Total')} />
                        <Bar stackId={stacked ? 'a' : 'b'} dataKey="averagePrice" barSize={20} fill="#413ea0" name="alquiler" />
                        <Bar stackId="a" dataKey="averageExpense" barSize={20} fill="#ff7300" name="expensas" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default EstadisticasChart;
