
'use client'

import { useState, useRef, useEffect, memo } from "react";

interface MultipleSelectDropdownProps {
    dropdownHeader: string;
    formFieldName: string;
    options: string[];
    onChange: (value: string[]) => void;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
}

const MultipleSelectDropdown = memo(function MultipleSelectDropdown({
    dropdownHeader,
    formFieldName, 
    options, 
    onChange,
    className,
    disabled = false,
    placeholder = "Select options..."
}: MultipleSelectDropdownProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (option: string) => {
        const isSelected = selectedOptions.includes(option);
        let newSelectedOptions: string[];

        if (isSelected) {
            newSelectedOptions = selectedOptions.filter(item => item !== option);
        } else {
            newSelectedOptions = [...selectedOptions, option];
        }

        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    };

    const getDisplayText = () => {
        if (selectedOptions.length === 0) {
            return placeholder;
        }
        if (selectedOptions.length === 1) {
            return selectedOptions[0];
        }
        return `${selectedOptions.length} selected`;
    };

    return (
        <div className={`relative w-full ${className}`} ref={dropdownRef}>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                {dropdownHeader}
            </label>
            
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
                    w-full flex items-center justify-between 
                    h-9 sm:h-10 lg:h-11 px-3 sm:px-4 py-2 sm:py-2.5
                    text-left text-sm sm:text-base
                    bg-white border border-gray-300 rounded-md
                    hover:border-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent
                    
                    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer'}
                    ${selectedOptions.length === 0 ? 'text-gray-500' : 'text-gray-900'}
                `}
            >
                <span className="truncate">{getDisplayText()}</span>
                <svg 
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                        isOpen ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 sm:max-h-60 overflow-auto">
                    <div className="py-1">
                        {options.length === 0 ? (
                            <div className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-500 text-center">
                                No options available
                            </div>
                        ) : (
                            options.map((option, index) => {
                                const isSelected = selectedOptions.includes(option);
                                return (
                                    <label 
                                        key={`${option}-${index}`}
                                        className={`
                                            flex items-center px-3 sm:px-4 py-2 sm:py-2.5 
                                            text-sm sm:text-base cursor-pointer 
                                            transition-colors duration-150
                                            hover:bg-blue-50 active:bg-blue-100
                                            ${isSelected ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}
                                        `}
                                    >
                                        <input
                                            type="checkbox"
                                            name={formFieldName}
                                            value={option}
                                            checked={isSelected}
                                            onChange={() => handleChange(option)}
                                            className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                                        />
                                        <span className="ml-2 sm:ml-3 flex-1 truncate">{option}</span>
                                        {isSelected && (
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </label>
                                );
                            })
                        )}
                    </div>
                </div>
            )}

            {/* Selected Count Badge */}
            {selectedOptions.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-medium">
                    {selectedOptions.length}
                </div>
            )}
        </div>
    );
});

export default MultipleSelectDropdown;