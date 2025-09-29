import { useState } from 'react';
import { Chip } from '../Chip';

export interface NeighbourItem {
    id: number;
    name: string;
    selected: boolean;
}

const NeighboursSelector: React.FC<{ neighbourhoods: NeighbourItem[]; onSelectorChange: (selected: number[]) => void; selectedNeighbourId: number[]; single?: boolean }> = ({
    neighbourhoods: neighbours,
    onSelectorChange,
    single,
    selectedNeighbourId,
}) => {
    const handleChipClick = (id: number) => {
        if (single) {
            const newSelected = selectedNeighbourId.includes(id) ? [] : [id];
            onSelectorChange(newSelected);
        } else {
            const newSelected = selectedNeighbourId.includes(id) ? selectedNeighbourId.filter((neighbourId) => neighbourId !== id) : [...selectedNeighbourId, id];
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
