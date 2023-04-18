import { Box } from "@mui/material";
import RowMultiCard from "./RowMultiCard";
import useMultiCardsCategory from "../../app/hooks/useMultiCardsCategory";

interface Props {
  category: string;
}

export default function ListMultiCards({ category }: Props) {
  const { publicMultiCards } = useMultiCardsCategory({ category: category });
  console.log(publicMultiCards);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          marginTop: 9,
          width: 950
        }}
      >
        {publicMultiCards &&
          Object.keys(publicMultiCards).map((key, index) => (
            <RowMultiCard card={publicMultiCards[index]} key={key} />
          ))}
      </Box>
    </>
  );
}
