import { useShelves, useBanners } from '../../graphql/functions/loginClient';
import { setProducts } from './product';

export const SET_LOADING = 'SET_LOADING';
export const SET_SHELVES = 'SET_SHELVES';
export const SET_BANNERS = 'SET_BANNERS';
export const SET_CURRENT_BANNER = 'SET_CURRENT_BANNER';

export interface SetShelvesAction {
  type: typeof SET_SHELVES;
  shelves: any;
}

export const setShelves = (shelves: any): SetShelvesAction => ({
  type: SET_SHELVES,
  shelves,
});

export interface SetBannersAction {
  type: typeof SET_BANNERS;
  banners: any;
}

export const setBanners = (banners: any): SetBannersAction => ({
  type: SET_BANNERS,
  banners,
});

interface SetIsLoadingAction {
  type: typeof SET_LOADING;
  loading: boolean;
}

export const setIsLoading = (loading: boolean): SetIsLoadingAction => ({
  type: SET_LOADING,
  loading,
});

interface SetCurrentBannerAction {
  type: typeof SET_CURRENT_BANNER;
  current: any;
}

export const setCurrentBanner = (current: any): SetCurrentBannerAction => ({
  type: SET_CURRENT_BANNER,
  current,
});

export const handleLoadShelves = () => async (dispatch: any, getState: any) => {
  dispatch(setIsLoading(true));

  const { onboarding } = getState();

  const shelves = await useShelves(
    Object.keys(onboarding.filters || {})
      .map((key) => ({ [key]: onboarding.filters[key].flat() }))
      .reduce((a, b) => ({ ...b, ...a }), {})
  );

  const shelvesFormated = shelves.reduce(
    (a: any, b: any) => ({
      [b.key]: {
        ...b,
        title: b.title,
        subtitle: b.subtitle?.length > 0 ? b.subtitle : undefined,
        products: (b.products || []).map((p: any) => p.key),
      },
      ...a,
    }),
    {}
  );

  const products = shelves
    .map((c: any) => c.products || [])
    .flat()
    .reduce(
      (a: any, b: any) => ({
        [b.key]: b,
        ...a,
      }),
      {}
    );

  dispatch(setProducts(products));
  dispatch(setShelves(shelvesFormated));

  dispatch(setIsLoading(false));
};

export const handleInitBanner = () => async (dispatch: any) => {
  const banners = await useBanners();

  dispatch(setBanners(banners));
};
