import React, { useEffect, useState } from "react";
import VacationModel from "../../../models/VacationModel";
import VacationsService from "../../../services/Vacations";
import useTitle from "../../../utils/UseTitle";
import AdminVacationCard from "../vacationCard/AdminVacationCard";
import "./AdminVacations.css";
import notify from "../../../services/Notify";
import Spinner from "../../common/spinner/Spinner";
import { vacationsStore, VacationsActionType } from "../../../redux/VacationsState";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function AdminVacationsList(): JSX.Element {
    useTitle('AdminVacations');

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [vacationsPerPage] = useState(9);
    const navigate = useNavigate();

    const fetchVacations = async () => {
        try {
            const vacationsFromServer = await VacationsService.getAll();
            vacationsStore.dispatch({ type: VacationsActionType.SetVacations, payload: vacationsFromServer });
            setVacations(vacationsFromServer);
        } catch (error) {
            notify.error("Failed to load vacations: " + error);
        }
    };

    useEffect(() => {
        fetchVacations();

        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations(vacationsStore.getState().vacations);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);

    const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(vacations.length / vacationsPerPage);

    const handleDeleteSuccess = (deletedVacationId: number) => {
        setVacations(prevVacations => prevVacations.filter(vacation => vacation.id !== deletedVacationId));
    };

    if (vacations.length === 0) {
        return <Spinner />;
    }

    return (
        <div className="AdminVacationsList">
            <div className="vacations-grid">
                {currentVacations.map(vacation => (
                    <AdminVacationCard 
                        key={vacation.id || uuidv4()} 
                        Vacation={vacation} 
                        onEdit={() => navigate(`/adminPage/edit/${vacation.id}`)} 
                        onDelete={() => handleDeleteSuccess(vacation.id!)}
                    />
                ))}
            </div>
            <div className="pagination">
                {[...Array(totalPages).keys()].map(number => (
                    <button key={number + 1} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AdminVacationsList;
