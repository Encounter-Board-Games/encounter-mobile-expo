/* eslint-disable indent */
// actionTypes.ts
export enum ActionTypes {
  APP_SET_TERMS = 'APP_SET_TERMS',
  APP_SET_CONFIGURATION = 'APP_SET_CONFIGURATION',
  APP_SET_NEED_UPDATE_VERSION = 'APP_SET_NEED_UPDATE_VERSION',
}

export interface RootState {
  terms?: Record<string, any>;
  about?: Record<string, any>;
  update?: Record<string, any>;
}

export interface Action {
  type: ActionTypes;
  terms?: Record<string, any>;
  about?: Record<string, any>;
  update?: Record<string, any>;
}

export const initialState: RootState = {};

export default function app(
  state: RootState = initialState,
  action: Action
): RootState {
  switch (action.type) {
    case ActionTypes.APP_SET_TERMS:
      return { ...state, terms: { ...state.terms, ...action.terms } };

    case ActionTypes.APP_SET_CONFIGURATION:
      return { ...state, about: { ...state.about, ...action.about } };

    case ActionTypes.APP_SET_NEED_UPDATE_VERSION:
      return { ...state, update: { ...state.update, ...action.update } };

    default:
      return state;
  }
}
