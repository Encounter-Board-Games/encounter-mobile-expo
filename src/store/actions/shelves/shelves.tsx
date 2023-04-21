import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getShelves, getBanners } from '../../../graphql';
import { setProducts } from '../product';
import { Shelf, Banner, State, ShelvesAction, BannersAction, LoadingAction, CurrentBannerAction, Props } from './shelvesTypes';


const SET_LOADING = 'SET_LOADING';
const SET_SHELVES = 'SET_SHELVES';
const SET_BANNERS = 'SET_BANNERS';
const SET_CURRENT_BANNER = 'SET_CURRENT_BANNER';

export function setShelves(shelves: { [key: string]: Shelf }): ShelvesAction {
  return {
    type: SET_SHELVES,
    shelves,
  };
}

export function setBanners(banners: Banner[]): BannersAction {
  return {
    type: SET_BANNERS,
    banners,
  };
}

export function setIsLoading(loading: boolean): LoadingAction {
  return {
    type: SET_LOADING,
    loading,
  };
}

export function setCurrentBanner(current: Banner): CurrentBannerAction {
  return {
    type: SET_CURRENT_BANNER,
    current,
  };
}

export function handleLoadShelves() {
  return async (dispatch: any, getState: () => State) => {
    dispatch(setIsLoading(true));

    const { onboarding } = getState();

    const filters = Object.keys(onboarding.filters || {}).map(key => ({
      [key]: onboarding.filters[key].flat(),
    })).reduce((a, b) => ({ ...b, ...a }), {});

    const shelves: Shelf[] = await getShelves(filters);

    const shelvesFormated = shelves.reduce<{ [key: string]: Shelf }>((a, b) => ({
      [b.key]: {
        ...b,
        title: b.title,
        subtitle: b.subtitle?.length ? b.subtitle : undefined,
        products: (b.products || []).map(p => p.key),
      },
      ...a,
    }), {});
    
    const products = shelves.map(c => c.products || []).flat().reduce<{ [key: string]: any }>((a, b) => ({
      [b.key]: b,
      ...a,
    }), {});

    dispatch(setProducts(products));
    dispatch(setShelves(shelvesFormated));
    dispatch(setIsLoading(false));
  };
}

export function handleInitBanner() {
  return async (dispatch: any) => {
    const banners = await getBanners();
    dispatch(setBanners(banners));
  };
}

function reducer(state = { shelves: {}, banners: [], isLoading: false, currentBanner: null }, action: Action) {
  switch (action.type) {
    case SET_SHELVES:
      return {
        ...state,
        shelves: action.shelves,
      };
    case SET_BANNERS:
      return {
        ...state,
        banners: action.banners,
      };
      case SET_LOADING:
        return {
          ...state,
          isLoading: action.loading,
        };
      case SET_CURRENT_BANNER:
        return {
          ...state,
          currentBanner: action.current,
        };
      default:
        return state;
      }
    }
    
    function App({ children }: Props) {
    const dispatch = useDispatch();
    
    useEffect(() => {
    dispatch(handleLoadShelves());
    dispatch(handleInitBanner());
    }, [dispatch]);
    
    return <>{children}</>;
    }
    
    export default App;      
