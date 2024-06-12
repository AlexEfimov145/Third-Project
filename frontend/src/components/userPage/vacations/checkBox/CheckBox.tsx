import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import notifyService from "../../../../services/Notify";
import followersService from "../../../../services/Followers";
import vacationsService from "../../../../services/Vacations";
import { vacationsStore, VacationsActionType } from "../../../../redux/VacationsState";
import "./CheckBox.css";
import Vacation from "../../../../models/VacationModel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

interface User {
    id: number;
}

function CheckBox(): JSX.Element {
    const [user, setUser] = useState<User | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode<{ user: { id: number } }>(token);
            setUser({ id: decoded.user.id });
        }
        fetchAllVacations(); 
    }, []);

    const fetchAllVacations = async () => {
        console.log("Fetching all vacations for reset or initial load...");
        try {
            const vacationsFromServer = await vacationsService.getAll(true); // Force refresh
            console.log("Fetched vacations:", vacationsFromServer);
            vacationsStore.dispatch({
                type: VacationsActionType.SetVacations,
                payload: vacationsFromServer
            });
            setActiveFilter(""); // Reset any active filters
        } catch (error) {
            console.error("Failed to load vacations:", error);
            notifyService.error("Failed to load vacations.");
        }
    };

    const handleFilterChange = async (filterType: string) => {
        if (activeFilter === filterType) {
            fetchAllVacations();  // Reset the filter if the same filter is clicked again
            setActiveFilter('');
            return;
        }
    
        setActiveFilter(filterType);
        let filteredVacations: Vacation[] = [];
        try {
            switch (filterType) {
                case 'follow':
                    filteredVacations = await followersService.getUserFollowingFilter(user!.id);
                    break;
                case 'notStarted':
                    filteredVacations = await vacationsService.getVacationByStartDate(new Date());
                    break;
                case 'started':
                    filteredVacations = await vacationsService.getVacationByBetweenDates(new Date());
                    break;
            }
            vacationsStore.dispatch({ type: VacationsActionType.SetVacations, payload: filteredVacations });
            if (filteredVacations.length === 0) {
                notifyService.info(`No vacations found for '${filterType}' filter.`);
            }
        } catch (error) {
             // Consider whether to reset the filter on error based on your design choices
            vacationsStore.dispatch({ type: VacationsActionType.SetVacations, payload: [] }); // Ensure UI updates even on error
        }
    };
    

    return (
        <div className="checkBox">
            <h4>Filters:</h4>
            <div className="filter-group">
                <label>
                    <input type="checkbox" checked={activeFilter === 'follow'} onChange={() => handleFilterChange('follow')} />
                    <FontAwesomeIcon icon={faHeart} className="filter-icon" />
                    Liked Vacations
                </label>
                <label>
                    <input type="checkbox" checked={activeFilter === 'notStarted'} onChange={() => handleFilterChange('notStarted')} />
                    <FontAwesomeIcon icon={faClock} className="filter-icon" />
                    Not Started Vacations
                </label>
                <label>
                    <input type="checkbox" checked={activeFilter === 'started'} onChange={() => handleFilterChange('started')} />
                    <FontAwesomeIcon icon={faPlayCircle} className="filter-icon" />
                    Started Vacations
                </label>
            </div>
        </div>
    );
}

export default CheckBox;
