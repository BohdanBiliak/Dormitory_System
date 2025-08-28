'use client'

import {useState} from "react";

interface MultipleSelectDropdownProps {
    dropdownHeader: string;
    formFieldName: string;
    options:string[];
    onChange: (value: string[]) => void;
}

export default function MultipleSelectDropdown({dropdownHeader,formFieldName, options, onChange}:MultipleSelectDropdownProps){
    const [selectedOptions, setSelectedOptions] = useState(['']);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const option = e.target.value;

        const selectedOptionSet = new Set(selectedOptions);

        if(isChecked){
            selectedOptionSet.add(option);
            selectedOptionSet.delete("");
        }else{
            selectedOptionSet.delete(option);
            if(selectedOptionSet.size==0){
                selectedOptionSet.add("");
            }
        }

        const newSelectedOptionSet = Array.from(selectedOptionSet);

        setSelectedOptions(newSelectedOptionSet);
        onChange(newSelectedOptionSet);
    }

    return(
        <label className="relative">
            <input type="checkbox" className="hidden peer"/>
            <div className="cursor-pointer after:content-[<img src='/chevron-down.png'/>] after:text-xs after:ml-l after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform">
                {dropdownHeader}
            </div>

            <div className="absolute bg-white border p-2 transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
                <ul>
                    {options.map((option,i)=>{
                        return(
                            <li key={option}>
                                <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                                    <input type="checkbox" name={formFieldName} value={option} className="cursor-pointer" onChange={handleChange}/>
                                    <span className="ml-1">{option}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </label>
    )
}