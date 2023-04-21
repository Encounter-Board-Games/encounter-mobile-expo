import { Dispatch } from 'redux';
import { RootState } from '../../Store';
import { setChipFilters } from './setFilters';

export const setSelects = (selects: Selects) => ({
  type: 'SET_SELECTS' as const,
  selects,
});

export const setSelectFilterToggle = (filterType: string, value: string) => ({
  type: 'SET_SELECT_FILTER_TOGGLE' as const,
  filterType,
  value,
});

export const setSelectFilter = (filterType: string, value: string) => ({
  type: 'SET_SELECT_FILTER' as const,
  filterType,
  value,
});

export const setSelectsDefault = (defaultSelectsFilter: DefaultSelectsFilter) => ({
  type: 'SET_SELECTS_DEFAULT' as const,
  defaultSelectsFilter,
});

export const setChips = () => (dispatch: Dispatch, getState: () => RootState) => {
  const { filters } = getState();
  const { defaultSelectsFilter = {} } = filters;
  const { text = '' } = filters;
  
  const chips: Chip[] = [
    {
      isRemovable: false,
      text: filters.selects.order[0],
      type: 'order',
    }, 
  ];
  
  if (filters && filters.filters.find((f) => f.type === 'searchGroup')) {
    chips.push({
      isRemovable: filters.selects.searchGroup[0] !== defaultSelectsFilter.searchGroup[0],
      text: filters.selects.searchGroup[0],
      type: 'searchGroup',
    });
  }
  
  Object.keys(filters.selects)
    .filter((key) => filters.selects[key].length > 0 && key !== 'order' && key !== 'searchGroup')
    .map((key) => ({
      isRemovable: true,
      text: key === 'numberOfPlayer' 
        ? `${filters.selects[key].sort().join(', ')} jogador${filters.selects[key].length === 1 && filters.selects[key][0] === 1 ? '' : 'es'}` 
        : `${filters.filters.find((f) => f.type === key).title} (${filters.selects[key].length})`,
      type: key,
    }))
    .forEach((item) => chips.push(item));
    
  dispatch(setChipFilters(chips));
};
