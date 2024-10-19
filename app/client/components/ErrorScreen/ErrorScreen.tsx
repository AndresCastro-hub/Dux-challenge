import { Message } from "primereact/message";

const ErrorScreen : React.FC = () => {
    return(
        <div className="flex justify-content-center align-items-center h-full">
            <Message severity="error" text={'Ocurrio un error. '} />
        </div>
    )
}
export default ErrorScreen;