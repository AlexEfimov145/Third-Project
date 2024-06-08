import React from 'react';
import Vacation from "../../../models/VacationModel";
import "./AdminVacationCard.css";
import formatPrice from "../../../utils/FormatPrice";
import formatDate from "../../../utils/FormatDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';
import DeleteButton from '../deleteVacation/DeleteVacation'; // Adjust the import path as necessary

interface AdminVacationCardProps {
    Vacation: Vacation;
    onEdit: () => void;
    onDelete: () => void;
}

function AdminVacationCard({ Vacation, onEdit, onDelete }: AdminVacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">
            <img src={Vacation.picUrl} alt={`View details for ${Vacation.destination}`} />
            <div className="destination">{Vacation.destination}</div>
            <div className="card-buttons">
                <button onClick={onEdit} className="edit-button">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <DeleteButton id={Vacation.id!} onSuccess={onDelete} />
            </div>
            <div className="card-content">
                <div className="dates">
                    <div className="date-item">
                        <FontAwesomeIcon icon={faCalendar} className="fa-calendar" />
                        {formatDate(Vacation.startDate)} - {formatDate(Vacation.finishDate)}
                    </div>
                </div>
                <div className="details">{Vacation.description}</div>
            </div>
            <div className="price">{formatPrice(Vacation.price)}</div>
        </div>
    );
}

export default AdminVacationCard;
