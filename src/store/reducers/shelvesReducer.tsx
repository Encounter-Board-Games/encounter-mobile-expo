/* eslint-disable indent */
// Define TypeScript interfaces for the RootState and actions
export interface ShelvesState {
  loading?: boolean;
  shelves?: Record<string, any>;
  banners?: {
    items?: any[];
    currentBanner?: number;
  };
}

export interface SetLoadingAction {
  type: 'SET_LOADING';
  loading: boolean;
}

export interface SetShelvesAction {
  type: 'SET_SHELVES';
  shelves: Record<string, any>;
}

export interface SetBannersAction {
  type: 'SET_BANNERS';
  banners: any[];
}

export interface SetCurrentBannerAction {
  type: 'SET_CURRENT_BANNER';
  current: number;
}

export type ShelvesAction =
  | SetLoadingAction
  | SetShelvesAction
  | SetBannersAction
  | SetCurrentBannerAction;

export default function shelves(
  state: ShelvesState = {},
  action: ShelvesAction
): ShelvesState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'SET_SHELVES':
      return {
        ...state,
        shelves: {
          ...state.shelves,
          ...action.shelves,
        },
      };
    case 'SET_BANNERS':
      return {
        ...state,
        banners: {
          items: action.banners,
        },
      };

    case 'SET_CURRENT_BANNER':
      return {
        ...state,
        banners: {
          ...state.banners,
          currentBanner: action.current,
        },
      };
    default:
      return state;
  }
}
