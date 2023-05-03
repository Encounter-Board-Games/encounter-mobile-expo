import { FC, Key, ReactNode } from 'react';
import { cupons as getCupons } from '../../graphql';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { Action } from 'redux';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface Cupon {
  id: Key;
  title: ReactNode;
  description: ReactNode;
  // Define the properties of the Cupon model
}

export interface CuponsState {
  // Define the RootState properties
}

export interface SetCuponsAction {
  type: typeof SET_CUPONS;
  payload: Cupon[];
}

export type CuponsActionTypes = SetCuponsAction;

export const SET_CUPONS = 'SET_CUPONS';

export const setCupons = (cupons: Cupon[]): SetCuponsAction => ({
  type: SET_CUPONS,
  payload: cupons,
});

export const handleLoadCupons = (): AppThunk => async (dispatch, getState) => {
  const { cupons } = await getCupons();
  dispatch(setCupons(cupons));
};

const CuponsComponent: FC<{ cupons: Cupon[] }> = ({ cupons }) => {
  return (
    <div>
      {cupons.map((cupon) => (
        <div key={cupon.id}>
          <h2>{cupon.title}</h2>
          <p>{cupon.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CuponsComponent;
