import Home from "@/pages/Home/Home";
import React, { FC, useEffect, useState } from "react";

export interface Icontext {
    dispatch: (action: Iaction) => void;
  state: Istate;
}

interface Istate {
  reloadkey: number;
  q: string;
  page: number;
  data: any;
}
interface Iaction {
  type: string;
  payload: any;
}

export const myContext = React.createContext<Icontext | null>(null);
interface AuthProviderProps {
}

const DataProvider: FC<AuthProviderProps> = () => {
  const [data, setData] = useState<Istate>({
    reloadkey: 0,
    q: "",
    page: 0,
    data: [],
  });

  const fechData = () => {


  };
  useEffect(() => {
    fechData();
  }, [data?.reloadkey, data?.q, data?.page]);

  const dispatch = (action: Iaction) => {
    switch (action?.type) {
      case "SET_RELOAD_KEY":
        setData({ ...data, reloadkey: action?.payload });
        break;
      case "SET_Q":
        setData({ ...data, q: action?.payload });
        break;
      case "SET_PAGE":
        setData({ ...data, page: action?.payload });
        break;
      default:
        break;
    }
  };

  return (
    <myContext.Provider value={{ dispatch ,state:data}}>  <Home /></myContext.Provider>
  );
};

export default DataProvider;
