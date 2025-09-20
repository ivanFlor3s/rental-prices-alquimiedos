import { useState } from 'react';
import { Chip } from '../Chip';

export interface NeighbourItem {
    id: number;
    name: string;
    selected: boolean;
}

const NeighboursSelector: React.FC<{ neighbourhoods: NeighbourItem[]; onSelectorChange: (selected: number[]) => void; single?: boolean }> = ({ neighbourhoods: neighbours, onSelectorChange, single }) => {
    const [selectedNeighbourId, setSelectedNeighbourId] = useState<number[]>([]);

    const handleChipClick = (id: number) => {
        if (single) {
            const newSelected = selectedNeighbourId.includes(id) ? [] : [id];
            setSelectedNeighbourId(newSelected);
            onSelectorChange(newSelected);
        } else {
            const newSelected = selectedNeighbourId.includes(id) ? selectedNeighbourId.filter((neighbourId) => neighbourId !== id) : [...selectedNeighbourId, id];
            setSelectedNeighbourId(newSelected);
            onSelectorChange(newSelected);
        }
    };

    return (
        <div className="flex flex-row items-baseline gap-3 overflow-x-auto flex-wrap">
            {neighbours.map((neighbour) => (
                <Chip key={neighbour.id} id={neighbour.id} label={neighbour.name} selected={selectedNeighbourId.includes(neighbour.id)} selectorChanged={handleChipClick} />
            ))}
        </div>
    );
};

export default NeighboursSelector;
