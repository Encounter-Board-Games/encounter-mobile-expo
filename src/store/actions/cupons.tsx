import { FC, Key, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { cupons } from "../../graphql";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../Store';
import { Action } from "redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

interface Cupon {
  id: Key;
  title: ReactNode;
  description: ReactNode;
  // Define the properties of the Cupon model
}

interface CuponsState {
  // Define the state properties
}

interface SetCuponsAction {
  type: typeof SET_CUPONS;
  payload: Cupon[];
}

type CuponsActionTypes = SetCuponsAction;

const SET_CUPONS = "SET_CUPONS";

const setCupons = (cupons: Cupon[]): SetCuponsAction => ({
  type: SET_CUPONS,
  payload: cupons,
});

export const handleLoadCupons = (): AppThunk => async (dispatch) => {
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
