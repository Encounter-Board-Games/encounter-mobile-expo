/* eslint-disable indent */
import storage from '../../../utils/storage';
import { getFilters, getFilter } from '../../../graphql';
import React from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNumberOfFilters,
  clearSelects,
  clearSelectsForType,
  setSelectFilter,
} from './filters';
import { handleSetSelects } from './handleSetFilters';
import {
  IAction,
  IFilterState,
  IState,
  IClearButtonProps,
  IFilterSelectProps,
  IFilter,
} from './filterTypes';
import { filterItems } from './filtersItems';

export function setSelectsDefault(selected: {
  [key: string]: string[];
}): IAction {
  return {
    type: 'SET_SELECTS_DEFAULT',
    selected,
  };
}

export function setFilters(filters: IFilterState[]): IAction {
  return {
    type: 'SET_FILTERS',
    filters,
  };
}

export function setRecentsFilteringTexts(recentTexts: string[]): IAction {
  return {
    type: 'SET_RECENTS_FILTERING_TEXTS',
    recentTexts,
  };
}

export function setFilteringText(text: string): IAction {
  return {
    type: 'SET_FILTERING_TEXT',
    text,
  };
}

export function calcNumberOfFilters(): any {
  return (dispatch: any, getState: any) => {
    const state: IState = getState();
    const n = Object.keys(state.filters.selects)
      .filter((key) => key !== 'order' && key !== 'searchGroup')
      .filter((key) => state.filters.selects[key].length > 0).length;
    dispatch(setNumberOfFilters(n));
  };
}

export function ClearButton(props: IClearButtonProps) {
  const { type } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    if (type) {
      dispatch(handleClearSelects(type));
    } else {
      dispatch(handleClearSelects(''));
    }
  };

  return (
    <div>
      <button onClick={() => handleClick()}>Clear</button>
    </div>
  );
}

export function FilterSelect(props: IFilterSelectProps) {
  const { type, options, isSingle } = props;
  const dispatch = useDispatch();
  const selects = useSelector(
    (state: IState) => state.filters.selects[type] || []
  );
  const handleChange = (value: string) => {
    dispatch(setSelectFilter(type, value));
    if (isSingle) dispatch(filterItems());
  };

  return (
    <Select
      value={selects}
      onChange={(value) => handleChange(value)}
      options={options}
      isMulti={!isSingle}
    />
  );
}

export function handleClearSelects(type: string): any {
  return (dispatch: any, getState: any) => {
    const { filters }: IState = getState();
    const { defaultSelectsFilter = {} } = filters;
    const filter = filters.filters.find((f) => f.type === type);
    if (filter && filter.isSingle) {
      dispatch(setSelectFilter(type, defaultSelectsFilter[type][0]));
    } else {
      if (type) dispatch(clearSelectsForType(type));
      else dispatch(clearSelects());
    }
    dispatch(filterItems(false));
  };
}

export function handleLoadFilters(): any {
  return async (dispatch: any, getState: any) => {
    const { filters: filtersState }: IState = getState();
    if (filtersState.filters) return;
    const { filters, selected }: IFilter = await getFilters();
    const recentTexts = await storage.getItem('RECENT_TEXTS');
    const selectedFiltered = Object.keys(selected)
      .filter((key) => Array.isArray(selected[key]))
      .map((key) => ({
        [key]: selected[key],
      }))
      .reduce((a, b) => ({
        ...a,
        ...b,
      }));
    dispatch(setSelectsDefault(selectedFiltered));
    dispatch(setFilters(filters));
    dispatch(setRecentsFilteringTexts(recentTexts ? recentTexts : []));
  };
}

export function handleLoadAndOpenFilter(key: string): any {
  return async (dispatch: any) => {
    const filter = await getFilter(key);
    dispatch(handleSetSelects(filter));
  };
}

export function handleChangeFilteringText(text: string, debounce = true): any {
  return (dispatch: any) => {
    dispatch(setFilteringText(text));
    dispatch(filterItems(debounce));
  };
}
export { filterItems };
