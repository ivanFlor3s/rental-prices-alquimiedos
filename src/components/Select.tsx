'use client';

import { NameValue } from '@/models/name-value';
import React, { useEffect, useState } from 'react';

export interface SelectProps {
    label: string;
    onSelectionChange: (rooms: number | null) => void;
    options: NameValue<number>[];
    placeholder: string;
    selectedOption?: number;
}

const Select: React.FC<SelectProps> = ({ options, selectedOption, onSelectionChange, placeholder, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState(placeholder);
    const [selection, setSelection] = useState<number | null>(selectedOption || null);

    const handleRoomToggle = (rooms: number) => {
        onSelectionChange(rooms);
        setIsOpen(false);
        setSelection(rooms);
        setInputText(options.find((o) => o.value === rooms)?.name || placeholder);
    };

    const clearSelection = () => {
        onSelectionChange(null);
        setSelection(null);
        setInputText(placeholder);
    };

    useEffect(() => {
        setInputText(placeholder);
    }, [selectedOption, placeholder]);

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

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

                            {selection != null && (
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
                        <div className="py-1">
                            {options.map((option) => {
                                const isSelected = selection && selection === option.value;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleRoomToggle(option.value)}
                                        className={`
                                            w-full px-4 py-3 text-left  
                                            transition-colors duration-150 flex items-center justify-between
                                            ${isSelected ? 'bg-blue-100 text-blue-900' : 'text-gray-900 hover:bg-gray-200'}
                                            
                                        `}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="font-medium">{option.name}</span>
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

export default Select;
