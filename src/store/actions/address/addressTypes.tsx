export const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";
export const SET_CURRENT_LOCATION_NOT_FOUND = "SET_CURRENT_LOCATION_NOT_FOUND";
export const SET_LOCATIONS_SEARCHS = "SET_LOCATIONS_SEARCHS";
export const SET_LOCATIONS_SEARCHS_NOT_FOUND = "SET_LOCATIONS_SEARCHS_NOT_FOUND";
export const SET_SEARCHS_LOCATIONS_TERM = "SET_SEARCHS_LOCATIONS_TERM";
export const SET_LOCATIONS_SEARCHS_LOADING = "SET_LOCATIONS_SEARCHS_LOADING";
export const SET_CHOSE_ADDRESS_MODE = "SET_CHOSE_ADDRESS_MODE";
export const SET_ADRESSES = "SET_ADRESSES";
export const ADD_ADDRESS = "ADD_ADRESSES";
export const REMOVE_ADDRESS = "REMOVE_ADDRESS";
export const EDIT_ADDRESS = "EDIT_ADDRESS";

export interface SetCurrentLocationAction {
  type: typeof SET_CURRENT_LOCATION;
  currentLocation: LocationModel;
}

export interface SetCurrentLocationNotFoundAction {
  type: typeof SET_CURRENT_LOCATION_NOT_FOUND;
}

export interface SetLocationsSearchsAction {
  type: typeof SET_LOCATIONS_SEARCHS;
  locations: LocationModel[];
}

export interface SetLocationsSearchsNotFoundAction {
  type: typeof SET_LOCATIONS_SEARCHS_NOT_FOUND;
}

export interface SetSearchsLocationsTermAction {
  type: typeof SET_SEARCHS_LOCATIONS_TERM;
  searchLocationsTerm: string;
}

export interface SetLocationsSearchsLoadingAction {
  type: typeof SET_LOCATIONS_SEARCHS_LOADING;
}

export interface SetChoseAddressModeAction {
  type: typeof SET_CHOSE_ADDRESS_MODE;
  choseAddressMode: boolean;
}

export interface SetAddressesAction {
  type: typeof SET_ADRESSES;
  addresses: AddressModel[];
}

export interface AddAddressAction {
  type: typeof ADD_ADDRESS;
  address: AddressModel;
}

export interface RemoveAddressAction {
  type: typeof REMOVE_ADDRESS;
  key: string;
}

export interface EditAddressAction {
  type: typeof EDIT_ADDRESS;
  address: AddressModel;
}

// Action Types
export type AddressActionType =
  | SetCurrentLocationAction
  | SetCurrentLocationNotFoundAction
  | SetLocationsSearchsAction
  | SetLocationsSearchsNotFoundAction
  | SetSearchsLocationsTermAction
  | SetLocationsSearchsLoadingAction
  | SetChoseAddressModeAction
  | SetAddressesAction
  | AddAddressAction
  | RemoveAddressAction
  | EditAddressAction;

// Models
export interface LocationModel {
  key?: string;
  description: string;
  lat: number;
  lng: number;
}

export interface AddressModel extends LocationModel {
  number?: string;
  complement?: string;
  reference?: string;
  name?: string;
  cep?: string;
}