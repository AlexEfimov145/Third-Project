import axios from "axios";
import Signup from "../models/SignupModel";
import Login from "../models/LoginModel";
import appConfig from "../utils/AppConfig";
import { AuthAction, AuthActionType, authStore } from "../redux/AuthState";
import User from "../models/UserModel";



class AuthService {
    
    public async getAllUsers(): Promise<User[]> {
        const response = await axios.get<User[]>(appConfig.usersUrl);
        const users = response.data;
        return users;
    }
    
    public async signUp(signup: Signup): Promise<string> {
        const response = await axios.post<{ jwt: string }>(appConfig.signupUrl, signup);
        const token = response.data.jwt;
        const action: AuthAction = {
            type: AuthActionType.Signup,
            payload: token
        }
        authStore.dispatch(action);

        return token;
    }

    public async login(login: Login): Promise<string> {
        const response = await axios.post<{ jwt: string }>(appConfig.loginUrl, login);
        const token = response.data.jwt;
        const action: AuthAction = {
            type: AuthActionType.Login,
            payload: token
        }
        authStore.dispatch(action);

        return token;
    }

    public async isAdmin(id: number): Promise<boolean> {
        try {
            const response = await axios.get(appConfig.AdminUrl + `/${id}`);
            // const isAdmin = response.data === true;
            const isAdmin = response.data.isAdmin;
            console.log("isAdmin response:", response.data);
            console.log("isAdmin:", isAdmin);
            return isAdmin;
        } catch (error) {
            throw error;
        }
    }

    public logout() {
        const action: AuthAction = {
            type: AuthActionType.Logout,
            payload: null
        }
        authStore.dispatch(action);
    }

}
const authService = new AuthService();
export default authService;