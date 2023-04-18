import {  Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import MultiCardComponent from "../components/MultiCard";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { reset } from "../slices/gameSlice";
import { useMultiCardsLimit } from "../../app/hooks/useMultiCardsLimit";

interface Props {
  category: string;
  count: number;
}
export default function MultiCardsGame({ count, category }: Props) {
  const [initGame, setInitGame] = useState(true);
  const [warning, setWarning] = useState("");
  const [game, setGame] = useState(false);
  const [limit, setLimit] = useState("");
  const lim = parseInt(limit, 10);
  const [showAlert, setShowAlert] = useState(false);

  const startGame = (e: any) => {
    e.preventDefault();
    if (lim <= count) {
      setInitGame(false);
      setGame(true);
      setMessage("");
      setShowAlert(false)
    } else {
      setShowAlert(true)
      setWarning("Not enough cards in this deck. Pick a smaller number!");
    }
  };

  const { multiCardsLimit } = useMultiCardsLimit({
    category: category,
    limit: lim,
  });

  const { points } = useAppSelector((s) => s.game);
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();

  const [finished, setFinished] = useState(false);

  const finishGame = (e: any) => {
    e.preventDefault();
    setLimit("0");
    if (points >= lim / 2) {
      setMessage(`Congrats, you scored ${points}/${lim}!`);
    } else {
      setMessage(`This time you scored just ${points}/${lim}.`);
    }
    dispatch(reset());
    setGame(false);
    setFinished(true);
  };

  return (
    <Box 
    sx={{
      height: 575,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 5,
      alignItems: "center",
      justifyContent: 'space-between'
    }}>
      {initGame && (
        <Box>
          <form
            onSubmit={startGame}
            style={{ display: "flex", flexDirection: "column", gap: 5 }}
          >
            <TextField
              id="outlined-basic"
              label="How many questions do you want?"
              variant="outlined"
              value={limit}
              sx={{ width: "20rem" }}
              onChange={(e) => setLimit(e.target.value)}
            />
            {showAlert && <Alert color="error">
              {warning}
            </Alert>}
            <Button type="submit" variant="outlined">
              START
            </Button>
          </form>
        </Box>
      )}

      {game && (
        <Box
        >
          <Box>
            {multiCardsLimit &&
              Object.keys(multiCardsLimit).map((key, index) => (
                <MultiCardComponent card={multiCardsLimit[index]} key={key} />
              ))}
            <Button
              onClick={finishGame}
              variant="outlined"
              sx={{ width: "93%", marginLeft: 2, height: "4rem" }}
            >
              FINISH
            </Button>
          </Box>
        </Box>
      )}

      {finished && <Typography variant="h5">{message}</Typography>}
    </Box>
  );
}
