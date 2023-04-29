export interface State {
  name: string;
  lastname: string;
  aka: string;
  gender: string;
  document: string;
  cellphone: string;
  birthday: string | null;
  showDate: boolean;
  terms: boolean;
}

export interface Props {
  navigation: any;
}

export interface EditProfileContentProps {
  navigation: any;
}
