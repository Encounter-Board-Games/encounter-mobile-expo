import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';

// Custom useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
