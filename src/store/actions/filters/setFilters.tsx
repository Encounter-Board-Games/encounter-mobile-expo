export interface IFilterState {
  [key: string]: any;
}

export interface IAction {
  type: string;
  filters?: IFilterState;
  show?: boolean;
  results?: number[];
  isFiltered?: boolean;
  text?: string;
  texts?: string[];
  numberOfFilters?: number;
  chips?: { label: string; type: string }[];
}

export function setFilters(filters: IFilterState): IAction {
  return {
    type: 'SET_FILTERS',
    filters,
  };
}

export function setFilteringTutorial(show: boolean): IAction {
  return {
    type: 'SET_FILTERING_TUTORIAL',
    show,
  };
}

export function setFilteringResult(
  results: number[],
  isFiltered: boolean
): IAction {
  return {
    type: 'SET_FILTERING_RESULTS',
    results,
    isFiltered,
  };
}

export function setFilteringResultLoading(): IAction {
  return {
    type: 'SET_FILTERING_RESULTS_LOADING',
  };
}

export function setFilteringText(text: string): IAction {
  return {
    type: 'SET_FILTERING_TEXT',
    text,
  };
}

export function setRecentsFilteringTexts(texts: string[]): IAction {
  return {
    type: 'SET_RECENTS_FILTERING_TEXT',
    texts,
  };
}

export function setNumberOfFilters(numberOfFilters: number): IAction {
  return {
    type: 'SET_NUMBER_OF_FILTERS',
    numberOfFilters,
  };
}

export function setChipFilters(
  chips: {
    label: string;
    type: string;
  }[]
): IAction {
  return {
    type: 'SET_CHIP_FILTERS',
    chips,
  };
}
