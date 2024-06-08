import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faPlus } from '@fortawesome/free-solid-svg-icons';
import useTitle from "../../../utils/UseTitle";
import "./AdminPage.css"; 
import VacationsList from "../list/AdminVacations";

function AdminPage(): JSX.Element {
    const navigate = useNavigate();
    useTitle('Admin Dashboard');

    const handleAddVacation = () => {
        navigate('/adminPage/add'); 
    };

    const handleViewChart = () => {
        navigate('/adminPage/chart'); 
    };

    return (
        <div className="AdminPage">
            <div className="admin-buttons">
                <button onClick={handleViewChart} className="admin-button">
                    <FontAwesomeIcon icon={faChartBar} /> View Chart
                </button>
                <button onClick={handleAddVacation} className="admin-button">
                    <FontAwesomeIcon icon={faPlus} /> Add Vacation
                </button>
            </div>
            <div>
                <VacationsList />
            </div>
        </div>
    );
}

export default AdminPage;
