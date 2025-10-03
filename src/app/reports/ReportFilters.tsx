'use client';

import { NameValue } from '@/models/name-value';
import Select from '../../components/Select';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface Filters {
    search?: string;
    operationType?: string;
    propertyType?: string;
    provider?: string;
}

const ReportFilters = () => {
    const operations: NameValue<string>[] = [
        { name: 'Comprar', value: 'comprar' },
        { name: 'Alquilar', value: 'alquilar' },
    ];
    const propertyTypes: NameValue<string>[] = [
        { name: 'Casa', value: 'casa' },
        { name: 'Departamento', value: 'departamento' },
    ];

    const providers: NameValue<string>[] = [
        { name: 'Zonaprop', value: 'zonaprop' },
        { name: 'Argenprop', value: 'argenprop' },
    ];

    const router = useRouter();
    const pathname = usePathname();

    const [filters, setFilters] = useState<Filters>({});

    const updateFilters = (value: string, key: keyof Filters) => {
        setFilters((prev) => {
            const newFilters = { ...prev };

            if (!value) {
                delete newFilters[key]; // ✅ eliminar filtro vacío
            } else {
                newFilters[key] = value;
            }

            return newFilters;
        });
    };

    const handleSubmit = () => {
        const params = new URLSearchParams();

        if (Object.keys(filters).length === 0) {
            console.log('limpio');
            clearFilters();
            return;
        }

        // Setear solo los que tengan valor
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });

        const queryString = params.toString();
        router.push(queryString ? `/reports?${queryString}` : '/reports'); // ✅ si no hay filtros, sacamos el "?"
    };

    const clearFilters = () => {
        // Limpia estado local de filtros
        setFilters({});
        // Navega a la ruta base sin query params
        router.replace(pathname);
    };

    return (
        <div className="">
            {/* INPUT FILTER */}

            <label className="block text-sm font-medium text-gray-700" htmlFor="search">
                Buscar
            </label>
            <input
                onChange={(e) => updateFilters(e.target.value, 'search')}
                type="text"
                id="search"
                placeholder="Buscar por..."
                className="border border-gray-300 px-2 py-1 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />

            <div className="flex flex-col gap-y-2 md:gap-y-3">
                {/* SELECT OPERACION */}
                <Select<string> placeholder="" label="Operación" options={operations} onSelectionChange={(value) => updateFilters(value?.toString() || '', 'operationType')} />

                {/* SELECT TIPO DE PROPIEDAD */}
                <Select<string> placeholder="" label="Tipo de Propiedad" options={propertyTypes} onSelectionChange={(value) => updateFilters(value?.toString() || '', 'propertyType')} />

                {/* SELECT PROVEEDOR */}
                <Select<string> placeholder="" label="Proveedor" options={providers} onSelectionChange={(value) => updateFilters(value?.toString() || '', 'provider')} />
                {/* BUTTONS */}
                <div className="flex justify-end">
                    <button type="button" className="bg-blue-500  px-2 py-1 rounded-md" onClick={handleSubmit}>
                        <span className="text-xs text-white uppercase font-light cursor-pointer">Aplicar Filtros</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportFilters;
