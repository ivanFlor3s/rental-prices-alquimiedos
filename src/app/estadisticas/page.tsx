import EstadisticasChart from '@/components/reports/EstadisticasChart';
import { MenuItem, SideMenu } from '@/components/SideMenu';
import { getNeighborhoods, getLatestPriceSurfaceReport } from '@/lib/mongo-client';
import Introduction from '../../components/reports/Introduccion';
import PricePerSurface from '../../components/reports/PricePerSurface';
import { Neighborhood } from '@/models/neighborhood';
import { AveragePriceSurfaceReportItem } from '@/models/report';

const ChartsContent = ({ neighborhoods, surfacePrices }: { neighborhoods: Neighborhood[]; surfacePrices: AveragePriceSurfaceReportItem[] }) => {
    return (
        <>
            <div id="introduccion">
                <Introduction />
            </div>
            <div id="alquileres" className="mb-12">
                <EstadisticasChart neighborhoods={neighborhoods}></EstadisticasChart>
            </div>

            <div id="precios-m2" className="mb-12">
                <PricePerSurface surfacePrices={surfacePrices} />
            </div>
        </>
    );
};

const EstadisticasPage = async () => {
    const neighborhoodsFromDb = await getNeighborhoods();
    const surfacePricesFromDb = await getLatestPriceSurfaceReport();

    const surfacePrices = surfacePricesFromDb ? surfacePricesFromDb.data : [];
    const neighborhoods = neighborhoodsFromDb ? neighborhoodsFromDb.neighborhoods : [];

    const menu: MenuItem[] = [
        { name: 'Introducción', link: '#introduccion' },
        {
            name: 'Alquileres y expensas',
            link: '#alquileres',
        },
        {
            name: 'Precios m² de venta',
            link: '#precios-m2',
        },
        { name: 'Metodología', link: '#metodologia' },
    ];
    return (
        <>
            <div className=" text-white p-4 mb-6 bg-gradient-to-r from-purple-500 via-purple-800 to-purple-900">
                <h1 className="text-4xl font-bold text-center ">Resultados analisis alquileres CABA</h1>
            </div>
            <div className="max-w-[1000px] mx-auto ">
                <div className="hidden md:grid grid-cols-12 ">
                    <nav className="max-h-screen overflow-y-auto border-b border-gray-200 mb-4 col-span-3 sticky top-0">
                        <SideMenu items={menu}></SideMenu>
                    </nav>
                    <main className="col-span-9 pl-15">
                        <ChartsContent neighborhoods={neighborhoods} surfacePrices={surfacePrices} />
                    </main>
                </div>
                <div className="md:hidden px-10">
                    <main>
                        <ChartsContent neighborhoods={neighborhoods} surfacePrices={surfacePrices} />
                    </main>
                </div>
            </div>
        </>
    );
};

export default EstadisticasPage;
