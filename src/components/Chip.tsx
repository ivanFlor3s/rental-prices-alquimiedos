'use client';

export const Chip = ({ id, label, selected, selectorChanged }: { id: string; label: string; selected: boolean; selectorChanged: (id: string) => void }) => {
    const handleClick = () => {
        selectorChanged(id);
    };

    return (
        <div onClick={handleClick} className={` px-3 py-1 rounded-full cursor-pointer text-nowrap text-sm font-medium ${selected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'}`}>
            {label}
        </div>
    );
};
