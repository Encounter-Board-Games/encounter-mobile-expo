const SET_LOADING = 'SET_LOADING';
const SET_SHELVES = 'SET_SHELVES';
const SET_BANNERS = 'SET_BANNERS';
const SET_CURRENT_BANNER = 'SET_CURRENT_BANNER';

export interface Shelf {
  key: string;
  title: string;
  subtitle?: string;
  products: string[];
}

export interface Banner {
  key: string;
  imageUrl: string;
  linkUrl: string;
}

export interface State {
  onboarding: {
    filters: {
      [key: string]: {
        flat(): any[];
      };
    };
  };
}

export interface ShelvesAction {
  type: typeof SET_SHELVES;
  shelves: { [key: string]: Shelf };
}

export interface BannersAction {
  type: typeof SET_BANNERS;
  banners: Banner[];
}

export interface LoadingAction {
  type: typeof SET_LOADING;
  loading: boolean;
}

export interface CurrentBannerAction {
  type: typeof SET_CURRENT_BANNER;
  current: Banner;
}

export type Action =
  | ShelvesAction
  | BannersAction
  | LoadingAction
  | CurrentBannerAction;

export interface Props {
  children: React.ReactNode;
}
