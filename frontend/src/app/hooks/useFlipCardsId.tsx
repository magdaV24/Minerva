import { useState, useEffect } from "react";
import { fetchUserCategories } from "../../cards/slices/flipCardSlice";
import { useAppDispatch } from "../store/configureStore";

interface Props {
  id: number;
}

export const useFlipCardsId = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const [userCategs, setUserCategs] = useState<any>({});
  useEffect(() => {
    const getUserCategs = async (id: { id: number }) => {
      const res = await dispatch(fetchUserCategories(id)).then(
        (res) => res.payload as any
      );
      setUserCategs(res);
    };
    getUserCategs({ id: id });
  }, [dispatch, id]);

  return {userCategs};
};
