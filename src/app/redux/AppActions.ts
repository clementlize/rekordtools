export interface ToggleDarkModeAction {
    type: typeof AppActions.TOGGLE_DARK_MODE;
}

export type AppActionType = ToggleDarkModeAction;

export const AppActions = {

    TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',

    toggleDarkMode: (): ToggleDarkModeAction => ({

        type: AppActions.TOGGLE_DARK_MODE,
    }),
}