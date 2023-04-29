import storage from '../../../utils/storage';
import { getFilters, getFilter, getProducts } from '../../../graphql';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { arrayToObj } from '../../../utils/helpers';
import { setProducts } from '../product';
import {
  setChips,
  setFilteringResultLoading,
  setFilteringResult,
  setNumberOfFilters,
} from './filters';
import { handleSetSelects } from './handleSetFilters';
import {
  IAction,
  IFilterState,
  IState,
  IClearButtonProps,
  IFilterChipsProps,
  IFilterSelectProps,
  IFilterBarProps,
  IFilter,
} from './filterTypes';

export function clearSelects(): IAction {
  return {
    type: 'SET_CLEAR_SELECTS',
  };
}

export function clearSelectsForType(filterType: string): IAction {
  return {
    type: 'SET_CLEAR_SELECTS_FOR_TYPE',
    filterType,
  };
}

export function setSelectFilter(filterType: string, value: string): IAction {
  return {
    type: 'SET_SELECT_FILTER',
    filterType,
    value,
  };
}

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

export function filterItems(debounce = true): any {
  return async (dispatch: any, getState: any) => {
    const { filters }: IState = getState();
    const { defaultSelectsFilter = {}, text = undefined } = filters;
    const currentId = +new Date();
    filterId = currentId;
    dispatch(setChips());
    dispatch(calcNumberOfFilters());
    const hasFilter =
      Object.keys(filters.selects).filter(
        (key) =>
          filters.selects[key].length > 0 &&
          key !== 'order' &&
          (key !== 'searchGroup' ||
            (key == 'searchGroup' &&
              filters.selects[key][0] !== defaultSelectsFilter.searchGroup[0]))
      ).length > 0 ||
      (filters.text && filters.text.length > 0);

    const search_ = async () => {
      dispatch(setFilteringResultLoading());
      const products = (await getProducts(filters.selects, text)).products;
      dispatch(setProducts(arrayToObj(products)));
      const result = products.map((p) => p.key);
      if (filterId === currentId) {
        dispatch(setFilteringResult(result, true));
      }
    };

    if (!hasFilter) dispatch(setFilteringResult([1, 2, 4], false));
    else
      !debounce
        ? search_()
        : setTimeout(async () => {
          if (filterId === currentId) {
            search_();
          }
        }, 500);
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
      dispatch(handleClearSelects(""));
    }
  };

  return (
    <div>
      <button onClick={() => handleClick()}>Clear</button>
    </div>
  );
}

export function FilterChips(props: IFilterChipsProps) {
  const { chips } = props;
  const dispatch = useDispatch();

  const handleDelete = (index: number) => {
    dispatch(setSelectFilter(chips[index], ''));
  };

  return (
    <div>
      {chips.map((chip, index) => (
        <Chip
          key={chip}
          label={chip}
          onDelete={() => handleDelete(index)}
          color="primary"
        />
      ))}
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

export function FilterBar(props: IFilterBarProps) {
  const { filters, options } = props;

  return (
    <div>
      {filters.map((filter) => (
        <div key={filter.type}>
          <FilterSelect
            type={filter.type}
            options={options[filter.type]}
            isSingle={filter.isSingle}
          />
          <ClearButton type={filter.type} />
        </div>
      ))}
      <FilterChips chips={[]} />
    </div>
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
        [key]:selected[key],
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