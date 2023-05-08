// useTypedHooks.tsx

import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<RootState, undefined, any>>();
