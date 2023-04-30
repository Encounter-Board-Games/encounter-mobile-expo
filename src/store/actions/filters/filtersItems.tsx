/* eslint-disable indent */
import { getProducts } from '../../../graphql';
import { arrayToObj } from '../../../utils/helpers';
import { setProducts } from '../product';
import {
  setChips,
  setFilteringResultLoading,
  setFilteringResult,
} from './filters';
import { IState } from './filterTypes';
import { calcNumberOfFilters } from './handleFilters';

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
            (key === 'searchGroup' &&
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
