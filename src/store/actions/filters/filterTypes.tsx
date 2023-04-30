export interface IAction {
  type: string;
  show?: boolean;
  filterType?: string;
  value?: string;
  n?: number;
  result?: number[];
  results?: number[];
  filters?: IFilterState[];
  isFiltered?: boolean;
  recentTexts?: string[];
  text?: string;
  texts?: string[];
  numberOfFilters?: number;
  chips?: { label: string; type: string }[];
  needDebounce?: boolean;
  loading?: boolean;
  selected?: { [key: string]: string[] };
}

export interface IClearButtonProps {
  type?: string;
}

export interface IFilter {
  defaultSelectsFilter?: { [key: string]: string[] };
  filters: IFilterState[];
  selected: { [key: string]: string[] };
  selects: { [key: string]: string[] };
  text: string;
  recentTexts?: string[];
}

export interface IFilterBarProps {
  filters: IFilterState[];
  options: { [key: string]: { value: string; label: string }[] };
}

export interface IFilterChipsProps {
  chips: string[];
}

export interface IFilterSelectProps {
  type: string;
  options: { value: string; label: string }[];
  isSingle: boolean;
}

export interface IFilterState {
  type: string;
  isSingle: boolean;
  filters?: { [key: string]: string[] };
}

export interface IState {
  filters: IFilter;
}

export interface Chip {
  isRemovable: boolean;
  label: string;
  text: string;
  type: string;
  item: any;
}

export interface DefaultSelectsFilter {
  [key: string]: string[];
}

export interface Selects {
  [key: string]: string[];
}
