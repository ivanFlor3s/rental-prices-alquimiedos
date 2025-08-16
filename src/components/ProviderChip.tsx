interface ProviderChipProps {
    provider: string;
    variant?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'gray' | 'yellowMp';
    active?: boolean;
}

const colorVariants = {
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200',
    yellowMp: 'bg-yellow-300 text-[#171576] border-yellow-200',
};

export const ProviderChip = ({ provider, variant = 'gray', active = true }: ProviderChipProps) => {
    return (
        <div className={`${colorVariants[variant]} border text-sm font-medium px-2.5 py-0.5 rounded transition-colors ${active ? 'hover:opacity-80 hover:cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}>
            <span className="font-semibold">{provider}</span>
        </div>
    );
};
