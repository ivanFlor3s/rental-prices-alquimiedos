'use client';
import { useEffect, useRef, useState } from 'react';
import { AveragePriceSurfaceReportItem } from '../../models/report';
import Select from '../Select';

import { useCountUp } from 'react-countup';
import { Neighborhood } from '@/models/neighborhood';
import { SurfacePricesTable } from './SurfacePricesTable';

export const Amount = ({ value, variant }: { value: number; variant: 'currency' | 'plain' | 'table' }) => {
    const countUpRef = useRef<HTMLDivElement>({} as HTMLDivElement);

    const variants = {
        currency: {
            formatting: (value: number) => `$${value.toLocaleString()} ARS`,
            classes: 'font-concert-one text-teal-600 text-6xl md:text-8xl',
        },
        plain: {
            formatting: (value: number) => value.toLocaleString(),
            classes: 'font-concert-one text-blue-600 text-4xl md:text-6xl',
        },
        table: {
            formatting: (value: number) => `$${value.toLocaleString()} ARS`,
            classes: 'font-concert-one text-teal-700 text-md text-gray-500',
        },
    };

    const { update } = useCountUp({
        ref: countUpRef,
        end: value,
        duration: 0.5,
        formattingFn: variants[variant].formatting,
    });

    const classes = variants[variant].classes;

    useEffect(() => {
        update(value);
    }, [value, update]);
    return <span className={classes} ref={countUpRef}></span>;
};

const PricePerSurface = ({ surfacePrices, neighborhoods }: { surfacePrices: AveragePriceSurfaceReportItem[]; neighborhoods: Neighborhood[] }) => {
    const [selection, setSelection] = useState<AveragePriceSurfaceReportItem | null>(null);

    const [filteredPrices, setFilteredPrices] = useState<AveragePriceSurfaceReportItem[]>(surfacePrices);

    const handleNeighbourChange = (selectedId: number | null) => {
        const selected = surfacePrices.find((item) => item.neighborhoodId === selectedId);
        setSelection(selected || null);
    };

    useEffect(() => {
        if (selection) {
            setFilteredPrices(surfacePrices.filter((price) => price.neighborhoodId === selection.neighborhoodId));
        } else {
            setFilteredPrices(surfacePrices);
        }
    }, [selection, surfacePrices]);

    return (
        <div>
            <h1 className="text-4xl font-light text-center mb-4 text-balance">Superficie (valor por m²) </h1>

            <div className="w-full md:w-1/2 mb-8">
                <Select label="" placeholder="Selecciona un barrio" options={neighborhoods.map((n) => ({ value: n.id, name: n.name }))} onSelectionChange={handleNeighbourChange} />
            </div>
            <SurfacePricesTable prices={filteredPrices} />
        </div>
    );
};

export default PricePerSurface;
