import axiosInstance from "@/configs/axios";
import { FC, useEffect, useState } from "react";

interface useFetchProps {
  fetchFn: () => void;
  onSuscess?: () => void;
  state?:boolean
}

const useFetch = ({ fetchFn, onSuscess ,state}:useFetchProps) => {
  const [data, setData] = useState<any>([]);


  

  const fetchData = async () => {
    try {
      const res = await fetchFn();
      
      setData(res);
    } catch (error) {
      console.log("====================================");
      console.log("error >>", error);
      console.log("====================================");
    }
  };
  useEffect(() => {
    fetchData();
  }, [state]);


  
  return {
    data,
  };
};

export default useFetch;
