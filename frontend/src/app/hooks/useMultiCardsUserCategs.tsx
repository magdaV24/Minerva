import { useState, useEffect } from "react";
import { fetchUserCategories } from "../../cards/slices/multiCardSlice";
import { useAppDispatch } from "../store/configureStore";

interface Props {
    id: number
}

export const useMultiCardsUserCategs = ( {id} : Props) => {
    const dispatch = useAppDispatch();
    const [userMultiCategs, setUserMultiCategs] = useState<any>({});
    useEffect(() => {
      const getUserCategs = async (id: { id: number }) => {
        const res = await dispatch(fetchUserCategories(id));
        setUserMultiCategs(res.payload);
      };
      getUserCategs({ id: id });
    }, [dispatch, id]);

    return {userMultiCategs}
}