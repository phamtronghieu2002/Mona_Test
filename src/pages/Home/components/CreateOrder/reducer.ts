import { actionType } from "@/pages/Home/components/CreateOrder/actions";
import {
  ADD_PAY_INFO,
  ADD_PRODUCT_TO_CART,
  SET_FORM_FIELD,
} from "@/pages/Home/components/CreateOrder/constant";
import { OrderStateI } from "@/pages/Home/components/CreateOrder/CreateOrder";

const reducer = (state: OrderStateI, action: actionType) => {
  switch (action.type) {
    case SET_FORM_FIELD:
      return {
        ...state,
        customer_infor: {
          ...state.customer_infor,
          [action.payload.name]: action.payload.value,
        },
      };
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_PAY_INFO:
      return {
        ...state,
        orderInfor: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
