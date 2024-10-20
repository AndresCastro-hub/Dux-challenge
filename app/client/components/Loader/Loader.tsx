import { ProgressSpinner } from "primereact/progressspinner";

const Loader : React.FC = () => {
    return(
        <div data-testid="loader-container" className="flex justify-content-center align-items-center ">
            <ProgressSpinner className="w-1 h-1"/>
        </div>
    )
}
export default Loader;