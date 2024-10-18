import { Button } from "primereact/button";

interface FormButtonsProps {
    esEdicion: boolean;
    habilitarConfirmar: boolean;
    handleClear: () => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({ esEdicion, habilitarConfirmar, handleClear }) => {
    return (
        <div className='flex justify-content-center gap-2 mt-3'>
            <Button
                size='small'
                type="submit"
                label={esEdicion ? 'Editar' : 'Confirmar'}
                disabled={!habilitarConfirmar}
                style={{ maxWidth: '120px', fontWeight: 'bold' }}
                icon="pi pi-check"
                iconPos="left"
            />
            <Button
                size='small'
                label="Cancelar"
                onClick={handleClear}
                className="p-button-text"
                icon="pi pi-times"
                iconPos="left"
                style={{
                    maxWidth: '120px',
                    border: '1px solid #0763E7',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                }}
            />
        </div>
    );
};

export default FormButtons;
