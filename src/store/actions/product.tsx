import { getProduct, evaluateProduct } from "../../graphql";
import { openPopupModal, closePopupModal } from "./info";
import { handleShowNotification } from "./notification";
import { arrayToObj } from "../../utils/helpers";

interface Product {
  [key: string]: {
    isLoad: boolean;
    // Add other properties of a product here
  };
}

interface Evaluation {
  [key: string]: number;
}

export const SET_PRODUCTS = "SET_PROCDUCTS";
export const SET_CURRENT_PRODUCT = "SET_CURRENT_PRODUCT";
export const SET_EVALUATIONS_PRODUCTS = "SET_EVALUATIONS_PRODUCTS";

interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  products: Product;
}

interface SetEvaluationsProductsAction {
  type: typeof SET_EVALUATIONS_PRODUCTS;
  evaluationsProducts: string[];
}

interface SetCurrentProductAction {
  type: typeof SET_CURRENT_PRODUCT;
  currentProductKey: string;
}

export type ProductsActionTypes =
  | SetProductsAction
  | SetEvaluationsProductsAction
  | SetCurrentProductAction;

export function setProducts(products: Product): SetProductsAction {
  return {
    type: SET_PRODUCTS,
    products,
  };
}

export function setEvaluationsProducts(
  evaluationsProducts: string[]
): SetEvaluationsProductsAction {
  return {
    type: SET_EVALUATIONS_PRODUCTS,
    evaluationsProducts,
  };
}

function setCurrentProduct(currentProductKey: string): SetCurrentProductAction {
  return {
    type: SET_CURRENT_PRODUCT,
    currentProductKey,
  };
}

export function handleSetCurrentProduct(key: string) {
  return async (dispatch: any) => {
    dispatch(setCurrentProduct(key));
    const product = await getProduct(key);

    dispatch(
      setProducts({
        [key]: {
          ...product,
          isLoad: true,
        },
      })
    );
  };
}

export function handleOpenEvaluationProduct(keys: string | string[]) {
  return (dispatch: any, getState: any) => {
    const { user } = getState();
    const { isLogged = false } = user;

    if (!isLogged) return dispatch(openPopupModal("LOGIN_POPUP"));

    const keysArr = Array.isArray(keys) ? keys : [keys];
    dispatch(setEvaluationsProducts(keysArr));
    dispatch(openPopupModal("EVALUATE"));
  };
}

export function handleEvaluationProduct(evaluations: Evaluation) {
  return async (dispatch: any) => {
    dispatch(closePopupModal());

    const result = await Promise.all(
      Object.keys(evaluations).map((key) =>
        evaluateProduct(key, evaluations[key]).then((result) => result.product)
      )
    );

    dispatch(
      setProducts(
        arrayToObj(
          result.map((p) => ({
            ...p,
            isLoad: true,
          }))
        )
      )
    );

    dispatch(handleShowNotification("Avaliação salva!"));
  };
}
