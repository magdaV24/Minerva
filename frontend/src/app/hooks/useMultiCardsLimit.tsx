import { useEffect, useState } from "react";
import { fetchCardsWithLimit } from "../../cards/slices/multiCardSlice";
import { useAppDispatch } from "../store/configureStore";

interface Props {
    category: string,
    limit: number
}

export const useMultiCardsLimit = ({category, limit}: Props) => {
    const dispatch = useAppDispatch();
    const [multiCardsLimit, setMultiCardsLimit] = useState<any>();
    
      useEffect(() => {
        const getCardsWithLimit = async () => {
          const res = await dispatch(fetchCardsWithLimit({ category, limit })).then(
            (result) => result.payload as any
          );
          setMultiCardsLimit(res);
        };
        getCardsWithLimit();
      }, [category, dispatch, limit]);

      return {multiCardsLimit}
}