import axios from "axios";
import appConfig from "../utils/AppConfig";
import VacationModel from "../models/VacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../redux/VacationsState";
import Follower from "../models/Follower";

class VacationService {


    public async getAll(forceRefresh: boolean = false): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;
        if (vacations.length === 0 || forceRefresh) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            vacations = response.data;
            vacationsStore.dispatch({
                type: VacationsActionType.SetVacations,
                payload: vacations
            });
        }
        return vacations;
    }

    public async getOne(id: number): Promise<VacationModel | undefined> {
        let vacations = vacationsStore.getState().vacations;
        let vacation = vacations.find(v => v.id === id);
        if (!vacation) {
            await this.getAll();
            vacations = vacationsStore.getState().vacations;
            vacation = vacations.find(v => v.id === id);
        }
        return vacation;
    }

    // public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }
    //     const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, config);
    //     const addedVacation = response.data;
    //     const action: VacationsAction = {
    //         type: VacationsActionType.AddVacation,
    //         payload: addedVacation
    //     }
    //     vacationsStore.dispatch(action);
    //     return addedVacation;
    // }
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const formData = new FormData();
        formData.append('destination', vacation.destination!);
        formData.append('description', vacation.description!);
        formData.append('startDate', vacation.startDate!.toISOString());
        formData.append('finishDate', vacation.finishDate!.toISOString());
        formData.append('price', vacation.price!.toString());
        if (vacation.image) {
            formData.append('image', vacation.image);
        }
    
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    
        if (response.data && response.data.id) {
            return response.data;
        } else {
            throw new Error('Failed to add vacation. No ID returned from backend.');
        }
    }
    

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + `/${id}`);
        const action: VacationsAction = {
            type: VacationsActionType.DeleteVacation,
            payload: id
        }
        vacationsStore.dispatch(action);
    }
    
    public async editVacation(vacation: VacationModel | FormData): Promise<VacationModel> {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const response = await axios.patch<VacationModel>(`${appConfig.vacationsUrl}/${(vacation instanceof FormData) ? vacation.get('id') : vacation.id}`, vacation, config);
        const updatedVacation = response.data;
        const action: VacationsAction = {
            type: VacationsActionType.UpdateVacation,
            payload: updatedVacation
        };
        vacationsStore.dispatch(action);
        return updatedVacation;
    }


    public async getVacationByStartDate(date: Date): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.vacationsUrl}/start-date/${date}`);
        const vacations = response.data;
        return vacations;
    }

    public async getVacationByBetweenDates(date: Date): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(`${appConfig.vacationsUrl}/between-dates`);
        const vacations = response.data;
        return vacations;
    }
    public async getAllFollowers(): Promise<Follower[]> {
        const response = await axios.get<Follower[]>(`${appConfig.followersUrl}`);
        return response.data;
    }

    public async getAllVacationsWithLikes(): Promise<(VacationModel & { likes: number })[]> {
        const vacations = await this.getAll(true);
        const followers = await this.getAllFollowers();

        const vacationLikes = vacations.map(vacation => {
            const likes = followers.filter(follower => follower.vacationId === vacation.id).length;
            return { ...vacation, likes };
        });

        return vacationLikes;
    }
}
const vacationService = new VacationService();
export default vacationService;