export interface LoginPopupProps {
  type: string;
  show: boolean;
}

export interface LoginUserProps {
  type: string;
  user: any;
}

export interface NeedCompleteInfosProps {
  type: string;
  needCompleteInfos: boolean;
}

export interface IsCodeSentProps {
  type: string;
  isCodeSent: boolean;
  isForgot: boolean;
}

export interface IsChangePasswordProps {
  type: string;
  changePassword: boolean;
  code: string;
}

export interface LoginLoadingProps {
  type: string;
  loading: boolean;
}

export interface EmailLoginProcessProps {
  type: string;
  email: string;
  isLogin: boolean;
}

export interface ErrorLoginProcessMessageProps {
  type: string;
  errorMessage: string;
}

