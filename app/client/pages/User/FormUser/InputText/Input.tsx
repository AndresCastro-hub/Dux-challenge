
import { InputText } from 'primereact/inputtext';

interface InputTextProps{
    id: string,
    placeholder: string,
    value: string | null | undefined //Prime react no me dejaba tiparlo.,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string,
    label: string,
    disabled?:boolean
}

const Input = ({id, placeholder, value, handleChange, error, label, disabled}: InputTextProps) => {


    return (
        <div className="p-field">
            <label className='font-bold text-lg' htmlFor={id}>{label}</label>
            <InputText
                disabled = {disabled}
                id={id}
                placeholder={placeholder}
                className='mt-2'
                name={id}
                value={value}
                onChange={handleChange}
            />
            {error && <small className="p-error">{error}</small>}
        </div>
    )
}
export default Input