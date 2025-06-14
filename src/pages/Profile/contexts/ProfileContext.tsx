import { set_data } from "@/pages/Profile/_action";
import { initSate, Iprofile, profileReducer } from "@/pages/Profile/_reducer";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  FC,
  SetStateAction,
  useEffect,
  useReducer,
} from "react";

interface ProfileProps {
  children: React.ReactNode;
}
const fakeApi = async (page: number, q: string) => {
  // log

  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const result = await response.json();

  return result;
};

interface ProfileContextProps {
  state: Iprofile;
  dispatch: SetStateAction<any>;
  refetch:any
}

export const myContext = createContext<ProfileContextProps>({
  state: initSate,
  dispatch: () => {},
  refetch:()=>{}

});

const ProfileContext: FC<ProfileProps> = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initSate);

  const { data, isLoading ,refetch} = useQuery({
    queryKey: ["data",state.page],
    queryFn: () => fakeApi(state.page, state.q),
  });


  useEffect(() => {
    dispatch(set_data(data));
  }, [data]);

  return (
    <myContext.Provider value={{ state, dispatch ,refetch}}>
      {children}
    </myContext.Provider>
  );
};

export default ProfileContext;
