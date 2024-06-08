import React, { useEffect, useState } from "react";
import VacationModel from "../../../../models/VacationModel";
import VacationsService from "../../../../services/Vacations";
import useTitle from "../../../../utils/UseTitle";
import VacationCard from "../vacationCard/VacationCard";
import "./Vacations.css";
import notify from "../../../../services/Notify";
import Spinner from "../../../common/spinner/Spinner";
import { vacationsStore, VacationsActionType } from "../../../../redux/VacationsState";

function VacationsList(): JSX.Element {
    useTitle('Vacations');

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;  // Set the number of items per page

    useEffect(() => {
        const fetchVacations = async () => {
            try {
                const vacationsFromServer = await VacationsService.getAll();
                vacationsStore.dispatch({ type: VacationsActionType.SetVacations, payload: vacationsFromServer });
            } catch (error) {
                notify.error("Failed to load vacations: " + error);
            }
        };

        fetchVacations();  

        const unsubscribe = vacationsStore.subscribe(() => {
            setVacations(vacationsStore.getState().vacations);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const totalPages = Math.ceil(vacations.length / itemsPerPage);

    const indexOfLastVacation = currentPage * itemsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - itemsPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);

    const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

    if (vacations.length === 0) {
        return <Spinner />;
    }

    return (
        <div className="VacationsList">
            <div className="vacations-grid">
                {currentVacations.map(vacation => (
                    <VacationCard key={vacation.id} Vacation={vacation} userId={0} />
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

export default VacationsList;
