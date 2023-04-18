import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import Navbar from "../../app/layout/Navbar";
import { useState } from "react";
import { User } from "../../app/models/User";
import UpdateFlipCard from "../../cards/components/UpdateFlipCard";
import UpdateMultiCard from "../../cards/components/UpdateMultiCard";
import { useMultiCardsUserCategs } from "../../app/hooks/useMultiCardsUserCategs";
import useMultiCardsCategory from "../../app/hooks/useMultiCardsCategory";
import { useFlipCardsCategory } from "../../app/hooks/useFlipCardsCategory";
import { useFlipCardsId } from "../../app/hooks/useFlipCardsId";

export default function UserPage() {
  const fetchCurrentUser = () => {
    const res = JSON.parse(localStorage.getItem("user") as any);
    return res;
  };
  const [user, setUser] = useState<User>(fetchCurrentUser());
  const userID = user.userID;

  const [category, setCategory] = useState("");
  const [multiCategory, setMultiCategory] = useState("");

  const { flipCards } = useFlipCardsCategory({ category: category });
  const { userCategs } = useFlipCardsId({ id: userID });

  const { multiCards } = useMultiCardsCategory({ category: multiCategory });
  const { userMultiCategs } = useMultiCardsUserCategs({ id: userID });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((event.target as HTMLInputElement).value);
  };

  const handleChangeTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMultiCategory((event.target as HTMLInputElement).value);
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "2rem",
          position: "fixed",
          bgcolor: "background.paper",
          padding: 2,
          borderRadius: 2,
          width: "20%",
          height: "fit-content",
          marginLeft: 5,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        {userCategs.length !== 0 && (
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Flip Cards Categories
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={handleChange}
            >
              {userCategs &&
                Object.keys(userCategs).map((key, index) => (
                  <FormControlLabel
                    value={userCategs[index]}
                    control={<Radio />}
                    label={userCategs[index]}
                    key={key}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        )}
        {userMultiCategs.length !== 0 && (
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Multi-Choice Cards Categories
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={handleChangeTwo}
            >
              {userMultiCategs &&
                Object.keys(userMultiCategs).map((key, index) => (
                  <FormControlLabel
                    value={userMultiCategs[index]}
                    control={<Radio />}
                    label={userMultiCategs[index]}
                    key={key}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginLeft: 60,
          marginTop: 10,
          bgcolor: "background.paper",
          padding: 2,
          borderRadius: 2,
          width: "65%",
          height: "fit-content",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        {multiCards &&
          Object.keys(multiCards).map((key, index) => (
            <UpdateMultiCard card={multiCards[index]} key={key} />
          ))}
        {flipCards &&
          Object.keys(flipCards).map((key, index) => (
            <UpdateFlipCard card={flipCards[index]} key={key} />
          ))}
      </Box>
    </>
  );
}
