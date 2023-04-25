/* eslint-disable prettier/prettier */
/* eslint-disable indent */
// actionTypes.ts
export enum ActionTypes {
  SET_DISCOVERY_STEPS = 'SET_DISCOVERY_STEPS',
  SET_SELECT_FILTER_TOGGLE_DISCOVERY = 'SET_SELECT_FILTER_TOGGLE_DISCOVERY',
  OPEN_DISCOVERY = 'OPEN_DISCOVERY',
  CLOSE_DISCOVERY = 'CLOSE_DISCOVERY',
  START_DISCOVERY = 'START_DISCOVERY',
  SET_FILTERS_DISCOVERY = 'SET_FILTERS_DISCOVERY',
}

interface RootState {
  filters: Record<string, any>;
  steps?: any;
  open?: boolean;
  start?: boolean;
}

interface Action {
  type: ActionTypes;
  steps?: any;
  filterType?: string;
  value?: any;
  filters?: Record<string, any>;
}

const initialState: RootState = { filters: {} };

export default function discovery(
  state: RootState = initialState,
  action: Action
): RootState {
  switch (action.type) {
  case ActionTypes.SET_DISCOVERY_STEPS:
    return { ...state, steps: action.steps };

  case ActionTypes.SET_SELECT_FILTER_TOGGLE_DISCOVERY:
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.filterType!]: !state.filters[action.filterType!]
          ? [action.value!]
          : state.filters[action.filterType!].includes(action.value!)
            ? state.filters[action.filterType!].filter(
                (c) => c !== action.value
              )
            : state.filters[action.filterType!].concat([action.value!]),
      },
    };

  case ActionTypes.OPEN_DISCOVERY:
    return { ...state, open: true };

  case ActionTypes.CLOSE_DISCOVERY:
    return { ...state, open: false };

  case ActionTypes.START_DISCOVERY:
    return { ...state, start: true };

  case ActionTypes.SET_FILTERS_DISCOVERY:
    return { ...state, filters: { ...action.filters! } };

  default:
    return state;
  }
}
