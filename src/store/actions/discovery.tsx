import { handleSetSelects } from './filters/handleSetFilters';
import { Dispatch } from 'react';
import { AppActions } from '../../screens/home/components/DiscoverySection';
import { useCustomFilter } from '../../graphql';

export const SET_SELECT_FILTER_TOGGLE_DISCOVERY =
  'SET_SELECT_FILTER_TOGGLE_DISCOVERY';
export const START_DISCOVERY = 'START_DISCOVERY';
export const OPEN_DISCOVERY = 'OPEN_DISCOVERY';
export const CLOSE_DISCOVERY = 'CLOSE_DISCOVERY';
export const SET_FILTERS_DISCOVERY = 'SET_FILTERS_DISCOVERY';
export const SET_DISCOVERY_STEPS = 'SET_DISCOVERY_STEPS';

export interface SetSelectFilterToggleDiscoveryAction {
  type: typeof SET_SELECT_FILTER_TOGGLE_DISCOVERY;
  filterType: any;
  value: any;
}

export const setSelectFilterToggleDiscovery = (
  filterType: any,
  value: any
): SetSelectFilterToggleDiscoveryAction => ({
  type: SET_SELECT_FILTER_TOGGLE_DISCOVERY,
  filterType,
  value,
});

export interface SetFiltersAction {
  type: typeof SET_FILTERS_DISCOVERY;
  filters: any;
}

export function setFilters(filters: any): SetFiltersAction {
  return {
    type: SET_FILTERS_DISCOVERY,
    filters,
  };
}

export interface StartDiscoveryAction {
  type: typeof START_DISCOVERY;
}

export const startDiscovery = (): StartDiscoveryAction => ({
  type: START_DISCOVERY,
});

export interface SetDiscoveryStepsAction {
  type: typeof SET_DISCOVERY_STEPS;
  steps: any;
}

export const setDiscoverySteps = (steps: any): SetDiscoveryStepsAction => ({
  type: SET_DISCOVERY_STEPS,
  steps,
});

export interface OpenDiscoveryAction {
  type: typeof OPEN_DISCOVERY;
}

export function openDiscovery(): OpenDiscoveryAction {
  return {
    type: OPEN_DISCOVERY,
  };
}

export interface CloseDiscoveryAction {
  type: typeof CLOSE_DISCOVERY;
}

export const closeDiscovery = (): CloseDiscoveryAction => ({
  type: CLOSE_DISCOVERY,
});

let discoveryResolve: any;

export const handleOpenDiscovery = (): AppActions => {
  return (dispatch: Dispatch<AppActions>): Promise<AppActions> => {
    dispatch(openDiscovery());
    dispatch(handleLoadDiscovery());

    return new Promise((r) => (discoveryResolve = r));
  };
};

export const handleLoadDiscovery = () => async (dispatch: any) => {
  const steps = await useCustomFilter('discovery');
  dispatch(setDiscoverySteps(steps));
};

export const handleFinishDiscovery =
  () => async (dispatch: any, getState: any) => {
    const { discovery } = getState();

    dispatch(handleSetSelects(discovery.filters));
    dispatch(closeDiscovery());
    dispatch(setFilters({}));
    if (discoveryResolve) discoveryResolve(true);
  };
