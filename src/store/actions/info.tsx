export const OPEN_INFO_MODAL = "OPEN_MODAL";
export const CLOSE_INFO_MODAL = "CLOSE_MODAL";
export const OPEN_POPUP_MODAL = "OPEN_POPUP_MODAL";
export const CLOSE_POPUP_MODAL = "CLOSE_POPUP_MODAL";
export const OPEN_CART = "OPEN_CART";

export interface OpenInfoModalAction {
  type: typeof OPEN_INFO_MODAL;
  content: React.ReactNode;
  title: string;
}

export interface OpenCartAction {
  type: typeof OPEN_CART;
  show?: boolean;
}

export interface CloseInfoModalAction {
  type: typeof CLOSE_INFO_MODAL;
}

export interface OpenPopupModalAction {
  type: typeof OPEN_POPUP_MODAL;
  typeOfModal: any;
  payload?: any;
}

export interface ClosePopupModalAction {
  type: typeof CLOSE_POPUP_MODAL;
}

export type ModalActionTypes =
  | OpenInfoModalAction
  | OpenCartAction
  | CloseInfoModalAction
  | OpenPopupModalAction
  | ClosePopupModalAction;

export function openInfoModal(content: React.ReactNode, title: string): OpenInfoModalAction {
  return {
    type: OPEN_INFO_MODAL,
    content,
    title,
  };
}

export function openCart(show = true): OpenCartAction {
  return {
    type: OPEN_CART,
    show,
  };
}

export function closeInfoModal(): CloseInfoModalAction {
  return {
    type: CLOSE_INFO_MODAL,
  };
}

export function openPopupModal(typeOfModal: any, data?: any): OpenPopupModalAction {
  return {
    type: OPEN_POPUP_MODAL,
    typeOfModal,
    payload: data
  };
}

export function closePopupModal(): ClosePopupModalAction {
  return {
    type: CLOSE_POPUP_MODAL,
  };
}
