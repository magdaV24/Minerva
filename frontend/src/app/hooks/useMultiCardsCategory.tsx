import { useState, useEffect } from "react";
import {
  fetchCardsOfCateg,
  fetchNumberOfCards,
  fetchNumberOfPrivCards,
} from "../../cards/slices/multiCardSlice";
import { MultiCardModel } from "../models/MultiCardModel";
import { useAppDispatch } from "../store/configureStore";
import { fetchPublicCards } from "../../cards/slices/multiCardSlice";

interface Props {
  category: string;
}

export default function useMultiCardsCategory({ category }: Props) {
  const dispatch = useAppDispatch();
  const [multiCards, setMultiCards] = useState<MultiCardModel[]>([]);
  const [publicMultiCards, setPublicMultiCards] = useState<MultiCardModel[]>(
    []
  );
  const [count, setCount] = useState<any>();
  const [countPriv, setCountPriv] = useState<any>();

  useEffect(() => {
    const getMultiCards = async (category: { category: string }) => {
      const res = await dispatch(fetchCardsOfCateg(category)).then(
        (result) => result.payload as any
      );
      setMultiCards(res);
    };
    getMultiCards({ category: category });
  }, [category, dispatch]);

  useEffect(() => {
    const getPublicMultiCards = async (category: { category: string }) => {
      const res = await dispatch(fetchPublicCards(category)).then(
        (result) => result.payload as any
      );
      setPublicMultiCards(res);
    };
    getPublicMultiCards({ category: category });
  }, [category, dispatch]);

  useEffect(() => {
    const getNumberOfCards = async (category: { category: string }) => {
      const res = await dispatch(fetchNumberOfCards(category));
      setCount(res.payload);
    };
    getNumberOfCards({ category: category });
  }, [category, dispatch]);

  useEffect(() => {
    const getNumberOfCards = async (category: { category: string }) => {
      const res = await dispatch(fetchNumberOfPrivCards(category));
      setCountPriv(res.payload);
    };
    getNumberOfCards({ category: category });
  }, [category, dispatch]);

  return { multiCards, count, countPriv, publicMultiCards };
}
