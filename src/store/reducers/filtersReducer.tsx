/* eslint-disable indent */
export enum ActionTypes {
  SET_FILTERING_TUTORIAL = 'SET_FILTERING_TUTORIAL',
  SET_SELECTS_DEFAULT = 'SET_SELECTS_DEFAULT',
  SET_FILTERS = 'SET_FILTERS',
  SET_SELECT_FILTER_TOGGLE = 'SET_SELECT_FILTER_TOGGLE',
  SET_FILTERING_RESULTS = 'SET_FILTERING_RESULTS',
  SET_FILTERING_RESULTS_LOADING = 'SET_FILTERING_RESULTS_LOADING',
  SET_SELECT_FILTER = 'SET_SELECT_FILTER',
  SET_CLEAR_SELECTS = 'SET_CLEAR_SELECTS',
  SET_CLEAR_SELECTS_FOR_TYPE = 'SET_CLEAR_SELECTS_FOR_TYPE',
  SET_SELECTS = 'SET_SELECTS',
  SET_FILTERING_TEXT = 'SET_FILTERING_TEXT',
  SET_RECENTS_FILTERING_TEXT = 'SET_RECENTS_FILTERING_TEXT',
  SET_NUMBER_OF_FILTERS = 'SET_NUMBER_OF_FILTERS',
  SET_CHIP_FILTERS = 'SET_CHIP_FILTERS',
}

interface RootState {
  tutorial?: boolean;
  selects?: Record<string, any>;
  defaultSelectsFilter?: Record<string, any>;
  filters?: any[];
  results?: any;
  isFiltered?: boolean;
  isLoading?: boolean;
  text?: string;
  recentTexts?: string[];
  numberOfFilters?: number;
  chips?: any[];
}

interface Action {
  type: ActionTypes;
  show?: boolean;
  defaultSelectsFilter?: Record<string, any>;
  filters?: any[];
  filterType?: string;
  value?: any;
  results?: any;
  isFiltered?: boolean;
  selects?: Record<string, any>;
  text?: string;
  texts?: string[];
  numberOfFilters?: number;
  chips?: any[];
}

const initialState: RootState = {};

export default function filters(
  state: RootState = initialState,
  action: Action
): RootState {
  switch (action.type) {
    case ActionTypes.SET_FILTERING_TUTORIAL:
      return { ...state, tutorial: action.show };

    case ActionTypes.SET_SELECTS_DEFAULT:
      return {
        ...state,
        selects: action.defaultSelectsFilter,
        defaultSelectsFilter: action.defaultSelectsFilter,
      };

    case ActionTypes.SET_FILTERS:
      return { ...state, filters: [...action.filters!] };

    case ActionTypes.SET_SELECT_FILTER_TOGGLE:
      return {
        ...state,
        selects: {
          ...state.selects,
          [action.filterType!]: !state.selects![action.filterType!]
            ? [action.value!]
            : state.selects![action.filterType!].includes(action.value!)
            ? state.selects![action.filterType!].filter(
                (c: any) => c !== action.value
              )
            : state.selects![action.filterType!].concat([action.value!]),
        },
      };

    case ActionTypes.SET_FILTERING_RESULTS:
      return {
        ...state,
        results: action.results,
        isFiltered: action.isFiltered,
        isLoading: false,
      };

    case ActionTypes.SET_FILTERING_RESULTS_LOADING:
      return { ...state, isLoading: true };

    case ActionTypes.SET_SELECT_FILTER:
      return {
        ...state,
        selects: { ...state.selects, [action.filterType!]: [action.value!] },
      };

    case ActionTypes.SET_CLEAR_SELECTS:
      return { ...state, selects: { ...state.defaultSelectsFilter }, text: '' };

    case ActionTypes.SET_CLEAR_SELECTS_FOR_TYPE:
      return {
        ...state,
        selects: { ...state.selects, [action.filterType!]: [] },
        text: '',
      };
    case ActionTypes.SET_SELECTS:
      return {
        ...state,
        selects: { ...state.defaultSelectsFilter, ...action.selects! },
      };

    case ActionTypes.SET_FILTERING_TEXT:
      return { ...state, text: action.text };

    case ActionTypes.SET_RECENTS_FILTERING_TEXT:
      return { ...state, recentTexts: action.texts };

    case ActionTypes.SET_NUMBER_OF_FILTERS:
      return { ...state, numberOfFilters: action.numberOfFilters };

    case ActionTypes.SET_CHIP_FILTERS:
      return { ...state, chips: action.chips };

    default:
      return state;
  }
}
