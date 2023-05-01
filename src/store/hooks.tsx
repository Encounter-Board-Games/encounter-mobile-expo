import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector,
} from 'react-redux';
import { RootState, AppDispatch } from './Store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type DispatchFunc = () => AppDispatch;
export const useAppDispatch = () =>
  _useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
