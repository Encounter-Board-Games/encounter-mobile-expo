export interface PopupData {
  callBack?: (text: string) => void;
  title?: string;
  description?: string;
  cancelBtn?: string;
  confirmBtn?: string;
  options?: any;
}

export interface PopupState {
  data?: PopupData;
}

export interface InfoState {
  popup?: PopupState;
}
