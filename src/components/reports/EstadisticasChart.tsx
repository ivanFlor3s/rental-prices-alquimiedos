'use client';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Text, Legend, Tooltip, Line, Area, CartesianGrid, ComposedChart } from 'recharts';
import NeighboursSelector from './NeighboursSelector';
import { useEffect, useState } from 'react';
import { Neighborhood as MongoNeighborhood } from '@/models/neighborhood';
import { NeighborAverageReportItem } from '@/models/report';

const EstadisticasChart: React.FC<{ neighborhoods: MongoNeighborhood[] }> = ({ neighborhoods }) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [chartData, setChartData] = useState<NeighborAverageReportItem[]>([]);

    const handleNeighbourChange = (selectedIds: number[]) => {
        console.log('Barrios seleccionados:', selectedIds);
        setSelectedIds(selectedIds);
    };

    const fetchData = async (neighborhoods: number[]) => {
        const response = await fetch(`/api/reports?neighborhoods=${neighborhoods.join(',')}`);
        const data = await response.json();
        setChartData(data);
    };

    useEffect(() => {
        fetchData(selectedIds);
    }, [selectedIds]);

    return (
        <div className="w-full">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Promedios de Alquiler y Expensas por Barrio</h2>
                <p className="text-gray-600">Comparación de costos de vivienda en diferentes barrios de CABA (en USD)</p>
            </div>

            <NeighboursSelector onSelectorChange={handleNeighbourChange} neighbourhoods={neighborhoods.map((n) => ({ id: n.id, name: n.name, selected: false }))} />

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
                    <YAxis dataKey="neighborhood" type="category" scale="band" width={70} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value, name) => [`$${value} USD`, name === 'alquiler' ? 'Alquiler' : name === 'expensas' ? 'Expensas' : 'Total']} labelFormatter={(label) => `Barrio: ${label}`} />
                    <Legend formatter={(value) => (value === 'alquiler' ? 'Alquiler promedio' : value === 'expensas' ? 'Expensas promedio' : 'Total')} />
                    <Bar stackId="a" dataKey="average_price" barSize={20} fill="#413ea0" name="alquiler" />
                    <Bar stackId="a" dataKey="average_expenses" barSize={20} fill="#ff7300" name="expensas" />
                </ComposedChart>
            </ResponsiveContainer>

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
