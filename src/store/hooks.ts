import {
  useSelector as useSelectorBase,
  useDispatch as useDispatchBase,
} from 'react-redux';
import { RootState, AppDispatch } from './store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const useSelector: <TSelected>(
  selector: (state: RootState) => TSelected
) => TSelected = useSelectorBase;
export const useDispatch = () => useDispatchBase<AppDispatch>();
export type DispatchFunc = () => AppDispatch;
export const useAppDispatch = () =>
  useDispatchBase<ThunkDispatch<RootState, unknown, AnyAction>>();
