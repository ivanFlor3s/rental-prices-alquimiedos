'use client';
import { useState } from 'react';
import { AveragePriceSurfaceReportItem } from '@/models/report';
import { Amount } from './PricePerSurface';
import { LucideAArrowDown, LucideAArrowUp, LucideArrowDown01, LucideArrowUp01 } from 'lucide-react';

type SortKey = 'neighborhoodName' | 'averagePriceMM' | 'medianPriceMM';
type SortOrder = 'asc' | 'desc' | 'none';

const SortHeaderIcon = ({ sortOrder = 'none', type }: { sortOrder: SortOrder; type: 'number' | 'string' }) => {
    const icons = {
        string: {
            asc: <LucideAArrowUp className="h-5 w-5"></LucideAArrowUp>,
            desc: <LucideAArrowDown className="h-5 w-5"></LucideAArrowDown>,
            none: <LucideAArrowUp className="text-gray-300 h-5 w-5"></LucideAArrowUp>,
        },
        number: {
            asc: <LucideArrowUp01 className="h-5 w-5"></LucideArrowUp01>,
            desc: <LucideArrowDown01 className="h-5 w-5"></LucideArrowDown01>,
            none: <LucideArrowUp01 className="text-gray-300 h-5 w-5"></LucideArrowUp01>,
        },
    };

    return icons[type][sortOrder];
};

export const SurfacePricesTable = ({ prices }: { prices: AveragePriceSurfaceReportItem[] }) => {
    const [sortKey, setSortKey] = useState<SortKey>('neighborhoodName');
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('desc');
        }
    };

    const sortedPrices = [...prices].sort((a, b) => {
        const aValue: string | number = a[sortKey];
        const bValue: string | number = b[sortKey];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
    });

    return (
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('neighborhoodName')}>
                            <div className="flex flex-row gap-x-2 items-center">
                                <span>Barrio</span>
                                <SortHeaderIcon sortOrder={sortKey === 'neighborhoodName' ? sortOrder : 'none'} type="string" />
                            </div>
                        </th>
                        <th scope="col" className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('averagePriceMM')}>
                            <div className="flex flex-row gap-x-2 items-center">
                                <span>Precio m²</span>
                                <SortHeaderIcon sortOrder={sortKey === 'averagePriceMM' ? sortOrder : 'none'} type="number" />
                            </div>
                        </th>
                        <th scope="col" className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('medianPriceMM')}>
                            <div className="flex flex-row gap-x-2 items-center">
                                <span>Precio m² (mediana)</span>
                                <SortHeaderIcon sortOrder={sortKey === 'medianPriceMM' ? sortOrder : 'none'} type="number" />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedPrices.map((price) => (
                        <tr key={price.neighborhoodId}>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">{price.neighborhoodName}</td>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                <Amount variant="table" value={price.averagePriceMM}></Amount>
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                <Amount variant="table" value={price.medianPriceMM}></Amount>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
