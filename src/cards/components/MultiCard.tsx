import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Button,
  CardContent,
  Avatar,
  Card,
  CardHeader,
} from "@mui/material";
import { useMemo, useState } from "react";
import { MultiCardModel } from "../../app/models/MultiCardModel";
import { useAppDispatch } from "../../app/store/configureStore";
import { increment } from "../slices/gameSlice";
import { red } from "@mui/material/colors";

interface Props {
  card: MultiCardModel;
}

const formStyles = {
  backgroundColor: "secondary.light",
  width: "25rem",
  height: "25rem",
  border: "1px solid white",
  padding: ".5rem",
  display: "flex",
};

export default function MultiCardComponent({ card }: Props) {
  const dispatch = useAppDispatch();

  const options = [
    card.optionOne,
    card.optionTwo,
    card.optionThree,
    card.rightAns,
  ];
  const index = useMemo(() => [0, 1, 2, 3], []);

  const shuffle = (array: any) => {
    let x = array.length;
    let random;

    while (x !== 0) {
      random = Math.floor(Math.random() * x);
      x -= 1;

      [array[x], array[random]] = [array[random], array[x]];
    }

    return array;
  };

  const i = useMemo(() => shuffle(index), [index]);

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");
  const [disabled, setDisabled] = useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (value === card.rightAns) {
      setHelperText("You got it!");
      setError(false);
      dispatch(increment(1));
    } else if (
      value === card.optionOne ||
      value === card.optionTwo ||
      value === card.optionThree
    ) {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
    setDisabled(true);
  };
  return (
    <Card sx={{ margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {card?.id}
          </Avatar>
        }
        title={card?.category}
      />
      <CardContent>
        <form onSubmit={handleSubmit} style={formStyles}>
          <FormControl sx={{ m: 3 }} error={error} variant="standard">
            <FormLabel id="demo-error-radios">{card?.question}</FormLabel>
            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value={options[i[0]]}
                control={<Radio />}
                label={options[i[0]]}
                disabled={disabled}
              />
              <FormControlLabel
                value={options[i[1]]}
                control={<Radio />}
                label={options[i[1]]}
                disabled={disabled}
              />
              <FormControlLabel
                value={options[i[2]]}
                control={<Radio />}
                label={options[i[2]]}
                disabled={disabled}
              />
              <FormControlLabel
                value={options[i[3]]}
                control={<Radio />}
                label={options[i[3]]}
                disabled={disabled}
              />
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
              Submit Answer
            </Button>
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
}
