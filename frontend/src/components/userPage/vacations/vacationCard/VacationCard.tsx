import Vacation from "../../../../models/VacationModel";
import "./VacationCard.css";
import formatPrice from "../../../../utils/FormatPrice";
import formatDate from "../../../../utils/FormatDate";
import ToggleButton from '../../../followers/followersButton/FollowersButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

interface VacationCardProps {
    Vacation: Vacation,
    userId: number 
}

function VacationCard({ Vacation, userId }: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">
            <img src={Vacation.picUrl} alt={`View details for ${Vacation.destination}`} />
            <div className="destination">{Vacation.destination}</div>
            {Vacation.id && <ToggleButton vacationId={Vacation.id} className="follow-button" />}
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

export default VacationCard;

