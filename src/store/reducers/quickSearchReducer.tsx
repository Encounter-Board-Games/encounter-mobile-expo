/* eslint-disable prettier/prettier */
/* eslint-disable indent */
// Define TypeScript interfaces for the RootState and actions
interface QuickSearchState {
  [key: string]: any;
}

interface RemoveQuickSearchAction {
  type: 'REMOVE_QUICK_SEARCHS';
  key: string;
}

interface SetQuickSearchAction {
  type: 'SET_QUICK_SEARCHS';
  quickSearchs: { key: string }[];
}

type QuickSearchAction = RemoveQuickSearchAction | SetQuickSearchAction;

export default function quickSearch(
  state: QuickSearchState = {},
  action: QuickSearchAction
): QuickSearchState {
  switch (action.type) {
    case 'REMOVE_QUICK_SEARCHS':
      return {
        ...(
          Object.keys(state)
            .filter((key) => key !== action.key)
            .map((key) => ({
              [key]: state[key],
            }))
            .reduce((a, b) => ({
              ...a,
              ...b,
            }), {})
        ),
      };
    case 'SET_QUICK_SEARCHS':
      return {
        ...state,
        ...(
          action.quickSearchs
            .map((quick) => ({
              [quick.key]: quick,
            }))
            .reduce((a, b) => ({
              ...a,
              ...b,
            }), {})
        ),
      };
    default:
      return state;
  }
}
