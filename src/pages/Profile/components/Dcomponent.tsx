import { set_key } from "@/pages/Profile/_action";
import { myContext } from "@/pages/Profile/contexts/ProfileContext";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { FC, useContext } from "react";

interface DcomponentProps {}

const Dcomponent: FC<DcomponentProps> = () => {
  const { state, dispatch, refetch } = useContext(myContext);
  const queryClient = useQueryClient();

  const data = queryClient.getQueriesData({
    queryKey: "data",
  });

  console.log("====================================");
  console.log("data >>", data);
  console.log("====================================");
  return (
    <div>
      D COMPONNET
      <Button
        onClick={() => {
          dispatch(set_key(1));
        }}
      >
        set KEY 1
      </Button>
      <Button>Call lại API</Button>
    </div>
  );
};

export default Dcomponent;
