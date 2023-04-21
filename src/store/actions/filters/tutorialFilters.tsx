import storage from '../../../utils/storage';
import { Dispatch } from 'redux';
import { setFilteringTutorial } from './setFilters';

const TUTORIAL_STORAGE = 'TUTORIAL_STORAGE';

export const handleNeedTutorial = () => async (dispatch: Dispatch) => {
  const value = await storage.getItem<boolean>(TUTORIAL_STORAGE);
  dispatch(setFilteringTutorial(!value));
};

export const handleCloseTutorial = () => async (dispatch: Dispatch) => {
  await storage.setItem(TUTORIAL_STORAGE, { show: false });
  dispatch(setFilteringTutorial(false));
};
