import { useForm } from "react-hook-form";
import "./Signup.css";
import SignupModel from "../../../models/SignupModel";
import notify from "../../../services/Notify";
import auth from "../../../services/Auth";
import { Link, useNavigate } from "react-router-dom";

function Signup(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupModel>();
    const navigate = useNavigate();

    async function submitUserData(signupModel: SignupModel): Promise<void> {
        try {
            // service
            await auth.signUp(signupModel);
            notify.success('You have been successfully signed up');
            navigate('/home');
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Signup">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit(submitUserData)}>
                <label>First name:</label>
                <input 
                    type="text" 
                    {...register('firstName', { 
                        required: 'First name is required' 
                    })} 
                />
                {errors.firstName && <span className="error">{errors.firstName.message}</span>}
                
                <label>Last name:</label>
                <input 
                    type="text" 
                    {...register('lastName', { 
                        required: 'Last name is required' 
                    })} 
                />
                {errors.lastName && <span className="error">{errors.lastName.message}</span>}
                
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
                
                <button type="submit">Register</button>
                <p>Already a member?</p>
                <Link to="/login" className="login-link">
                    <button type="button">Login</button>
                </Link>
            </form>
        </div>
    );
}

export default Signup;
