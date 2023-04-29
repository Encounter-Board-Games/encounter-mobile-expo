import { Dispatch } from 'redux';
import { handleSetSelects } from './filters/handleSetFilters';
import { customFilter } from '../../graphql';

export const SET_SELECT_FILTER_TOGGLE_DISCOVERY =
  'SET_SELECT_FILTER_TOGGLE_DISCOVERY';
export const START_DISCOVERY = 'START_DISCOVERY';
export const OPEN_DISCOVERY = 'OPEN_DISCOVERY';
export const CLOSE_DISCOVERY = 'CLOSE_DISCOVERY';
export const SET_FILTERS_DISCOVERY = 'SET_FILTERS_DISCOVERY';
export const SET_DISCOVERY_STEPS = 'SET_DISCOVERY_STEPS';

export interface SetSelectFilterToggleDiscoveryAction {
  type: typeof SET_SELECT_FILTER_TOGGLE_DISCOVERY;
  filterType: string;
  value: boolean;
}

export interface SetFiltersDiscoveryAction {
  type: typeof SET_FILTERS_DISCOVERY;
  filters: Record<string, unknown>;
}

export interface StartDiscoveryAction {
  type: typeof START_DISCOVERY;
}

export interface SetDiscoveryStepsAction {
  type: typeof SET_DISCOVERY_STEPS;
  steps: Record<string, unknown>;
}

export interface OpenDiscoveryAction {
  type: typeof OPEN_DISCOVERY;
}

export interface CloseDiscoveryAction {
  type: typeof CLOSE_DISCOVERY;
}

export type DiscoveryActionTypes =
  | SetSelectFilterToggleDiscoveryAction
  | SetFiltersDiscoveryAction
  | StartDiscoveryAction
  | SetDiscoveryStepsAction
  | OpenDiscoveryAction
  | CloseDiscoveryAction;

export function setSelectFilterToggleDiscovery(
  filterType: string,
  value: boolean
): SetSelectFilterToggleDiscoveryAction {
  return {
    type: SET_SELECT_FILTER_TOGGLE_DISCOVERY,
    filterType,
    value,
  };
}

function setFilters(
  filters: Record<string, unknown>
): SetFiltersDiscoveryAction {
  return {
    type: SET_FILTERS_DISCOVERY,
    filters,
  };
}

export function startDiscovery(): StartDiscoveryAction {
  return {
    type: START_DISCOVERY,
  };
}

export function setDiscoverySteps(
  steps: Record<string, unknown>
): SetDiscoveryStepsAction {
  return {
    type: SET_DISCOVERY_STEPS,
    steps,
  };
}

function openDiscovery(): OpenDiscoveryAction {
  return {
    type: OPEN_DISCOVERY,
  };
}

export function closeDiscovery(): CloseDiscoveryAction {
  return {
    type: CLOSE_DISCOVERY,
  };
}

let discoveryResolve:
  | ((value?: boolean | PromiseLike<boolean>) => void)
  | undefined;

export function handleOpenDiscovery() {
  return async (dispatch: Dispatch<DiscoveryActionTypes>) => {
    dispatch(openDiscovery());
    dispatch(handleLoadDiscovery());

    return new Promise((r) => {
      discoveryResolve = r;
    });
  };
}

export function handleLoadDiscovery() {
  return async (dispatch: Dispatch<DiscoveryActionTypes>) => {
    const steps = await customFilter('discovery');
    dispatch(setDiscoverySteps(steps));
  };
}

export function handleFinishDiscovery() {
  return async (
    dispatch: Dispatch<DiscoveryActionTypes>,
    getState: () => { discovery: { filters: Record<string, unknown> } }
  ) => {
    const { discovery } = getState();

    dispatch(handleSetSelects(discovery.filters));

    // await Storage.setItem(storageName, discovery.filters)
    dispatch(closeDiscovery());
    dispatch(setFilters({}));
    if (discoveryResolve) discoveryResolve(true);
  };
}
