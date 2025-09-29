import EstadisticasChart from '@/components/reports/EstadisticasChart';
import { MenuItem, SideMenu } from '@/components/SideMenu';
import { getNeighborhoods, getLatestPriceSurfaceReport } from '@/lib/mongo-client';
import PricePerSurface from '../../components/reports/PricePerSurface';
import { Neighborhood } from '@/models/neighborhood';
import { AveragePriceSurfaceReportItem } from '@/models/report';

const ChartsContent = ({ neighborhoods, surfacePrices }: { neighborhoods: Neighborhood[]; surfacePrices: AveragePriceSurfaceReportItem[] }) => {
    return (
        <>
            <div id="alquileres" className="mb-12">
                <EstadisticasChart neighborhoods={neighborhoods}></EstadisticasChart>
            </div>

            <div id="precios-m2" className="mb-12">
                <PricePerSurface neighborhoods={neighborhoods} surfacePrices={surfacePrices} />
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
        {
            name: 'Alquileres y expensas',
            link: '#alquileres',
        },
        {
            name: 'Precios m² de venta',
            link: '#precios-m2',
        },
    ];
    return (
        <>
            <div className="max-w-[1000px] mx-6 md:mx-auto mt-5 md:mt-10">
                <div className="grid grid-cols-12 ">
                    <nav className="hidden md:block max-h-screen overflow-y-auto border-b border-gray-200 mb-4 md:col-span-3 sticky top-0">
                        <SideMenu items={menu}></SideMenu>
                    </nav>
                    <main className="col-span-12 md:col-span-9  md:pl-15">
                        <ChartsContent neighborhoods={neighborhoods} surfacePrices={surfacePrices} />
                    </main>
                </div>
            </div>
        </>
    );
};

export default EstadisticasPage;
