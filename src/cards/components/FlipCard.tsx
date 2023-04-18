import Avatar from "@mui/material/Avatar/Avatar";
import Button from "@mui/material/Button/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { FlipCardModel } from "../../app/models/FlipCardModel";

interface Props {
  card: FlipCardModel;
}
export default function FlipCardComponent({ card }: Props) {
  const [flip, setFlip] = useState(false);

  return (
    <>
      <Card
        sx={{
          width: 575,
          minHeight: 575,
          height: "fit-content",
          border: "1px solid secondary.light",
          backgroundColor: "secondary.dark",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <CardContent>
          <CardHeader
            sx={{ backgroundColor: "secondary.light" }}
            avatar={
              <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
                {card?.id}
              </Avatar>
            }
            title={
              <Typography variant="h6" color="text.secondary">
                {card?.category}
              </Typography>
            }
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.5rem",
              width: 540,
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {flip ? card?.back : card?.front}
          </Typography>
        </CardContent>
        <Button
          fullWidth
          sx={{
            position: "absolute",
            mt: 1.5,
            width: 575,
            height: 60,
            fontSize: "1.5rem",
            backgroundColor: "secondary.light",
            zIndex: 300,
          }}
          variant="outlined"
          onClick={() => setFlip((prev) => !prev)}
        >
          FLIP
        </Button>
      </Card>
    </>
  );
}
