import CreateOrder from "@/pages/Home/components/CreateOrder/CreateOrder";
import { FC } from "react";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className="wp_home_page">
      <CreateOrder />
    </div>
  );
};

export default Home;
