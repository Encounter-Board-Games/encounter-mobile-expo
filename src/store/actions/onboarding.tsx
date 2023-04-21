import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/Store';
import Storage from '../../utils/storage';
import { handleLoadShelves } from './shelves/shelves';
import { handleShowNotification } from './notification';
import { customFilter } from '../../graphql';

export const SET_SELECT_FILTER_TOGGLE_ONBOARDING =
  'SET_SELECT_FILTER_TOGGLE_ONBOARDING' as const;
export const SET_SELECT_QUESTION_TOGGLE_ONBOARDING =
  'SET_SELECT_QUESTION_TOGGLE_ONBOARDING' as const;
export const RESTART_ONBOARDING = 'RESTART_ONBOARDING' as const;
export const START_ONBOARDING = 'START_ONBOARDING' as const;
export const OPEN_ONBOARD = 'OPEN_ONBOARD' as const;
export const CLOSE_ONBOARD = 'CLOSE_ONBOARD' as const;
export const SET_ONBOARDING_STEPS = 'SET_ONBOARDING_STEPS' as const;
export const SET_FILTERS_ONBOARDING = 'SET_FILTERS_ONBOARDING' as const;

interface SetSelectFilterToggleOnboardingAction
  extends Action<typeof SET_SELECT_FILTER_TOGGLE_ONBOARDING> {
  filterType: string;
  value: boolean;
}

interface SetSelectQuestionToggleOnboardingAction
  extends Action<typeof SET_SELECT_QUESTION_TOGGLE_ONBOARDING> {
  questionType: string;
  value: boolean;
}

interface SetFiltersOnboardingAction
  extends Action<typeof SET_FILTERS_ONBOARDING> {
  filters: any;
}

interface SetOnboardingStepsAction extends Action<typeof SET_ONBOARDING_STEPS> {
  steps: any;
}

interface StartOnboardingAction extends Action<typeof START_ONBOARDING> {
  restart: boolean;
}

interface RestartOnboardingAction extends Action<typeof RESTART_ONBOARDING> {
  restart: boolean;
}

interface OpenOnboardAction extends Action<typeof OPEN_ONBOARD> {}

interface CloseOnboardAction extends Action<typeof CLOSE_ONBOARD> {}

export type OnboardingAction =
  | SetSelectFilterToggleOnboardingAction
  | SetSelectQuestionToggleOnboardingAction
  | SetFiltersOnboardingAction
  | SetOnboardingStepsAction
  | StartOnboardingAction
  | RestartOnboardingAction
  | OpenOnboardAction
  | CloseOnboardAction;

export const setSelectFilterToggleOnboarding = (
  filterType: string,
  value: boolean
): SetSelectFilterToggleOnboardingAction => ({
  type: SET_SELECT_FILTER_TOGGLE_ONBOARDING,
  filterType,
  value,
});

export const setSelectQuestionToggleOnboarding = (
  questionType: string,
  value: boolean
): SetSelectQuestionToggleOnboardingAction => ({
  type: SET_SELECT_QUESTION_TOGGLE_ONBOARDING,
  questionType,
  value,
});

const setFilters = (filters: any): SetFiltersOnboardingAction => ({
  type: SET_FILTERS_ONBOARDING,
  filters,
});

const setOnboardingSteps = (steps: any): SetOnboardingStepsAction => ({
  type: SET_ONBOARDING_STEPS,
  steps,
});

export const startOnboarding = (restart: boolean): StartOnboardingAction => ({
  type: START_ONBOARDING,
  restart,
});

export const restartOnboarding = (
  restart: boolean
): RestartOnboardingAction => ({
  type: RESTART_ONBOARDING,
  restart,
});

const openOnboard = (): OpenOnboardAction => ({
  type: OPEN_ONBOARD,
});

export const closeOnboard = (): CloseOnboardAction => ({
  type: CLOSE_ONBOARD,
});

const storageName = 'ONBOARDING_6';

export const handleLoadOnboarding = (): ThunkAction<
  void,
  RootState,
  unknown,
  OnboardingAction
> => {
  return async (dispatch) => {
    const onboardingFilters = await Storage.getItem(storageName);
    const steps = await customFilter('onboarding');
    dispatch(setOnboardingSteps(steps));
    dispatch(setFilters(onboardingFilters));
    if (!onboardingFilters) dispatch(openOnboard());
  };
};

export const handleReopenOnboarding = (): ThunkAction<
  void,
  RootState,
  unknown,
  OnboardingAction
> => {
  return (dispatch) => {
    dispatch(openOnboard());
    dispatch(restartOnboarding(true));
  };
};

export const handleFinishOnboarding = (): ThunkAction<
  void,
  RootState,
  unknown,
  OnboardingAction
> => {
  return async (dispatch, getState) => {
    const { onboarding } = getState();
    await Storage.setItem(storageName, onboarding.filters);
    dispatch(handleLoadShelves());
    dispatch(closeOnboard());
    if (onboarding.restart)
      dispatch(handleShowNotification('Preferências alteradas.'));
    dispatch(restartOnboarding(false));
  };
};
