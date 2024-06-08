import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import VacationsService from "../../../services/Vacations";
import notify from "../../../services/Notify";
import './DeleteVacation.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface DeleteButtonProps {
    id: number;
    onSuccess: () => void; // Callback to trigger on successful deletion
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onSuccess }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const isAxiosError = (error: any): error is { response: { status: number } } => {
        return error && error.response && typeof error.response.status === 'number';
    };

    const handleDelete = async () => {
        try {
            await VacationsService.deleteVacation(id);
            notify.success('Vacation deleted successfully');
            onSuccess(); // Invoke callback to update the vacation list
            setShowConfirmDialog(false); // Hide the confirmation dialog after action
        } catch (error) {
            if (isAxiosError(error) && error.response.status === 404) {
                notify.warning('Vacation was already deleted.');
                onSuccess(); // Ensure UI updates even if 404 error occurs
            } else {
                notify.error(`Failed to delete vacation: ${error}`);
            }
            setShowConfirmDialog(false); // Hide the confirmation dialog after action
        }
    };

    const confirmDialog = (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <p>Are you sure you want to delete this vacation?</p>
                <button onClick={handleDelete} className="confirm-delete-button">Yes</button>
                <button onClick={() => setShowConfirmDialog(false)} className="cancel-button">No</button>
            </div>
        </div>
    );

    return (
        <>
            {/* <button onClick={() => setShowConfirmDialog(true)} className="delete-button" >Delete</button> */}
            <button onClick={() => setShowConfirmDialog(true)} className="delete-button">
                <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            {showConfirmDialog && ReactDOM.createPortal(confirmDialog, document.body)}
        </>
    );
};

export default DeleteButton;
