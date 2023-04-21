export interface QuickSearch {
  id: string;
  quickSearchs: string[];
}

export interface AppState {
  user: {
    isLogged: boolean;
  };
  quickSearchs: QuickSearch[];
}

export interface SetQuickSearchsAction {
  type: typeof SET_QUICK_SEARCHS;
  payload: QuickSearch[];
}

export interface RemoveQuickSearchsAction {
  type: typeof REMOVE_QUICK_SEARCHS;
  payload: string;
}

export type AppAction = SetQuickSearchsAction | RemoveQuickSearchsAction;

export const SET_QUICK_SEARCHS = "SET_QUICK_SEARCHS";
export const REMOVE_QUICK_SEARCHS = "REMOVE_QUICK_SEARCHS";

