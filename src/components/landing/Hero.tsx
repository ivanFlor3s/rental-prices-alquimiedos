import { ArrowRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Introduction from '../reports/Introduccion';

const Hero = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            Información de Precios
                            <span className="text-primary block">Inmobiliarios</span>
                        </h1>
                        <Introduction />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/estadisticas"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap  bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Ver Último Reporte
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/historico"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-gray-300 bg-neutral-50 text-gray-700 hover:bg-neutral-100 hover:border-gray-400 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            <TrendingUp className="h-4 w-4" />
                            Explorar Histórico
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <Image src="/buildings.jfif" alt="Vista de edificios y skyline de la ciudad" className="w-full h-[400px] lg:h-[500px] object-cover" width={1080} height={500} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
