/* eslint-disable prettier/prettier */
import { deliveryOptions } from '../../../graphql';
import { Dispatch } from 'redux';
import { RootState } from '../../Store';
import { LoadDeliveryMethodsAction } from '../../../types/actionCartTypes';

export const handleLoadDeliveryMethods =
  () =>
    async (
      dispatch: Dispatch<LoadDeliveryMethodsAction>,
      getState: () => RootState
    ) => {
      const getOptions = () => {
        const { cart } = getState();
        const { products = [], delivery = {} } = cart || {};
        const { take = {}, leave = {} } = delivery;

        const takeDeliveryMethod =
        take && take.selected ? take.selected.type : undefined;
        const leaveDeliveryMethod =
        leave && leave.selected ? leave.selected.type : undefined;

        return {
          productsLength: products.length,
          takeDeliveryMethod,
          leaveDeliveryMethod,
        };
      };

      const { takeDeliveryMethod, leaveDeliveryMethod, productsLength } =
      getOptions();

      const { take, leave } = await deliveryOptions(
        productsLength,
        takeDeliveryMethod
      );

      dispatch({
        type: 'LOAD_DELIVERY_METHODS',
        payload: {
          take,
          leave,
        },
      });
    };
