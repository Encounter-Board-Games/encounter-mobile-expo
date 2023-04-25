/* eslint-disable indent */
// Define TypeScript interfaces for the RootState and actions
interface ShelvesState {
  loading?: boolean;
  shelves?: Record<string, any>;
  banners?: {
    items?: any[];
    currentBanner?: number;
  };
}

interface SetLoadingAction {
  type: 'SET_LOADING';
  loading: boolean;
}

interface SetShelvesAction {
  type: 'SET_SHELVES';
  shelves: Record<string, any>;
}

interface SetBannersAction {
  type: 'SET_BANNERS';
  banners: any[];
}

interface SetCurrentBannerAction {
  type: 'SET_CURRENT_BANNER';
  current: number;
}

type ShelvesAction =
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
