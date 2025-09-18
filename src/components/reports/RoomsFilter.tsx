'use client';

import React, { useEffect, useState } from 'react';

interface RoomFilterProps {
    maxRooms: number;
    selectedRoom?: number;
    onRoomsChange: (rooms: number) => void;
    multiSelect?: boolean;
    placeholder?: string;
}

const RoomFilter: React.FC<RoomFilterProps> = ({ maxRooms, selectedRoom, onRoomsChange, placeholder = 'Seleccionar ambientes' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState(placeholder);
    const [selection, setSelection] = useState<number>(selectedRoom || 0);

    const handleRoomToggle = (rooms: number) => {
        onRoomsChange(rooms);
        setIsOpen(false);
        setSelection(rooms);
        setInputText(rooms === 1 ? `${rooms} ambiente` : `${rooms} ambientes`);
    };

    const clearSelection = () => {
        onRoomsChange(0);
        setSelection(0);
        setInputText(placeholder);
    };

    useEffect(() => {
        if (selectedRoom) {
            setInputText(selectedRoom === 1 ? `${selectedRoom} ambiente` : `${selectedRoom} ambientes`);
        } else {
            setInputText(placeholder);
        }
    }, [selectedRoom, placeholder]);

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ambientes</label>

            {/* Selector principal */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full bg-white border rounded-lg px-4 py-2 text-left shadow-sm cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        transition-all duration-200 hover:border-gray-400
                        ${selection ? 'border-blue-300 bg-blue-50' : 'border-gray-300'}
                        ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
                    `}
                >
                    <div className="flex items-center justify-between">
                        <span className={` flex flex-row items-center ${selection ? 'text-blue-900 font-medium' : 'text-gray-500'}`}>
                            {inputText}

                            {selection !== 0 && (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearSelection();
                                    }}
                                    className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                                >
                                    <span className="text-xs hover:underline">Remover</span>
                                </div>
                            )}
                        </span>

                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-400 transition-transform duration-200" viewBox="0 0 24 24">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} fill="none" />
                            </svg>
                        </div>
                    </div>
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {/* Opciones de ambientes */}
                        <div className="py-1">
                            {[...Array(maxRooms)].map((_, i) => {
                                const room = i + 1;
                                const isSelected = selection && selection === room;

                                return (
                                    <button
                                        key={room}
                                        type="button"
                                        onClick={() => handleRoomToggle(room)}
                                        className={`
                                            w-full px-4 py-3 text-left  
                                            transition-colors duration-150 flex items-center justify-between
                                            ${isSelected ? 'bg-blue-100 text-blue-900' : 'text-gray-900 hover:bg-gray-200'}
                                            
                                        `}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="font-medium">
                                                {room} ambiente{room > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay para cerrar el dropdown */}
            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
        </div>
    );
};

export default RoomFilter;
