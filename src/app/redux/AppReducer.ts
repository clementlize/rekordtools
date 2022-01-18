import { AppActions, AppActionType } from "./AppActions";

export interface AppState {

    darkMode: boolean;
}

const appInitialState: AppState = {

    darkMode: true,
}

export default function AppReducer(
    state = appInitialState,
    action: AppActionType,
): AppState {

    switch (action.type) {

        case AppActions.TOGGLE_DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode
            };
    }

    return state;
}