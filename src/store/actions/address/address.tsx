import { handleSelectAddress } from '../cart';
import {
  getAddressByLatLong,
  addAddress,
  editAddress,
  removeAddress,
  getAddressBySearch,
} from '../../../graphql';
import { handleShowNotification } from '../notification';
import { openPopupModal } from '../info';
import {
  SetLocationsSearchsLoadingAction,
  AddressModel,
  AddAddressAction,
  EditAddressAction,
  SetChoseAddressModeAction,
  LocationModel,
  SetCurrentLocationAction,
  SetCurrentLocationNotFoundAction,
  SetLocationsSearchsAction,
  SetLocationsSearchsNotFoundAction,
  SetSearchsLocationsTermAction,
  SetAddressesAction,
  RemoveAddressAction,
} from './addressTypes';

// Action Types
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export const SET_CURRENT_LOCATION_NOT_FOUND = 'SET_CURRENT_LOCATION_NOT_FOUND';
export const SET_LOCATIONS_SEARCHS = 'SET_LOCATIONS_SEARCHS';
export const SET_LOCATIONS_SEARCHS_NOT_FOUND =
  'SET_LOCATIONS_SEARCHS_NOT_FOUND';
export const SET_SEARCHS_LOCATIONS_TERM = 'SET_SEARCHS_LOCATIONS_TERM';
export const SET_LOCATIONS_SEARCHS_LOADING = 'SET_LOCATIONS_SEARCHS_LOADING';
export const SET_CHOSE_ADDRESS_MODE = 'SET_CHOSE_ADDRESS_MODE';
export const SET_ADRESSES = 'SET_ADRESSES';
export const ADD_ADDRESS = 'ADD_ADRESSES';
export const REMOVE_ADDRESS = 'REMOVE_ADDRESS';
export const EDIT_ADDRESS = 'EDIT_ADDRESS';

export function setLocationSearchsLoading(): SetLocationsSearchsLoadingAction {
  return {
    type: SET_LOCATIONS_SEARCHS_LOADING,
  };
}

export function setAddAddress(address: AddressModel): AddAddressAction {
  return {
    type: ADD_ADDRESS,
    address,
  };
}

export function setEditAddress(address: AddressModel): EditAddressAction {
  return {
    type: EDIT_ADDRESS,
    address,
  };
}

export function setChoseAddressMode(show: boolean): SetChoseAddressModeAction {
  return {
    type: SET_CHOSE_ADDRESS_MODE,
    choseAddressMode: show,
  };
}

export function setCurrentLocation(
  currentLocation: LocationModel
): SetCurrentLocationAction {
  return {
    type: SET_CURRENT_LOCATION,
    currentLocation,
  };
}

export function setCurrentLocationNotFound(): SetCurrentLocationNotFoundAction {
  return {
    type: SET_CURRENT_LOCATION_NOT_FOUND,
  };
}

export function setLocationSearchs(
  locations: LocationModel[]
): SetLocationsSearchsAction {
  return {
    type: SET_LOCATIONS_SEARCHS,
    locations,
  };
}

export function setLocationSearchsNotFound(): SetLocationsSearchsNotFoundAction {
  return {
    type: SET_LOCATIONS_SEARCHS_NOT_FOUND,
  };
}

export function setSearchLocationTerm(
  searchLocationsTerm: string
): SetSearchsLocationsTermAction {
  return {
    type: SET_SEARCHS_LOCATIONS_TERM,
    searchLocationsTerm,
  };
}

export function setAdresses(addresses: AddressModel[]): SetAddressesAction {
  return {
    type: SET_ADRESSES,
    addresses,
  };
}

export function setRemoveAddress(key: string): RemoveAddressAction {
  return {
    type: REMOVE_ADDRESS,
    key,
  };
}

export function handleSearchLocation(lat: number, long: number) {
  return async (dispatch: any) => {
    const currentId = +new Date();
    let serachLocationId = currentId;
    setTimeout(async () => {
      if (serachLocationId === currentId) {
        try {
          console.log('search');
          dispatch(setCurrentLocation(undefined));
          const result = await getAddressByLatLong(`${lat}`, `${long}`);
          if (!result.success) throw Error();
          dispatch(setCurrentLocation(result.address));
        } catch (error) {
          dispatch(setCurrentLocationNotFound());
        }
      }
    }, 500);
  };
}

export function handleSetCurrentLocation(
  key: string,
  location?: LocationModel
) {
  return (dispatch: any, getState: any) => {
    const { address } = getState();
    const { adresses = {} } = address;
    if (key && adresses[key]) dispatch(setCurrentLocation(adresses[key]));
    if (location) dispatch(setCurrentLocation(location));
  };
}

export function handleAddOrEditAddress(
  number: string,
  complement: string,
  reference: string,
  name: string,
  cep: string
) {
  return async (dispatch: any, getState: any) => {
    const { address } = getState();
    const { currentLocation, choseAddressMode = false } = address;
    try {
      let result;
      if (currentLocation.key) {
        result = await editAddress(currentLocation.key, {
          number,
          complement,
          reference,
          name,
        });
        dispatch(setEditAddress(result.address));
        dispatch(handleShowNotification('Endereço alterado com sucesso'));
      } else {
        result = await addAddress({
          ...currentLocation,
          number,
          complement,
          reference,
          name,
          cep,
        });
        dispatch(setAddAddress(result.address));
        dispatch(handleShowNotification('Endereço adicionado com sucesso'));
      }

      if (choseAddressMode) {
        dispatch(handleSelectAddress(result.address.key));
      }
      return true;
    } catch (error) {
      console.log(error);
      dispatch(handleShowNotification('Ocorreu um erro.', 'danger'));
      return false;
    }
  };
}

export function handleRemoveAddressConfirmModal() {
  return async (dispatch: any) => {
    return await new Promise((resolve) => {
      dispatch(
        openPopupModal('CONFIRM_MODAL', {
          callBack: (r: any) => {
            if (r) dispatch(handleRemoveAddress());
            resolve(r);
          },
          title: 'Exluir endereço',
          description: 'Você tem certeza que deseja excluir?',
        })
      );
    });
  };
}

export function handleRemoveAddress() {
  return async (dispatch: any, getState: any) => {
    const { address } = getState();
    const { adresses = {}, currentLocation } = address;
    const { key } = currentLocation;
    const addressToRemove = adresses[key];
    try {
      dispatch(setRemoveAddress(key));
      const result = await removeAddress(key);
      if (!result.success) throw Error();
      dispatch(handleShowNotification('Removido com sucesso'));
    } catch (error) {
      console.log(error);
      dispatch(setAdresses(addressToRemove));
      dispatch(handleShowNotification('Erro ao excluir endereço.', 'danger'));
    }
  };
}

export function handleSearchLocationByTerm(search: string, cep: string) {
  return async (dispatch: any) => {
    const currentId = +new Date();
    let serachLocationId = currentId;
    dispatch(setSearchLocationTerm(search));
    dispatch(setLocationSearchsLoading());

    setTimeout(async () => {
      if (
        serachLocationId === currentId &&
        search !== '' &&
        search.length === 9
      ) {
        try {
          const result = await getAddressBySearch(search);
          if (!result.success) throw Error();
          dispatch(setLocationSearchs(result.adresses));
        } catch (error) {
          console.log('erro', error);
          dispatch(setLocationSearchs([]));
        }
      }
    }, 500);
  };
}
