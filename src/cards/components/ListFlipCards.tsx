import { Box } from "@mui/material";
import { useFlipCardsCategory } from "../../app/hooks/useFlipCardsCategory";
import RowFlipCard from "./RowFlipCard";

interface Props {
  category: string;
}

export default function ListFlipCards({ category }: Props) {
  const { publicFlipCards } = useFlipCardsCategory({ category: category });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {publicFlipCards &&
          Object.keys(publicFlipCards).map((key, index) => (
            <RowFlipCard card={publicFlipCards[index]} key={key} />
          ))}
      </Box>
    </>
  );
}
