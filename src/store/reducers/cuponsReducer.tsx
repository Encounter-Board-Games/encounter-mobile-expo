/* eslint-disable indent */
// actionTypes.ts
export enum ActionTypes {
  SET_CUPONS = 'SET_CUPONS',
}

interface RootState {
  cupons?: string[];
}

interface Action {
  type: ActionTypes;
  cupons?: string[];
}

const initialState: RootState = {};

export default function cupons(
  state: RootState = initialState,
  action: Action
): RootState {
  switch (action.type) {
    case ActionTypes.SET_CUPONS:
      return { ...state, cupons: [...action.cupons!] };

    default:
      return state;
  }
}
