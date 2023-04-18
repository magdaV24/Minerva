import { useState } from "react";
import AddButtons from "./AddButtons";
import Navbar from "../../app/layout/Navbar";
import MultiCardForm from "../../cards/forms/MultiCardForm";
import FlipCardForm from "../../cards/forms/FlipCardForm";
import { Box, Button } from "@mui/material";
import SchoolSharpIcon from '@mui/icons-material/SchoolSharp';
import DisplayFlipCards from "../../cards/display/DisplayFlipCards";
import DisplayMultiCards from "../../cards/display/DisplayMultiCards";
import { fetchCurrentUser, signOut } from "../home/accountSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import { useAccount } from "../../app/hooks/useAccount";
export default function Dashboard() {
  const [openFlip, setOpenFlip] = useState(false);
  const [openMulti, setOpenMulti] = useState(false);

  const dispatch = useAppDispatch();

  const user = useAccount();

  const id = user.user?.userID;
  const [showFlipCards, setShowFlipCards] = useState(false);
  const [showMultiCards, setShowMultiCards] = useState(false);

  const handleShowFlipCards = () => {
    setShowFlipCards(true);
    setShowMultiCards(false)
  }

  const handleShowMultiCards = () => {
    setShowFlipCards(false);
    setShowMultiCards(true)
  }
  function openFlipCardForm() {
    setOpenFlip(true);
  }

  function openMultiCardForm() {
    setOpenMulti(true);
  }

  function handleCloseFlip() {
    setOpenFlip(false);
  }

  function handleCloseMulti() {
    setOpenMulti(false);
  }

  return (
    <>
      <Navbar />
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "3rem",
          height: "fit-content",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "2rem",
            position: "fixed",
            bgcolor: 'background.paper',
            padding: 1, 
            borderRadius: 2,
            width: '20%',
            height: 'fit-content',
            marginLeft: -3,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
          }}
        >
          <Button size="large" variant="outlined" onClick={handleShowMultiCards}><SchoolSharpIcon /> Multi Cards</Button>
          <Button variant="outlined" onClick={handleShowFlipCards}><SchoolSharpIcon /> Flip Cards</Button>
          <Button size="large" variant="outlined" href="/user">HOME</Button>
          <Button size="large" variant="outlined" onClick={()=>dispatch(signOut())}>LOGOUT</Button>
        </Box>
        <Box>
          {showFlipCards && <DisplayFlipCards />}
          {showMultiCards && <DisplayMultiCards />}
        </Box>
      </section>
      <AddButtons
        openFlipCardForm={openFlipCardForm}
        openMultiCardForm={openMultiCardForm}
      />
      <MultiCardForm open={openMulti} handleClose={handleCloseMulti} />
      <FlipCardForm open={openFlip} handleClose={handleCloseFlip} />
    </>
  );
}
