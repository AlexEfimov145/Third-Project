import "./AddVacation.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../models/VacationModel";
import vacationService from "../../../services/Vacations";
import notifyService from "../../../services/Notify";
import { useNavigate } from "react-router-dom";
import { vacationsStore, VacationsActionType } from "../../../redux/VacationsState";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, setValue, formState, getValues } = useForm<VacationModel>();
    const navigate = useNavigate();

    async function submitVacation(vacation: VacationModel) {
        try {
            // Ensure startDate and finishDate are Date objects
            if (typeof vacation.startDate === 'string') {
                vacation.startDate = new Date(vacation.startDate);
            }
            if (typeof vacation.finishDate === 'string') {
                vacation.finishDate = new Date(vacation.finishDate);
            }

            vacation.image = (vacation.image as unknown as FileList)[0];
            const addedVacation = await vacationService.addVacation(vacation);

            if (addedVacation && addedVacation.id) {
                // Dispatch to Redux store with the real ID from the backend
                vacationsStore.dispatch({
                    type: VacationsActionType.AddVacation,
                    payload: addedVacation
                });

                // notifyService.success(`New vacation added successfully with id ${addedVacation.id}.`);
                notifyService.success(`New vacation added successfully`);

                // Clear form fields after submission
                setValue('destination', '')
                setValue('description', '')
                setValue('startDate', undefined)
                setValue('finishDate', undefined)
                setValue('price', undefined)

                navigate('/adminPage');
            } else {
                throw new Error('Failed to add vacation. No ID returned from backend.');
            }
        } catch (err) {
            notifyService.error((err as Error).message);
        }
    }
    function handleCancel() {
        navigate('/adminPage'); // Navigates back to the admin page
    }

    return (
        <div className="AddVacation">
            <div className="FormContent">
                <div className="FormHeader">
                    <h1 className="FormTitle">Add Vacation</h1>
                </div>
                <form onSubmit={handleSubmit(submitVacation)} className="AddForm">

                    <label>Destination:</label>
                    <input type="text" {...register('destination', {
                        minLength: { value: 4, message: 'Minimum length is 4 characters' },
                        required: {
                            value: true,
                            message: 'Destination can\'t be empty.'
                        }
                    })} /><span>{formState.errors.destination?.message}</span>

                    <label>Description:</label>
                    <textarea {...register('description', {
                        minLength: { value: 6, message: 'Minimum length is 6 characters' },
                        required: {
                            value: true,
                            message: 'Description can\'t be empty.'
                        }
                    })} /><span>{formState.errors.description?.message}</span>

                    <label>Start Date:</label>
                    <input type="date"{...register('startDate', {
                        required: {
                            value: true,
                            message: 'Start Date can\'t be empty.'
                        },
                        validate: {
                            dateCheck: value => {
                                if (!value) return 'Start date is required.';
                                const date = new Date(value);
                                const today = new Date();
                                return date >= today || 'Start date cannot be in the past or today.';
                            }
                        }
                    })} /><span>{formState.errors.startDate?.message}</span>

                    <label>End Date:</label>
                    <input type="date"{...register('finishDate', {
                        required: {
                            value: true,
                            message: 'End Date can\'t be empty.'
                        },
                        validate: {
                            dateCheck: value => {
                                const startDateValue = getValues('startDate');
                                if (!startDateValue) return 'Start date is required.';
                                if (!value) return 'End date is required.';
                                const startDate = new Date(startDateValue);
                                const endDate = new Date(value);
                                return endDate > startDate || 'End date must be after the start date.';
                            }
                        }
                    })} /><span>{formState.errors.finishDate?.message}</span>

                    <label>Price:</label>
                    <input type="number" {...register('price', {
                        min: { value: 1, message: 'Minimum price is $1' },
                        max: { value: 10000, message: 'Maximum price is $10,000' },
                        required: {
                            value: true,
                            message: 'Price can\'t be empty.'
                        }
                    })} /><span>{formState.errors.price?.message}</span>

                    <label>Image:</label>
                    <input type="file" accept="image/*" {...register('image')} />

                    <button type="submit">Add Vacation</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AddVacation;
