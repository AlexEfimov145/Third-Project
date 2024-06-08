import useTitle from "../../../../utils/UseTitle";
import "./Vacations.css";
import VacationsList from "../list/Vacations";

function Vacations(): JSX.Element {

    useTitle('Vacations');

    return (
        <div className="Vacations">
            <div>
                <VacationsList />
            </div>
        </div>
    );
}

export default Vacations;
