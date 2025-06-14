import C from "@/pages/Profile/components/CComponent";
import { FC } from "react";

interface AProps {}

const B: FC<AProps> = () => {
  return (
    <div>
      B component
      <C />
    </div>
  );
};

export default B;
