import { createStore } from "redux";
import { jwtDecode } from "jwt-decode";

// 1. state
export class AuthState {
    public token: string = '';
    userId: any;
    public constructor() {
        this.token = localStorage.getItem('token') || '';
    }
}

// 2. action types
export enum AuthActionType {
    Signup = 'Signup',
    Login = 'Login',
    Logout = 'Logout',
    TokenExpired = 'TokenExpired',
}

const isTokenExpired = (token: string): boolean => {
    const decodedToken: any = jwtDecode(token);
    const currentTime: number = Date.now() / 1000;
    return decodedToken.exp < currentTime;
}

// 3. action
export type AuthActionPayload = string | null;
export interface AuthAction {
    type: AuthActionType,
    payload: AuthActionPayload,
}

// 4. reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.Signup:
        case AuthActionType.Login:
            newState.token = action.payload as unknown as string;
            localStorage.setItem('token', newState.token);
            break;
        case AuthActionType.Logout:
        case AuthActionType.TokenExpired:
            newState.token = '';
            localStorage.removeItem('token');
            break;
    }

    return newState;
}


// 5. store
export const authStore = createStore(authReducer);

const token = localStorage.getItem('token');
if (token && isTokenExpired(token)) {
    authStore.dispatch({
        type: AuthActionType.TokenExpired,
        payload: null
    });
}