/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { useQuickSearchs, useAnswerQuestion } from '../../../graphql/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  QuickSearch,
  SetQuickSearchsAction,
  RemoveQuickSearchsAction,
  REMOVE_QUICK_SEARCHS,
  SET_QUICK_SEARCHS,
  AppState,
} from './quickSearchTypes';

interface AppStateWithQuickSearch extends AppState {
  quickSearchs: QuickSearch[];
  user: {
    isLogged: boolean;
  };
}

function setQuickSearchs(quickSearchs: QuickSearch[]): SetQuickSearchsAction {
  return {
    type: SET_QUICK_SEARCHS,
    payload: quickSearchs,
  };
}

function removeQuickSearchs(key: string): RemoveQuickSearchsAction {
  return {
    type: REMOVE_QUICK_SEARCHS,
    payload: key,
  };
}

export function handleSetQuickSearchs(): ThunkAction<
  void,
  AppStateWithQuickSearch,
  null,
  Action<string>
> {
  return async (dispatch, getState) => {
    const { user } = getState();

    if (!user.isLogged) return;

    const searchs = await useQuickSearchs();

    if (searchs && searchs.length > 0) dispatch(setQuickSearchs(searchs));
  };
}

export function handleAnswer(key: string, value: string) {
  return (dispatch: Dispatch) => {
    if (key) {
      dispatch(removeQuickSearchs(key));
      useAnswerQuestion()(key, value);
    }
  };
}

function QuickSearchComponent() {
  const dispatch = useDispatch();
  const quickSearchs = useSelector(
    (state: AppStateWithQuickSearch) => state.quickSearchs
  );

  useEffect(() => {
    dispatch(handleSetQuickSearchs() as any);
  }, [dispatch]);

  return (
    <>
      {quickSearchs.map((search) => (
        <button
          key={search.key || ''}
          onClick={() =>
            search.key &&
            dispatch(handleAnswer(search.key, search.value) as any)
          }
        >
          {search.children}
        </button>
      ))}
    </>
  );
}

export default QuickSearchComponent;
