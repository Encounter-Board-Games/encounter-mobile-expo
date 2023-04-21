import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { quickSearchs, answerQuestion } from "../../../graphql";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppState } from "react-native/types";
import { 
  QuickSearch, 
  SetQuickSearchsAction, 
  RemoveQuickSearchsAction, 
  REMOVE_QUICK_SEARCHS, 
  SET_QUICK_SEARCHS 
} from "./quickSearchTypes";

interface AppStateWithQuickSearch extends AppState {
  quickSearchs: QuickSearch[];
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

export function handleSetQuickSearchs(): ThunkAction<void, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const { user } = getState();

    if (!user.isLogged) return;

    const searchs = await quickSearchs();

    if (searchs && searchs.length > 0) dispatch(setQuickSearchs(searchs));
  };
}

export function handleAnswer(key: string, value: string) {
  return (dispatch: any) => {
    dispatch(removeQuickSearchs(key));
    answerQuestion(key, value);
  };
}

function QuickSearchComponent() {
  const dispatch = useDispatch();
  const { quickSearchs } = useSelector((state: AppStateWithQuickSearch) => state.quickSearchs);

  useEffect(() => {
    dispatch(handleSetQuickSearchs());
  }, [dispatch]);

  function handleAnswerClick(key: string, value: string) {
    dispatch(handleAnswer(key, value));
  }

  return (
    <div>
      {quickSearchs.map((search) => (
        <div key={search.key}>
          <span>{search.key}</span>
          <button onClick={() => handleAnswerClick(search.key, search.value)}>Answer</button>
        </div>
      ))}
    </div>
  );
}

export default QuickSearchComponent;
