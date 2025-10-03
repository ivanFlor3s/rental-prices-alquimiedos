import ReportListItem, { ReportItem } from './ReportListItem';
import ReportFilters from './ReportFilters';

export default function Reports() {
    const reports: ReportItem[] = [
        {
            id: 1,
            period: new Date(),
            provider: 'Zonaprop',
            location: 'CABA',
            operationType: 'Comprar',
            propertyType: 'Casa',
        },
        {
            id: 2,
            period: new Date(),
            provider: 'Zonaprop',
            location: 'Provincia Buenos Aires',
            operationType: 'Alquilar',
            propertyType: 'Departamento',
        },
        {
            id: 3,
            period: new Date(),
            provider: 'ArgenProp',
            location: 'CABA',
            operationType: 'Comprar',
            propertyType: 'Casa',
        },
        {
            id: 4,
            period: new Date(),
            provider: 'ArgenProp',
            location: 'CABA',
            operationType: 'Comprar',
            propertyType: 'Casa',
        },
        {
            id: 5,
            period: new Date(),
            provider: 'ArgenProp',
            location: 'CABA',
            operationType: 'Comprar',
            propertyType: 'Casa',
        },
        {
            id: 6,
            period: new Date(),
            provider: 'ArgenProp',
            location: 'CABA',
            operationType: 'Comprar',
            propertyType: 'Casa',
        },
        {
            id: 7,
            period: new Date(),
            provider: 'ArgenProp',
            location: 'CABA',
            operationType: 'Comprar',
            propertyType: 'Casa',
        },
        {
            id: 8,
            period: new Date(),
            provider: 'ArgenProp',
            location: 'CABA',
            operationType: 'Comprar',
            propertyType: 'Casa',
        },
    ];
    return (
        <>
            <div className="max-w-[1000px] mx-6 md:mx-auto mt-5 md:mt-10">
                <div className="grid grid-cols-12 ">
                    <div className="col-span-4 mr-8">
                        <ReportFilters />
                    </div>

                    <div className="col-span-8">
                        {reports.map((report) => (
                            <ReportListItem key={report.id} {...report} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
