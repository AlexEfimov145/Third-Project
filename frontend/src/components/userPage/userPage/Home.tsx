import "./Home.css";
import useTitle from "../../../utils/UseTitle";
import Vacations from "../../userPage/vacations/vacations/Vacations";
import CheckBox from "../vacations/checkBox/CheckBox";

function Home(): JSX.Element {

        useTitle("Home");

    return (
        <div className="Home">
            <div><CheckBox/></div>
            <div><Vacations/></div>


        </div>
    );
}

export default Home;
