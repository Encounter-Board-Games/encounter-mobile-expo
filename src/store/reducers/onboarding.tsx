interface OnboardingState {
    filters: Record<string, any>;
    questions: Record<string, any>;
    steps?: number;
    open?: boolean;
    restart?: boolean;
  }
  
  interface OnboardingAction {
    type: string;
    steps?: number;
    questionType?: string;
    value?: any;
    filterType?: string;
    filterValue?: any;
    restart?: boolean;
    filters?: Record<string, any>;
  }
  
  export default function onboarding(
    state: OnboardingState = { filters: {}, questions: {} },
    action: OnboardingAction
  ): OnboardingState {
    switch (action.type) {
      case 'SET_ONBOARDING_STEPS':
        return {
          ...state,
          steps: action.steps,
        };
      case 'SET_SELECT_QUESTION_TOGGLE_ONBOARDING':
        return {
          ...state,
          questions: {
            ...state.questions,
            [action.questionType!]:
              state.questions[action.questionType!] === action.value
                ? undefined
                : action.value,
          },
        };
      case 'SET_SELECT_FILTER_TOGGLE_ONBOARDING':
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.filterType!]:
              state.filters[action.filterType!]?.find(
                (value) => JSON.stringify(value) === JSON.stringify(action.filterValue)
              ) !== undefined
                ? state.filters[action.filterType!]?.filter(
                    (value) => JSON.stringify(value) !== JSON.stringify(action.filterValue)
                  )
                : [...(state.filters[action.filterType!] ?? []), action.filterValue],
          },
        };
      case 'OPEN_ONBOARD':
        return {
          ...state,
          open: true,
        };
      case 'CLOSE_ONBOARD':
        return {
          ...state,
          open: false,
        };
      case 'RESTART_ONBOARDING':
        return {
          ...state,
          restart: action.restart,
        };
      case 'SET_FILTERS_ONBOARDING':
        return {
          ...state,
          filters: {
            ...action.filters,
          },
        };
      default:
        return state;
    }
  }
  