import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginModel from "../../../models/LoginModel";
import auth from "../../../services/Auth";
import notify from "../../../services/Notify";
import {jwtDecode} from 'jwt-decode';  // Ensure jwt-decode is installed and correctly imported
import "./Login.css";

function Login(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginModel>();
    const navigate = useNavigate();

    async function submitLoginData(loginModel: LoginModel): Promise<void> {
        try {
            const response = await auth.login(loginModel);
            console.log("API Response:", response); // Should log the JWT

            // Store the JWT in localStorage directly
            localStorage.setItem('token', response); 

            notify.success('You have been successfully logged in');
            navigateBasedOnRole(response); // Decode the JWT to determine navigation based on user role
        } catch (err: any) {
            console.error("Login Error:", err); // Debugging the error
            const message = err.response?.data?.message || 'Wrong Email or Password';
            notify.error(message);
        }
    }

    function navigateBasedOnRole(jwt: string) {
        try {
            const decoded = jwtDecode<{ user: { userType: number } }>(jwt); // Decode the JWT
            if (decoded.user.userType === 2) { // Assuming userType 2 is admin
                navigate('/adminPage');
            } else {
                navigate('/home');
            }
        } catch (error) {
            notify.error("Error decoding the JWT: " + error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            notify.error('You are already logged in, please don\'t login again')
            navigate('/home');
        }
    }, [navigate]);

    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(submitLoginData)}>
                <label>Email:</label>
                <input 
                    type="email" 
                    {...register('email', { 
                        required: 'Email is required', 
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address'
                        }
                    })} 
                />
                {errors.email && <span className="error">{errors.email.message}</span>}
                
                <label>Password:</label>
                <input 
                    type="password" 
                    {...register('password', { 
                        required: 'Password is required', 
                        minLength: {
                            value: 4,
                            message: 'Password must be at least 4 characters long'
                        } 
                    })} 
                />
                {errors.password && <span className="error">{errors.password.message}</span>}
                
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account?</p>
            <div className="signup-link">
                <NavLink to="/signup">Register Now</NavLink>
            </div>
        </div>
    );
}

export default Login;
