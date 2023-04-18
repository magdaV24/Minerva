import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import FlipCardsGame from "../games/FlipCardsGame";
import { useState } from "react";
import { useFlipCardsCategory } from "../../app/hooks/useFlipCardsCategory";
import ListFlipCards from "./ListFlipCards";

interface Props {
  category: string;
  pub: boolean;
}

const style = {
  width: 200,
  height: 200,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  transition: "transform 0.3s, border 0.3s",
  "&:hover": {
    borderColor: "primary.main",
    transform: "translateY(-2px)",
  },
  "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
};

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: 800,
  overflow: "scroll",
};

export default function CategoryFlipCard({ category, pub }: Props) {
  const [categ, setCateg] = useState("");
  const { count, countPriv } = useFlipCardsCategory({ category: category });
  const handleClick = () => {
    setCateg(category);
    handleOpen();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickList = () => {
    setCateg(category);
    handleOpenList();
  };

  const [openList, setOpenList] = useState(false);
  const handleOpenList = () => setOpenList(true);
  const handleCloseList = () => setOpenList(false);
  return (
    <>
      <Card sx={style}>
        <CardContent>
          <Typography variant="h5" component="div" color="secondary">
            {category}
          </Typography>
          {pub && <Typography color="secondary.dark">{count} cards</Typography>}
          {!pub && (
            <Typography color="secondary.dark">{countPriv} cards</Typography>
          )}
        </CardContent>
        <CardActions
          sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
        >
          {!pub && (
            <Button variant="outlined" onClick={handleClick}>
              Pick Category
            </Button>
          )}
          {pub && (
            <>
              <Button
                variant="outlined"
                color="success"
                sx={{ width: "50%" }}
                onClick={handleClickList}
              >
                See Cards
              </Button>
              <Button
                variant="outlined"
                onClick={handleClick}
                sx={{ width: "50%" }}
              >
                Pick Category
              </Button>
            </>
          )}
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <FlipCardsGame categ={categ} />
        </Box>
      </Modal>

      <Modal
        open={openList}
        onClose={handleCloseList}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1200,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflow: "scroll",
            height: 800,
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              outline: "1px solid grey",
            },
          }}
        >
          <ListFlipCards category={categ} />
        </Box>
      </Modal>
    </>
  );
}
