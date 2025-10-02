import ReportListItem, { ReportItem } from './ReportListItem';

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
    ];
    return (
        <div className="max-w-[600px] mx-6 md:mx-auto mt-5 md:mt-10">
            <div>
                {reports.map((report) => (
                    <ReportListItem key={report.id} {...report} />
                ))}
            </div>
        </div>
    );
}
