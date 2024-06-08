import { useEffect, useState } from "react";
import { authStore } from "../../../redux/AuthState";
import { NavLink } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import notify from "../../../services/Notify";
import auth from "../../../services/Auth";
import "./AuthMenu.css";
import authService from "../../../services/Auth";
import notifyService from "../../../services/Notify";

function AuthMenu() {
    type User = {
        id: number
        firstName: string;
        lastName: string;
    };

    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const checkAndUpdateUserState = () => {
            const token = authStore.getState().token;
            console.log("Checking token in AuthMenu:", token);

            if (token) {
                try {
                    const decoded = jwtDecode<{user:User}>(token).user; // Adjust based on your JWT structure
                    console.log("Decoded user:", decoded);
                    setUser(decoded);
                } catch (error) {
                    console.error("JWT decoding failed:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        checkAndUpdateUserState(); // Check on mount

        const unsubscribe = authStore.subscribe(checkAndUpdateUserState); // Subscribe to store changes
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    function logout() {
        auth.logout();
        notify.success('Logged out successfully');
    }

    useEffect(() => {
        async function ifAdmin() {
            if (user) {
                try {
                    const userAdmin = await authService.isAdmin(user.id);
                    setIsAdmin(userAdmin);
                } catch (error: any) {
                    notifyService.error("Failed to check admin status");
                }
            }
        }
        ifAdmin();
    }, [user]);

    return (
        <div className="AuthMenu">
            {!user ? (
                <div>
                    <NavLink to="/signup">Sign Up</NavLink>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                </div>
            ) : (
                <div>
                    <span>Hello {user.firstName} {user.lastName}</span>
                    {isAdmin && <><span>|</span><NavLink to="/AdminPage">Admin Page</NavLink></>}
                    <span>|</span>
                    <NavLink to="/signup" onClick={logout}>Logout</NavLink>
                </div>
            )}
        </div>
    );
}

export default AuthMenu;
