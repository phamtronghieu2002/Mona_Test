import { FunctionComponent, useEffect } from "react";

interface ContentProps {}

const Content: FunctionComponent<ContentProps> = () => {
  useEffect(() => {
    console.log("mount");
  }, []);
  return <div></div>;
};

export default Content;
