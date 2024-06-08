import { createStore } from "redux";
import VacationModel from "../models/VacationModel";

// 1. Global state for products
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type
export enum VacationsActionType {
    SetVacations = 'SetVacations',
    AddVacation = 'AddVacation',
    UpdateVacation = 'UpdateVacation',
    DeleteVacation = 'DeleteVacation'
}

// 3. Action Object
export type VacationPayload = VacationModel[] | VacationModel | number | string;
export interface VacationsAction {
    type: VacationsActionType,
    payload: VacationPayload
}

// 4. Reducer ()
// export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
//     const newState = { ...currentState };

//     switch (action.type) {
//         case VacationsActionType.SetVacations:
//             newState.vacations = action.payload as VacationModel[];
//             break;
//         case VacationsActionType.AddVacation:
//             const singleVacation = action.payload as VacationModel;
//             newState.vacations.push(singleVacation);
//             break;
//         case VacationsActionType.DeleteVacation:
//             const vacationId = action.payload as number;
//             const indexToDelete = newState.vacations.findIndex(vacation => vacation.id === vacationId);
//             if (indexToDelete !== -1) newState.vacations.splice(indexToDelete, 1);
//             break;
//         case VacationsActionType.UpdateVacation:
//             const vacationToUpdate = action.payload as VacationModel;
//             const indexToUpdate = newState.vacations.findIndex(vacation => vacation.id=== vacationToUpdate.id);
//             if (indexToUpdate !== -1) newState.vacations[indexToUpdate] = vacationToUpdate;
//             break;
//     }

//     return newState;
// }
// redux/VacationsState.ts
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = { ...currentState };

    switch (action.type) {
        case VacationsActionType.SetVacations:
            newState.vacations = action.payload as VacationModel[];
            break;
        case VacationsActionType.AddVacation:
            const singleVacation = action.payload as VacationModel;
            newState.vacations.push(singleVacation);
            break;
        case VacationsActionType.DeleteVacation:
            const vacationId = action.payload as number;
            const indexToDelete = newState.vacations.findIndex(vacation => vacation.id === vacationId);
            if (indexToDelete !== -1) newState.vacations.splice(indexToDelete, 1);
            break;
        case VacationsActionType.UpdateVacation:
            const vacationToUpdate = action.payload as VacationModel;
            const indexToUpdate = newState.vacations.findIndex(vacation => vacation.id === vacationToUpdate.id);
            if (indexToUpdate !== -1) newState.vacations[indexToUpdate] = vacationToUpdate;
            break;
    }

    return newState;
}


// 5. store
export const vacationsStore = createStore(vacationsReducer);