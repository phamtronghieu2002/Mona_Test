import { IAction } from "@/pages/Profile/_action";
import { SET_DATA, SET_KEY, SET_PAGE, SET_Q } from "@/pages/Profile/_constant";

export interface Iprofile {
  key: string;
  page: number;
  q: string;
  data: any;
}
export const initSate: Iprofile = {
  key: "",
  page: 0,
  q: "",
  data: [],
};

export const profileReducer = (state: Iprofile, action: IAction) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_KEY:
      return {
        ...state,
        key: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_Q:
      return {
        ...state,
        q: action.payload,
      };
    default:
      return state;
  }
};
