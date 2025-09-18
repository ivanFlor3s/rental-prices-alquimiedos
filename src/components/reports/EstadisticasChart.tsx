'use client';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Text, Legend, Tooltip, Line, Area, CartesianGrid, ComposedChart } from 'recharts';
import NeighboursSelector from './NeighboursSelector';
import { useEffect, useState } from 'react';
import { Neighborhood as MongoNeighborhood } from '@/models/neighborhood';
import { NeighborAverageReportItem } from '@/models/report';
import RoomFilter from './RoomsFilter';

const EstadisticasChart: React.FC<{ neighborhoods: MongoNeighborhood[] }> = ({ neighborhoods }) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [filter, setFilter] = useState<{ rooms: number }>({ rooms: 0 });
    const [chartData, setChartData] = useState<NeighborAverageReportItem[]>([]);

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
        fetchData(selectedIds, filter);
    }, [selectedIds, filter]);

    return (
        <div className="w-full">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Promedios de Alquiler y Expensas por Barrio</h2>
                <p className="text-gray-600">Comparación de costos de vivienda en diferentes barrios de CABA (en USD)</p>
            </div>

            <RoomFilter onRoomsChange={(rooms) => setFilter({ rooms })} maxRooms={3} />

            <NeighboursSelector onSelectorChange={handleNeighbourChange} neighbourhoods={neighborhoods.map((n) => ({ id: n.id, name: n.name, selected: false }))} />

            {chartData.length > 0 && (
                <ResponsiveContainer width="100%" height={500}>
                    <ComposedChart
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
                        <YAxis dataKey="neighborhoodName" type="category" scale="band" width={70} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(value, name) => [`$${value} USD`, name === 'alquiler' ? 'Alquiler' : name === 'expensas' ? 'Expensas' : 'Total']} labelFormatter={(label) => `Barrio: ${label}`} />
                        <Legend formatter={(value) => (value === 'alquiler' ? 'Alquiler promedio' : value === 'expensas' ? 'Expensas promedio' : 'Total')} />
                        <Bar stackId="a" dataKey="averagePrice" barSize={20} fill="#413ea0" name="alquiler" />
                        <Bar stackId="a" dataKey="averageExpense" barSize={20} fill="#ff7300" name="expensas" />
                    </ComposedChart>
                </ResponsiveContainer>
            )}

            {/* Información adicional */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Alquiler más alto</h3>
                    <p className="text-xl font-bold text-blue-700">Puerto Madero</p>
                    <p className="text-sm text-blue-600">$1,800 USD promedio</p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h3 className="font-semibold text-red-900 mb-2">Expensas más altas</h3>
                    <p className="text-xl font-bold text-red-700">Puerto Madero</p>
                    <p className="text-sm text-red-600">$450 USD promedio</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2">Mejor relación precio</h3>
                    <p className="text-xl font-bold text-green-700">Caballito</p>
                    <p className="text-sm text-green-600">$930 USD total</p>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasChart;
