'use client';
import { ResponsiveContainer, Bar, XAxis, YAxis, Legend, Tooltip, CartesianGrid, BarChart } from 'recharts';
import NeighboursSelector from './NeighboursSelector';
import { useEffect, useState } from 'react';
import { Neighborhood as MongoNeighborhood } from '@/models/neighborhood';
import { NeighborAverageReportItem } from '@/models/report';
import RoomFilter from './RoomsFilter';
import { RoomsFilterMobile } from './RoomsFilterMobile';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '@/lib/local-storage';
import { appConsts } from '@/models/app-consts';
import MultiSelect from '../MultiSelect';

const StackedCheckbox = ({ stacked, setStacked }: { stacked: boolean; setStacked: (stacked: boolean) => void }) => {
    return (
        <label className="inline-flex items-center ml-4">
            <input type="checkbox" className="form-checkbox h-3 w-3 text-blue-600" checked={stacked} onChange={() => setStacked(!stacked)} />
            <span className="ml-1 text-gray-700 text-xs">Barras apiladas</span>
        </label>
    );
};

const EstadisticasChart: React.FC<{ neighborhoods: MongoNeighborhood[] }> = ({ neighborhoods }) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [filter, setFilter] = useState<{ rooms: number }>({ rooms: 0 });
    const [chartData, setChartData] = useState<NeighborAverageReportItem[]>([]);
    const [stacked, setStacked] = useState(true);

    const handleNeighbourChange = (selectedIds: number[]) => {
        saveDataToLocalStorage(appConsts.LOCAL_STORAGE_KEYS.SELECTED_NEIGHBORHOODS, selectedIds);
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
    };

    useEffect(() => {
        const stored = getDataFromLocalStorage<number[]>(appConsts.LOCAL_STORAGE_KEYS.SELECTED_NEIGHBORHOODS, []);
        setSelectedIds(stored);
    }, []);

    useEffect(() => {
        if (selectedIds.length > 0) {
            fetchData(selectedIds, filter);
        }
    }, [selectedIds, filter]);

    return (
        <div className="w-full">
            <div className="mb-4">
                <h1 className="text-4xl font-light text-center mb-4 text-balance">Alquiler y Expensas </h1>
            </div>

            <div className="mb-5 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <MultiSelect label="Barrios" options={neighborhoods.map((n) => ({ value: n.id, name: n.name }))} onSelectionChange={handleNeighbourChange} selectedOptions={selectedIds} placeholder="Seleccionar barrios" />
                </div>
                <RoomsFilterMobile onRoomsChange={(rooms) => setFilter({ rooms })} maxRooms={3} />
            </div>

            {chartData.length > 0 && selectedIds.length > 0 && (
                <>
                    <StackedCheckbox stacked={stacked} setStacked={setStacked} />
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
                                left: 20,
                            }}
                        >
                            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                            <XAxis type="number" tickFormatter={(value) => `$${value}`} domain={[0, 'dataMax']} />
                            <YAxis
                                dataKey="neighborhoodName"
                                type="category"
                                width={70}
                                tick={({ x, y, payload }) => (
                                    <text x={x - 10} y={y} textAnchor="end" fontSize={12}>
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
                </>
            )}
        </div>
    );
};

export default EstadisticasChart;
