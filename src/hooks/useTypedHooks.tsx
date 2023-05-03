import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

// Custom useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
