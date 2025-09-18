import EstadisticasChart from '@/components/reports/EstadisticasChart';
import { MenuItem, SideMenu } from '@/components/SideMenu';
import { getNeighborhoods } from '@/lib/mongo-client';

const EstadisticasPage = async () => {
    const neighborhoodsFromDb = await getNeighborhoods();
    const neighborhoods = neighborhoodsFromDb ? neighborhoodsFromDb.neighborhoods : [];

    const menu: MenuItem[] = [
        { name: 'Introducción', link: '#introduccion' },
        {
            name: 'Alquileres',
            link: '#alquileres',
            children: [
                { name: 'Progresión histórica', link: '#progresion-historica' },
                { name: 'Por barrio', link: '#alquileres-por-barrio' },
                { name: 'Por m²', link: '#alquileres-m2' },
                { name: 'Por ambientes', link: '#alquileres-ambientes' },
                { name: 'Con/ sin gastos', link: '#alquileres-gastos' },
                { name: 'Ranking de barrios', link: '#ranking-barrios' },
            ],
        },
        { name: 'Metodología', link: '#metodologia' },
    ];
    return (
        <>
            <div className="bg-purple-700 text-white p-4 mb-6">
                <h1 className="text-lg font-bold text-center">Resultados analisis alquileres CABA</h1>
            </div>
            <div className="max-w-[1000px] mx-auto ">
                <div className="grid grid-cols-12 ">
                    <nav className="max-h-screen overflow-y-auto border-b border-gray-200 mb-4 col-span-3 sticky top-0">
                        <SideMenu items={menu}></SideMenu>
                    </nav>
                    <main className="col-span-9 pl-15">
                        <EstadisticasChart neighborhoods={neighborhoods}></EstadisticasChart>
                        <EstadisticasChart neighborhoods={neighborhoods}></EstadisticasChart>
                        <EstadisticasChart neighborhoods={neighborhoods}></EstadisticasChart>
                        <EstadisticasChart neighborhoods={neighborhoods}></EstadisticasChart>
                    </main>
                </div>
            </div>
        </>
    );
};

export default EstadisticasPage;
