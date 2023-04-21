import storage from '../../../utils/storage';
import { setSelectFilter, filterItems, handleClearSelects } from './filters';
import { setFilteringText, setRecentsFilteringTexts } from './handleFilters';
import { setSelectFilterToggle, setSelects } from './setSelects';

const myFavorites = 'Meus Favoritos';

export function handleSetSelectFilter(
  filterType: string,
  value: string,
  needDebounce = true
): any {
  return (dispatch: any, getState: any) => {
    const { filters }: IState = getState();
    if (filters.filters.find((f) => f.type === filterType && f.isSingle)) {
      dispatch(setSelectFilter(filterType, value));
    } else {
      dispatch(setSelectFilterToggle(filterType, value));
    }
    dispatch(filterItems(needDebounce));
  };
}

export function handleSetSelects(filtersIn: { [key: string]: string }): any {
  return (dispatch: any, getState: any) => {
    const { filters }: IState = getState();
    if (filtersIn.text) dispatch(setFilteringText(filtersIn.text));
    else dispatch(setFilteringText(''));
    Object.keys(filtersIn).map((key) => {
      if (
        !filters.filters.find((f) => f.type === key) ||
        filtersIn[key] == null
      )
        delete filtersIn[key];
    });
    dispatch(setSelects(filtersIn));
    dispatch(filterItems(false));
  };
}

export function handleSetRecentsFilteringText(): any {
  return (dispatch: any, getState: any) => {
    const { filters }: IState = getState();
    const { recentTexts = [], text } = filters;
    let newRecentTexts = recentTexts.filter((e) => e !== text).map((e) => e);
    if (!text || text.length === 0) return;
    if (newRecentTexts.length !== 0) {
      const lastText = newRecentTexts[recentTexts.length - 1];
      if (text.includes(lastText)) {
        newRecentTexts[newRecentTexts.length - 1] = text;
      } else {
        newRecentTexts.push(text);
      }
    } else {
      newRecentTexts.push(text);
    }
    if (newRecentTexts.length > 5) newRecentTexts.shift();
    dispatch(setRecentsFilteringTexts(newRecentTexts));
    storage.setItem('RECENT_TEXTS', newRecentTexts);
  };
}

export function handleSetMyFavorites(): any {
  return (dispatch: any) => {
    dispatch(handleClearSelects());
    dispatch(handleSetSelectFilter('searchGroup', myFavorites, false));
  };
}
