import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../graphql';
import { setProducts } from '../product';
import { arrayToObj } from '../../../utils/helpers';
import {
  IAction,
  IState,
  IFilterState,
  IFilterSelectProps,
  IFilterChipsProps,
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

export function setNumberOfFilters(n: number): IAction {
  return {
    type: 'SET_NUMBER_OF_FILTERS',
    n,
  };
}

export function setChips(): IAction {
  return {
    type: 'SET_CHIPS',
  };
}

export function setFilteringResult(
  result: number[],
  loading: boolean
): IAction {
  return {
    type: 'SET_FILTERING_RESULT',
    result,
    loading,
  };
}

export function setFilteringResultLoading(): IAction {
  return {
    type: 'SET_FILTERING_RESULT_LOADING',
  };
}

let filterId: number | undefined = undefined;

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
      !debounce ? search_() :
        setTimeout(async () => {
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
      .filter((key) => key !== "order" && key !== "searchGroup")
      .filter((key) => state.filters.selects[key].length > 0).length;
    dispatch(setNumberOfFilters(n));
  };
}

export function FilterSelect(props: IFilterSelectProps) {
  const { type, options, isSingle } = props;
  const dispatch = useDispatch();
  const selects = useSelector((state: IState) => state.filters.selects[type] || []);
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

interface IFilterBarProps {
  filters: IFilterState[];
  options: { [key: string]: { value: string; label: string }[] };
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
