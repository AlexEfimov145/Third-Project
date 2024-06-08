import axios from 'axios';
import appConfig from '../utils/AppConfig'; // Adjust the path as needed
import Follower from '../models/Follower';
import Vacation from '../models/VacationModel';


class FollowersService {

    public async add(userId: number, vacationId: number): Promise<number> {
        const payload = { userId, vacationId };
        console.log("Sending payload to add follower:", payload);  // Check the payload structure
        try {
            const response = await axios.post<number>(appConfig.followersUrl, payload);
            const addedFollow = response.data;
            // Assuming you dispatch to Redux store or handle the response
            return addedFollow;
        } catch (error: any) {
            console.error("Error when adding follower:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to add follower');
        }
    }
    async delete(userId:number,vacationId: number) {
        try {
            const response = await axios.delete(`${appConfig.followersUrl}/${userId}/${vacationId}`);
            return response.data;
        } catch (error:any) {
            throw new Error(error.response?.data?.message || 'Failed to delete follower');
        }
    }

    async getAllFollowed(userId: number) {
        try {
            const response = await axios.get(`${appConfig.followersUrl}/follows/${userId}`);
            return response.data;
        } catch (error:any) {
            throw new Error(error.response?.data?.message || 'Failed to retrieve followed vacations');
        }
    }
    public async getVacationFollowsNumber(vacationId: number): Promise<number> {
        try {
            const response = await axios.get<number>(`${appConfig.followersUrl}/counter/${vacationId}`);
            const followsCounter = response.data;
            return followsCounter;
        } catch (error) {
            console.error("Error fetching vacation follows:", error);
            throw error;
        }
    }

    public async getAllVacationsFollowing(): Promise<Follower[]> {
        const response = await axios.get<Follower[]>(`${appConfig.followersUrl}/statistics`);
        const followsCounter = response.data;
        return followsCounter;
    }
    public async getUserFollowingFilter(id: number): Promise<Vacation[]> {
        try {
            const response = await axios.get<Follower[]>(`${appConfig.followersUrl}/follows/${id}`);
            const followedVacations = response.data;

            const vacations: Vacation[] = [];

            for (const follow of followedVacations) {
                const vacationResponse = await axios.get<Vacation>(`${appConfig.vacationsUrl}/${follow.vacationId}`);
                vacations.push(vacationResponse.data);
                console.log(vacationResponse.data)
            }
            return vacations;
        } catch (error) {
            throw new Error('Failed to fetch followed vacations');
        }
    }
}

const followersService = new FollowersService();
export default followersService;
