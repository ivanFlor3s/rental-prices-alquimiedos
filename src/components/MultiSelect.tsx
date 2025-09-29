'use client';

import { NameValue } from '@/models/name-value';
import React, { useEffect, useState } from 'react';
import { LucideCheck, LucideX, LucideArrowDown01, LucideChevronDown } from 'lucide-react';

export interface MultiSelectProps {
    label: string;
    onSelectionChange: (values: number[]) => void;
    options: NameValue<number>[];
    placeholder: string;
    selectedOptions?: number[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions = [], onSelectionChange, placeholder, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selection, setSelection] = useState<number[]>(selectedOptions);

    useEffect(() => {
        setSelection(selectedOptions);
    }, [selectedOptions]);

    const handleToggle = (value: number) => {
        let newSelection: number[];
        if (selection.includes(value)) {
            newSelection = selection.filter((v) => v !== value);
        } else {
            newSelection = [...selection, value];
        }
        setSelection(newSelection);
        onSelectionChange(newSelection);
    };

    const clearSelection = () => {
        setSelection([]);
        onSelectionChange([]);
    };

    const getDisplayText = () => {
        if (selection.length === 0) return placeholder;
        if (selection.length === 1) {
            const opt = options.find((o) => o.value === selection[0]);
            return opt ? opt.name : placeholder;
        }
        if (selection.length <= 3) {
            return selection
                .map((v) => options.find((o) => o.value === v)?.name)
                .filter(Boolean)
                .join(', ');
        }
        return `${selection.length} seleccionados`;
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full bg-white border rounded-lg px-4 py-2 text-left shadow-sm cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        transition-all duration-200 hover:border-gray-400
                        ${selection.length > 0 ? 'border-blue-300 bg-blue-50' : 'border-gray-300'}
                        ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
                    `}
                >
                    <div className="flex items-center justify-between">
                        <span className={`flex flex-row items-center ${selection.length > 0 ? 'text-blue-900 font-medium' : 'text-gray-500'}`}>
                            {getDisplayText()}
                            {selection.length > 0 && (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearSelection();
                                    }}
                                    className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                                >
                                    <span className="text-xs hover:underline">Remover todo</span>
                                </div>
                            )}
                        </span>
                        <div className="flex items-center space-x-2">
                            <LucideChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200" />
                        </div>
                    </div>
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        <div className="py-1">
                            {options.map((option) => {
                                const isSelected = selection.includes(option.value);
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleToggle(option.value)}
                                        className={`
                                            w-full px-4 py-3 text-left  
                                            transition-colors duration-150 flex items-center justify-between
                                            ${isSelected ? 'bg-blue-100 text-blue-900' : 'text-gray-900 hover:bg-gray-200'}
                                        `}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="font-medium">{option.name}</span>
                                            {isSelected && <LucideCheck className="w-4 h-4 text-blue-600" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Chips de selección */}
            {selection.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selection.map((val) => {
                        const opt = options.find((o) => o.value === val);
                        return (
                            <span key={val} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {opt?.name}
                                <button type="button" onClick={() => handleToggle(val)} className="ml-2 text-blue-600 hover:text-blue-800">
                                    <LucideX className="w-3 h-3" />
                                </button>
                            </span>
                        );
                    })}
                </div>
            )}

            {/* Overlay para cerrar el dropdown */}
            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
        </div>
    );
};

export default MultiSelect;
