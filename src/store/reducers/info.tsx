/* eslint-disable indent */
// Define TypeScript interfaces for the RootState and actions
interface InfoState {
  showCart?: boolean;
  infoModal?: {
    open: boolean;
    content?: string;
    title?: string;
  };
  popup?: {
    open: boolean;
    type?: string;
    data?: any;
  };
}

type InfoAction = {
  type:
    | 'OPEN_CART'
    | 'OPEN_INFO_MODAL'
    | 'CLOSE_INFO_MODAL'
    | 'OPEN_POPUP_MODAL'
    | 'CLOSE_POPUP_MODAL';
  show?: boolean;
  content?: string;
  title?: string;
  typeOfModal?: string;
  data?: any;
};

export default function info(
  state: InfoState = {},
  action: InfoAction
): InfoState {
  switch (action.type) {
    case 'OPEN_CART':
      return {
        ...state,
        showCart: action.show,
      };
    case 'OPEN_INFO_MODAL':
      return {
        ...state,
        infoModal: {
          open: true,
          content: action.content,
          title: action.title,
        },
      };
    case 'CLOSE_INFO_MODAL':
      return {
        ...state,
        infoModal: {
          open: false,
        },
      };
    case 'OPEN_POPUP_MODAL':
      return {
        ...state,
        popup: {
          open: true,
          type: action.typeOfModal,
          data: action.data,
        },
      };
    case 'CLOSE_POPUP_MODAL':
      return {
        ...state,
        popup: {
          ...state.popup,
          type: state.popup?.type,
          open: false,
        },
      };
    default:
      return state;
  }
}
