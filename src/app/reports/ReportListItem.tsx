import ProviderImage from '@/components/ProviderImage';
import ReportTag from './ReportTag';

export interface ReportItem {
    id: number;
    period: Date;
    provider: string;
    location: string;
    operationType: string;
    propertyType: string;
}
export default function ReportListItem({ period, provider, location, operationType, propertyType }: ReportItem) {
    const formattedDate = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }).format(period);

    const formattedDateMobile = new Intl.DateTimeFormat('es-ES').format(period);

    return (
        <div className="border border-neutral-300  p-4 mb-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transition-colors">
            <div className="flex flex-row justify-between ">
                <ProviderImage provider={provider} />

                <span className="text-sm text-gray-500 hidden md:block"> {formattedDate}</span>
                <span className="text-sm text-gray-500 md:hidden"> {formattedDateMobile}</span>
            </div>
            <h2 className="text-xl font-semibold">{location}</h2>
            <div className="flex flex-row space-x-2 mt-2">
                <ReportTag value={operationType} />
                <ReportTag value={propertyType} />
            </div>
        </div>
    );
}
