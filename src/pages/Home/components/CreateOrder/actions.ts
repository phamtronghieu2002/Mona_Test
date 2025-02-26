import { ProductType } from "@/mockData";
import {
  ADD_PAY_INFO,
  ADD_PRODUCT_TO_CART,
  SET_FORM_FIELD,
} from "@/pages/Home/components/CreateOrder/constant";

export interface actionType {
  type: string;
  payload: any;
}

const setFormField = (name: string, value: any): actionType => {
  return {
    type: SET_FORM_FIELD,
    payload: { name, value },
  };
};
const addProductToCart = (product: ProductType[]): actionType => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: product,
  };
};

const addPayInfo = (payInfo: any): actionType => {
  return {
    type: ADD_PAY_INFO,
    payload: payInfo,
  };
};

export { setFormField, addProductToCart,addPayInfo };
