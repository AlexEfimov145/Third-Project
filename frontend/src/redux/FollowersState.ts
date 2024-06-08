import { createStore } from "redux";
import FollowModel from "../models/Follower";

// 1. Global state for followers
export class FollowState {
    public followers: FollowModel[] = [];
    public vacationId: string = ''; // Changed to number
}

// 2. Action Types
export enum FollowActionType {
    SetFollow = 'SetFollow',
    DeleteFollow = 'DeleteFollow',
}

// 3. Action Object
export type FollowPayload = FollowModel[] | string; // Changed to number for DeleteFollow
export interface FollowAction {
    type: FollowActionType;
    payload: FollowPayload;
}

// 4. Reducer
export function followReducer(currentState = new FollowState(), action: FollowAction): FollowState {
    const newState = { ...currentState };

    switch (action.type) {
        case FollowActionType.SetFollow:
            if (Array.isArray(action.payload)) { // Ensuring payload is an array of FollowModel
                newState.followers = action.payload;
            }
            break;
        case FollowActionType.DeleteFollow:
            const followerVacationId = action.payload as unknown as number;
            if (Array.isArray(newState.followers)) {
                const indexToDelete = newState.followers.findIndex(follower => follower.vacationId === followerVacationId);
                if (indexToDelete !== -1) {
                    newState.followers.splice(indexToDelete, 1);
                }
            }
            break;
    }

    return newState;
}

// 5. Store
export const followStore = createStore(followReducer);
