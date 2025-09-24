'use client';
import { useEffect, useRef, useState } from 'react';
import { AveragePriceSurfaceReportItem } from '../../models/report';
import NeighboursSelector, { NeighbourItem } from './NeighboursSelector';
import Select from '../Select';

import { useCountUp } from 'react-countup';
import { MongoNeighborhoods, Neighborhood } from '@/models/neighborhood';
import { NameValue } from '@/models/name-value';

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
            <span className="font-concert-one text-teal-600 text-6xl md:text-8xl" ref={countUpRef}></span>
        </p>
    );
};

const PricePerSurface = ({ surfacePrices, neighborhoods }: { surfacePrices: AveragePriceSurfaceReportItem[]; neighborhoods: Neighborhood[] }) => {
    const [selection, setSelection] = useState<AveragePriceSurfaceReportItem>(surfacePrices[0]);

    const handleNeighbourChange = (selectedId: number) => {
        const selected = surfacePrices.find((item) => item.neighborhoodId === selectedId);
        if (selected) {
            setSelection(selected);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-light text-center mb-4 text-balance">Por m²</h1>

            <Select label="Barrio" placeholder="Selecciona un barrio" options={neighborhoods.map((n) => ({ value: n.id, name: n.name }))} onSelectionChange={handleNeighbourChange} />

            <Amount value={selection.averagePriceMM} />
            <p className="text-gray-400 text-sm text-center">
                <span className="text-gray-400 font-semibold">Promedio (media)</span>: refleja el valor promedio considerando todas las publicaciones.
            </p>
            <Amount value={selection.medianPriceMM} />
            <p className="text-gray-400 text-sm text-center">
                <span className="text-gray-400 font-semibold text-balance">Mediana</span>: representa el valor central de las publicaciones.
            </p>
        </div>
    );
};

export default PricePerSurface;
