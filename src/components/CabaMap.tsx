'use client';

import React, { useState, useEffect } from 'react';
import barriosGeoData from '../../barrios-geo.json';
import { useRouter } from 'next/navigation';

interface CabaMapProps {
    onBarrioPress?: (barrioName: string) => void;
    selectedBarrio?: string;
    width?: number;
    height?: number;
    className?: string;
}

interface Barrio {
    name: string;
    path: string;
    centroid: { x: number; y: number };
    properties: {
        id: number;
        objeto: string;
        nombre: string;
        comuna: number;
        perimetro_: number;
        area_metro: number;
    };
}

const CabaMap: React.FC<CabaMapProps> = ({ selectedBarrio, width = 800, height = 600, className }) => {
    const [barrios, setBarrios] = useState<Barrio[]>([]);
    const router = useRouter();
    const onBarrioPress = (barrioName: string) => {
        router.push(`/barrio/${barrioName}`);
    };

    useEffect(() => {
        const processGeoJSONData = () => {
            let minLon = Infinity,
                maxLon = -Infinity;
            let minLat = Infinity,
                maxLat = -Infinity;

            // Calcular bounds de todas las coordenadas
            barriosGeoData.features.forEach((feature) => {
                if (feature.geometry.type === 'Polygon') {
                    feature.geometry.coordinates[0].forEach((coord) => {
                        const [lon, lat] = coord;
                        minLon = Math.min(minLon, lon);
                        maxLon = Math.max(maxLon, lon);
                        minLat = Math.min(minLat, lat);
                        maxLat = Math.max(maxLat, lat);
                    });
                }
            });

            // Función para convertir coordenadas geográficas a SVG
            const coordToSVG = (lon: number, lat: number) => {
                const padding = 20;
                const svgWidth = width - 2 * padding;
                const svgHeight = height - 2 * padding;

                const x = padding + ((lon - minLon) / (maxLon - minLon)) * svgWidth;
                const y = height - padding - ((lat - minLat) / (maxLat - minLat)) * svgHeight;

                return { x, y };
            };

            // Procesar cada barrio
            const processedBarrios: Barrio[] = barriosGeoData.features.map((feature) => {
                let pathData = '';
                let centroidX = 0,
                    centroidY = 0,
                    pointCount = 0;

                if (feature.geometry.type === 'Polygon') {
                    feature.geometry.coordinates.forEach((ring) => {
                        ring.forEach((coord, coordIndex) => {
                            const [lon, lat] = coord;
                            const { x, y } = coordToSVG(lon, lat);

                            if (coordIndex === 0) {
                                pathData += `M ${x} ${y} `;
                            } else {
                                pathData += `L ${x} ${y} `;
                            }

                            // Calcular centroide
                            centroidX += x;
                            centroidY += y;
                            pointCount++;
                        });
                        pathData += 'Z ';
                    });
                }

                return {
                    name: feature.properties.nombre || 'Sin nombre',
                    path: pathData,
                    centroid: {
                        x: centroidX / pointCount,
                        y: centroidY / pointCount,
                    },
                    properties: feature.properties,
                };
            });

            setBarrios(processedBarrios);
        };

        processGeoJSONData();
    }, [width, height]);

    const getBarrioColor = (barrioName: string) => {
        if (selectedBarrio === barrioName) {
            return '#FF6B6B';
        }
        return '#E8F4FD';
    };

    const getStrokeColor = (barrioName: string) => {
        if (selectedBarrio === barrioName) {
            return '#FF4757';
        }
        return '#2C5F2D';
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <g>
                    {barrios.map((barrio) => (
                        <g key={barrio.name}>
                            <path
                                d={barrio.path}
                                fill={getBarrioColor(barrio.name)}
                                stroke={getStrokeColor(barrio.name)}
                                strokeWidth="1"
                                opacity={selectedBarrio === barrio.name ? 1 : 0.8}
                                className="cursor-pointer hover:opacity-100 transition-all duration-200"
                                onClick={() => onBarrioPress?.(barrio.name)}
                            />
                        </g>
                    ))}
                </g>
            </svg>

            {/* Leyenda opcional */}
            {selectedBarrio && (
                <div className="mt-4 px-5">
                    <p className="text-center text-lg font-bold text-green-800">Barrio seleccionado: {selectedBarrio == 'Boca' ? 'Boca '.repeat(3) : selectedBarrio}</p>
                </div>
            )}
        </div>
    );
};

export default CabaMap;
