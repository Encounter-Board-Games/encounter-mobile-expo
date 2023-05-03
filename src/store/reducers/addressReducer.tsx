/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-redeclare */
// actionTypes.ts
// address.ts

export enum ActionTypes {
  SET_ADDRESSES = 'SET_ADDRESSES',
  ADD_ADDRESS = 'ADD_ADDRESS',
  EDIT_ADDRESS = 'EDIT_ADDRESS',
  REMOVE_ADDRESS = 'REMOVE_ADDRESS',
  SET_SEARCHS_LOCATIONS_TERM = 'SET_SEARCHS_LOCATIONS_TERM',
  SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION',
  SET_CURRENT_LOCATION_NOT_FOUND = 'SET_CURRENT_LOCATION_NOT_FOUND',
  SET_LOCATIONS_SEARCHS = 'SET_LOCATIONS_SEARCHS',
  SET_LOCATIONS_SEARCHS_LOADING = 'SET_LOCATIONS_SEARCHS_LOADING',
  SET_CHOSE_ADDRESS_MODE = 'SET_CHOSE_ADDRESS_MODE',
}

interface Address {
  key?: string;
  active?: boolean;
  notFound?: boolean;
}

interface RootState {
  adresses: Record<string, Address>;
  searchLocations: {
    term?: string;
    loading?: boolean;
    locations?: any[];
  };
  currentLocation?: Address;
  choseAddressMode?: boolean;
}

interface Action {
  type: ActionTypes;
  adresses?: Record<string, Address>;
  address?: Address;
  key?: string;
  searchLocationsTerm?: string;
  currentLocation?: Address;
  choseAddressMode?: boolean;
  locations?: any[];
}

const initialState: RootState = {
  adresses: {},
  searchLocations: {},
};

export default function address(
  state: RootState = initialState,
  action: Action
): RootState {
  switch (action.type) {
    case ActionTypes.SET_ADDRESSES:
      return { ...state, adresses: { ...state.adresses, ...action.adresses } };

    case ActionTypes.ADD_ADDRESS:
      return {
        ...state,
        adresses: { ...state.adresses, [action.address!.key]: action.address },
      };

    case ActionTypes.EDIT_ADDRESS:
      return {
        ...state,
        adresses: {
          ...state.adresses,
          [action.address!.key]: {
            ...state.adresses[action.address!.key],
            ...action.address,
          },
        },
      };

    case ActionTypes.REMOVE_ADDRESS:
      return {
        ...state,
        adresses: {
          ...state.adresses,
          [action.key!]: { ...state.adresses[action.key!], active: false },
        },
      };

    case ActionTypes.SET_SEARCHS_LOCATIONS_TERM:
      return {
        ...state,
        searchLocations: {
          ...state.searchLocations,
          term: action.searchLocationsTerm,
        },
      };

    case ActionTypes.SET_CURRENT_LOCATION:
      return { ...state, currentLocation: action.currentLocation };

    case ActionTypes.SET_CURRENT_LOCATION_NOT_FOUND:
      return { ...state, currentLocation: { notFound: true } };

    case ActionTypes.SET_LOCATIONS_SEARCHS:
      return {
        ...state,
        searchLocations: {
          ...state.searchLocations,
          loading: false,
          locations: action.locations,
        },
      };

    case ActionTypes.SET_LOCATIONS_SEARCHS_LOADING:
      return {
        ...state,
        searchLocations: { ...state.searchLocations, loading: true },
      };

    case ActionTypes.SET_CHOSE_ADDRESS_MODE:
      return { ...state, choseAddressMode: action.choseAddressMode };

    default:
      return state;
  }
}
