import { Dropdown } from 'primereact/dropdown';

interface DropdownInputProps {
    id: string;
    value: string | number;
    options: { label: string; value: string | number }[]; 
    handleChange: (e: { value: any }) => void; 
    label: string;
    placeholder:string
}

const DropdownInput: React.FC<DropdownInputProps> = ({
    id,
    value,
    options,
    handleChange,
    label,
    placeholder
}) => {
    return (
        <div className="p-field">
            <label className='font-bold text-lg' htmlFor={id}>{label}</label>
            <Dropdown
                id={id}
                name={id}
                value={value}
                options={options}
                className='mt-2'
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default DropdownInput;
