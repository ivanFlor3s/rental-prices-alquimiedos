'use client';

import { useState } from 'react';
import CabaMap from '@/components/CabaMap';

export default function Home() {
    const [selectedBarrio, setSelectedBarrio] = useState<string>('');

    const handleBarrioPress = (barrioName: string) => {
        setSelectedBarrio(barrioName);
        console.log('Barrio seleccionado:', barrioName);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold underline mb-6">Mapa de CABA</h1>
            <CabaMap onBarrioPress={handleBarrioPress} selectedBarrio={selectedBarrio} width={800} height={600} className="rounded-lg shadow-lg" />

            {selectedBarrio && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h2 className="text-xl font-semibold">Información del barrio</h2>
                    <p>
                        Has seleccionado: <strong>{selectedBarrio}</strong>
                    </p>
                </div>
            )}
        </div>
    );
}
