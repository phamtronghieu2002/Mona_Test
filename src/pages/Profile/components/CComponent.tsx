import { set_page } from "@/pages/Profile/_action";
import Dcomponent from "@/pages/Profile/components/Dcomponent";
import { myContext } from "@/pages/Profile/contexts/ProfileContext";
import { Button } from "antd";
import { FC, useContext } from "react";

interface AProps {}

const C: FC<AProps> = () => {
  const { state, dispatch } = useContext(myContext);


  return (
    <div>
      C component
      <Button
        onClick={() => {
          dispatch(set_page(Math.random()));
        }}
      >
        set page = 2
      </Button>
      <Dcomponent />
    </div>
  );
};

export default C;
