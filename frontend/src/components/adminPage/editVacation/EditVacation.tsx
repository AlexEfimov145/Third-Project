import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import { useEffect, useState } from "react";
import VacationsService from "../../../services/Vacations";
import { useForm } from "react-hook-form";
import Vacation from "../../../models/VacationModel";
import notify from "../../../services/Notify";
import moment from "moment";

function EditVacation(): JSX.Element {
    const { vacationId } = useParams<{ vacationId: string }>();
    const id = Number(vacationId);

    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm<Vacation>();

    const navigate = useNavigate();

    const [src, setSrc] = useState<string>('');
    const [newImage, setNewImage] = useState<File | null>(null);

    useEffect(() => {
        if (!isNaN(id)) {
            console.log("Fetching vacation details for ID:", id);
            VacationsService.getOne(id)
                .then(vacationFromServer => {
                    if (vacationFromServer) {
                        console.log("Vacation details fetched:", vacationFromServer);
                        setValue('destination', vacationFromServer.destination);
                        setValue('description', vacationFromServer.description);
                        setValue('startDate', vacationFromServer.startDate ? moment(new Date(vacationFromServer.startDate)).format('YYYY-MM-DD') as unknown as Date : undefined);
                        setValue('finishDate', vacationFromServer.finishDate ? moment(new Date(vacationFromServer.finishDate)).format('YYYY-MM-DD') as unknown as Date : undefined);
                        setValue('price', vacationFromServer.price);

                        const imageUrl = vacationFromServer.picUrl
                            ? vacationFromServer.picUrl.startsWith('http')
                                ? vacationFromServer.picUrl
                                : `${process.env.REACT_APP_API_URL}/images/${vacationFromServer.picUrl}`
                            : '';
                        setSrc(imageUrl || '');
                        console.log("Image URL:", imageUrl);
                    }
                })
                .catch(error => {
                    console.error("Failed to fetch vacation details:", error);
                    notify.error("Failed to fetch vacation details: " + error.message);
                });
        } else {
            console.error("Invalid vacation ID:", id);
            notify.error("Invalid vacation ID");
            navigate('/adminPage');
        }
    }, [id, setValue, navigate]);

    const submitVacationData = async (data: Vacation) => {
        try {
            if (id) {
                const vacationToUpdate = {
                    ...data,
                    id,
                    startDate: new Date(data.startDate as unknown as string),
                    finishDate: new Date(data.finishDate as unknown as string)
                };

                console.log("Submitting vacation data to update:", vacationToUpdate);

                const formData = new FormData();
                formData.append('id', String(vacationToUpdate.id));
                formData.append('destination', vacationToUpdate.destination || '');
                formData.append('description', vacationToUpdate.description || '');
                formData.append('startDate', vacationToUpdate.startDate.toISOString());
                formData.append('finishDate', vacationToUpdate.finishDate.toISOString());
                formData.append('price', String(vacationToUpdate.price || 0));
                if (newImage) {
                    formData.append('image', newImage);
                }

                const updatedVacation = await VacationsService.editVacation(formData);
                notify.success(`Vacation updated successfully.`);
                console.log("Vacation updated:", updatedVacation);
                navigate('/adminPage');
            }
        } catch (error: any) {
            console.error("Update error:", error);
            notify.error("Failed to update vacation: " + error.message);
        }
    };

    function handleCancel() {
        navigate('/adminPage'); 
    }

    return (
        <div className="EditVacation">
            <h2>Edit Vacation</h2>
            <form onSubmit={handleSubmit(submitVacationData)} className="EditForm">
                <label>Destination:</label>
                <input 
                    type="text" 
                    {...register('destination', {
                        minLength: { value: 4, message: 'Minimum length is 4 characters' },
                        required: 'Destination can\'t be empty.'
                    })} 
                />
                {errors.destination && <span className="error">{errors.destination.message}</span>}

                <label>Description:</label>
                <textarea 
                    {...register('description', {
                        minLength: { value: 6, message: 'Minimum length is 6 characters' },
                        required: 'Description can\'t be empty.'
                    })} 
                />
                {errors.description && <span className="error">{errors.description.message}</span>}

                <label>Start Date:</label>
                <input 
                    type="date" 
                    {...register('startDate', {
                        required: 'Start Date can\'t be empty.',
                        validate: {
                            dateCheck: value => {
                                if (!value) return 'Start date is required.';
                                const date = new Date(value);
                                const today = new Date();
                                return date >= today || 'Start date cannot be in the past or today.';
                            }
                        }
                    })} 
                />
                {errors.startDate && <span className="error">{errors.startDate.message}</span>}

                <label>Finish Date:</label>
                <input 
                    type="date" 
                    {...register('finishDate', {
                        required: 'End Date can\'t be empty.',
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
                    })} 
                />
                {errors.finishDate && <span className="error">{errors.finishDate.message}</span>}

                <label>Price:</label>
                <input 
                    type="number" 
                    step="0.01" 
                    {...register('price', {
                        min: { value: 1, message: 'Minimum price is $1' },
                        max: { value: 10000, message: 'Maximum price is $10,000' },
                        required: 'Price can\'t be empty.'
                    })} 
                />
                {errors.price && <span className="error">{errors.price.message}</span>}

                {src && <img src={src} alt="Vacation" />}
                <label>Change Image:</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setNewImage(e.target.files[0]);
                            setSrc(URL.createObjectURL(e.target.files[0]));
                        }
                    }} 
                />

                <button type="submit">Update</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default EditVacation;
