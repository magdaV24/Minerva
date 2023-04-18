import { useState, useEffect } from "react";
import {
  fetchCardsOfCateg,
  fetchNumberOfCards,
  fetchNumberOfPrivCards,
  fetchPublicCards,
} from "../../cards/slices/flipCardSlice";
import { FlipCardModel } from "../models/FlipCardModel";
import { useAppDispatch } from "../store/configureStore";

interface Props {
  category: string;
}

export const useFlipCardsCategory = ({ category }: Props) => {
  const dispatch = useAppDispatch();
  const [flipCards, setFlipCards] = useState<FlipCardModel[]>([]);
  const [publicFlipCards, setPublicFlipCards] = useState<FlipCardModel[]>([]);
  const [count, setCount] = useState();
  const [countPriv, setCountPriv] = useState<any>();
  useEffect(() => {
    const getFlipCards = async (category: { category: string }) => {
      const res = await dispatch(fetchCardsOfCateg(category)).then(
        (res) => res.payload as any
      );
      setFlipCards(res);
    };

    getFlipCards({ category: category });
  }, [category, dispatch]);

  useEffect(() => {
    const getPublicFlipCards = async (category: { category: string }) => {
      const res = await dispatch(fetchPublicCards(category)).then(
        (res) => res.payload as any
      );
      setPublicFlipCards(res);
    };

    getPublicFlipCards({ category: category });
  }, [category, dispatch]);

  useEffect(() => {
    const getNumberOfCards = async (category: { category: string }) => {
      const res = await dispatch(fetchNumberOfCards(category)).then(
        (resutlt) => resutlt.payload as any
      );
      setCount(res);
    };
    getNumberOfCards({ category: category });
  }, [category, dispatch]);

  useEffect(() => {
    const getNumberOfCards = async (category: { category: string }) => {
      const res = await dispatch(fetchNumberOfPrivCards(category)).then(
        (result) => result.payload as any
      );
      setCountPriv(res);
    };
    getNumberOfCards({ category: category });
  }, [category, dispatch]);

  return { flipCards, count, countPriv, publicFlipCards };
};
