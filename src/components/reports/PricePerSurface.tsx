'use client';
import { useEffect, useRef, useState } from 'react';
import { AveragePriceSurfaceReportItem } from '../../models/report';
import NeighboursSelector, { NeighbourItem } from './NeighboursSelector';

import { useCountUp } from 'react-countup';

const Amount = ({ value }: { value: number }) => {
    const countUpRef = useRef<HTMLDivElement>({} as HTMLDivElement);
    const { update } = useCountUp({
        ref: countUpRef,
        end: value,
        duration: 0.5,
        formattingFn: (value) => `$${value.toLocaleString()} ARS`,
    });

    useEffect(() => {
        update(value);
    }, [value, update]);
    return (
        <p className="text-4xl font-bold text-gray-900 text-center mt-10">
            <div className="font-concert-one text-teal-600 text-6xl md:text-8xl" ref={countUpRef}></div>
        </p>
    );
};

const PricePerSurface = ({ surfacePrices }: { surfacePrices: AveragePriceSurfaceReportItem[] }) => {
    const [selection, setSelection] = useState<AveragePriceSurfaceReportItem>(surfacePrices[0]);

    const ns = surfacePrices.map((item) => ({ id: item.neighborhoodId, name: item.neighborhoodName, selected: false } as NeighbourItem));

    const handleNeighbourChange = (selectedIds: number[]) => {
        const selected = surfacePrices.find((item) => item.neighborhoodId === selectedIds[0]);
        if (selected) {
            setSelection(selected);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-light text-center mb-4 text-balance">Por m²</h1>

            <NeighboursSelector single={true} onSelectorChange={handleNeighbourChange} neighbourhoods={ns} />

            <Amount value={selection.averagePriceMM} />
            <Amount value={selection.medianPriceMM} />
        </div>
    );
};

export default PricePerSurface;
