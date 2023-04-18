import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { fetchCurrentUser } from "../../pages/home/accountSlice";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '20%',
  left: '100%',
  width: 600,
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  bgcolor: 'primary.dark',
  boxShadow: 24,
  p: 4,
};

const btnStyles = {
  width: "100%",
  height: "3rem",
  fontSize: "1.1rem",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  bgcolor: 'primary.dark',
  color: 'secondary.dark'
};
export default function FlipCardForm({open, handleClose }: Props) {

  const [category, setCategory] = useState("")
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const [visible, setVisible] = useState(0)

  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch();
  const [id, setID] = useState({});

  useEffect(() => {
    const getID = async () => {
      const res = await dispatch(fetchCurrentUser()).then((result) => result.payload as any)
      setID(res.userID)
    }
    getID();
  },[dispatch])

  function createFlipCard(e: any){
    e.preventDefault();
    setLoading(true);

    let values = {
      Category: category,
      Front: front,
      Back: back,
      Public: visible,
      UserID: id,
    };
    agent.FlipCards.post(values);
    setFront("");
    setBack("")
    setLoading(false)
  }
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{width: '30rem'}}
    >
      <Box sx={style}>
        <Typography variant="h6" sx={{color: 'secondary.dark'}}>Create a Flip Card</Typography>
        <TextField
          id="standard-multiline-flexible"
          label="Category"
          multiline
          maxRows={4}
          variant="standard"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <TextField
          id="standard-multiline-flexible"
          label="Front"
          multiline
          maxRows={4}
          variant="standard"
          onChange={(e) => setFront(e.target.value)}
          value={front}
        />
        <TextField
          id="standard-multiline-flexible"
          label="Back"
          multiline
          maxRows={4}
          variant="standard"
          onChange={(e) => setBack(e.target.value)}
          value={back}
        />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Who can see your card?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Private"
              onChange={() => setVisible(0)}
            />
            <FormControlLabel
              control={<Radio />}
              label="Public"
              onChange={() => setVisible(1)}
              value={0}
            />
          </RadioGroup>
        </FormControl>
        <LoadingButton loading={loading} onClick={createFlipCard} type="submit" sx={btnStyles}>Create Card</LoadingButton>
      </Box>
    </Modal>
  );
}
