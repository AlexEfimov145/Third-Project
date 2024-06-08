import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import notifyService from '../../../services/Notify';
import followersService from '../../../services/Followers';
import { followStore } from '../../../redux/FollowersState';
import './FollowersButton.css';

interface ToggleButtonProps {
    vacationId: number;
    className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ vacationId, className }) => {
    const [userId, setUserId] = useState<number | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<{ user: { id: number } }>(token);
                setUserId(decoded.user.id);
                if (decoded.user.id) {
                    checkFollowStatus(decoded.user.id, vacationId);
                } else {
                    console.error("No user ID in token");
                    notifyService.error("Authentication failed: No user ID.");
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                notifyService.error("Failed to decode token.");
            }
        } else {
            console.error("No token found");
            notifyService.error("No authentication token found.");
        }
    }, [vacationId]);

    const checkFollowStatus = async (userId: number, vacationId: number) => {
        try {
            const likedVacations = await followersService.getAllFollowed(userId);
            const isLiked = likedVacations.some((follow: { vacationId: number; }) => follow.vacationId === vacationId);
            setIsFollowing(isLiked);
        } catch (error) {
            console.error("Error checking follow status:", error);
        }
    };

    useEffect(() => {
        async function fetchFollowCount() {
            if (vacationId) {
                const getCounter = await followersService.getVacationFollowsNumber(vacationId);
                setCounter(getCounter);
            }
        }
        fetchFollowCount();

        const unsubscribe = followStore.subscribe(async () => {
            const getCounter = await followersService.getVacationFollowsNumber(vacationId);
            setCounter(getCounter);
        });
        return unsubscribe;
    }, [vacationId]);

    const handleToggleFollow = async () => {
        if (!userId) {
            notifyService.error("User is not authenticated.");
            return;
        }
        try {
            if (isFollowing) {
                await followersService.delete(userId, vacationId);
                setCounter(prev => prev - 1);
                notifyService.success("You have unfollowed this vacation.");
            } else {
                await followersService.add(userId, vacationId);
                setCounter(prev => prev + 1);
                notifyService.success("You are now following this vacation.");
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Failed to process your request:", error);
            notifyService.error("Failed to process your request.");
        }
    };

    return (
        <button
            className={`toggle-button ${isFollowing ? 'following' : 'not-following'} ${className}`}
            onClick={handleToggleFollow}
        >
            <span className="like-icon">{isFollowing ? '❤️' : '🖤'}</span> Likes {counter}
        </button>
    );
};

export default ToggleButton;


