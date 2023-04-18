import { useState } from "react";
import FlipCardComponent from "../components/FlipCard";
import { Box, Button } from "@mui/material";
import { useFlipCardsCategory } from "../../app/hooks/useFlipCardsCategory";

interface Props {
  categ: string;
}
export default function FlipCardsGame({ categ }: Props) {
  // Fetching the cardds of a chosen category.
  const { flipCards } = useFlipCardsCategory({category: categ});

  // Function for generating a random index
  function generateRandomIndex(index: number) {
    return Math.floor(Math.random() * index);
  }
  const length = flipCards.length;
  const [index, setIndex] = useState(generateRandomIndex(length));

  const handleClick = (e: any) => {
    e.preventDefault();
    setIndex(generateRandomIndex(length));
  };

  return (
    <>
      {flipCards && (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 5}}>
          <FlipCardComponent card={flipCards[index]} />
          <Button onClick={handleClick} sx={{width: '100%', height: '5rem'}} variant="outlined">Another Card</Button>
        </Box>
      )}
    </>
  );
}
