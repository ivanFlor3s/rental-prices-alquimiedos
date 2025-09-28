'use client';
import { AveragePriceSurfaceReportItem } from '@/models/report';
import { Amount } from './PricePerSurface';
import { useEffect } from 'react';

export const SurfacePricesTable = ({ prices }: { prices: AveragePriceSurfaceReportItem[] }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Barrio
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio m²
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio m² (mediana)
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {prices.map((price) => (
                    <tr key={price.neighborhoodId}>
                        <td className="px-6 py-4  text-left whitespace-nowrap text-sm text-gray-500">{price.neighborhoodName}</td>
                        <td className="px-6 py-4  text-left whitespace-nowrap text-sm text-gray-500">
                            <Amount variant="table" value={price.averagePriceMM}></Amount>
                        </td>
                        <td className="px-6 py-4 text-left  whitespace-nowrap text-sm text-gray-500">
                            <Amount variant="table" value={price.medianPriceMM}></Amount>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
