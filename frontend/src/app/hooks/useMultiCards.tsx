import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/configureStore";
import {
  fetchPublicCategories,
} from "../../cards/slices/multiCardSlice";

export default function useMultiCards () {
const dispatch = useAppDispatch();
  const [publicCategs, setPublicCategs] = useState<any>({});

  useEffect(() => {
    const getCategs = async () => {
      const res = await dispatch(fetchPublicCategories());
      setPublicCategs(res.payload);
    };
    getCategs();
  }, [dispatch]);
  
  return {publicCategs};
};
