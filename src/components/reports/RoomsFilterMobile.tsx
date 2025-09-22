import { useState } from 'react';
import { RoomFilterProps } from './RoomsFilter';

export const RoomsFilterMobile: React.FC<RoomFilterProps> = ({ maxRooms, selectedRoom, onRoomsChange }) => {
    const [selection, setSelection] = useState<number>(selectedRoom || 0);
    const handleRoomToggle = (rooms: number) => {
        if (selection === rooms) {
            rooms = 0;
        }
        onRoomsChange(rooms);
        setSelection(rooms);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ambientes</label>

            <div className="flex flex-row flex-wrap gap-2">
                {[...Array(maxRooms)].map((_, index) => {
                    const roomNumber = index + 1;
                    const isSelected = selection === roomNumber;
                    return (
                        <button
                            key={roomNumber}
                            type="button"
                            onClick={() => handleRoomToggle(roomNumber)}
                            className={`
                                px-3 py-1
                                cursor-pointer 
                                transition-colors duration-150
                                  rounded-md text-sm font-medium
                                ${isSelected ? 'border-blue-300 bg-blue-500 text-white' : ' bg-blue-200 text-blue-800 hover:bg-blue-300 '}          
                            `}
                        >
                            {roomNumber}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
