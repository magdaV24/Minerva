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
  position: "absolute" as "absolute",
  top: "5%",
  left: "100%",
  width: 600,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  bgcolor: 'primary.dark',
  boxShadow: 24,
  p: 4,
};

const btnStyles = {
  width: "100%",
  height: "3rem",
  fontSize: "1.1rem",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  bgcolor: "primary.dark",
  color: "secondary.dark",
};
export default function MultiCardForm({ open, handleClose }: Props) {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [ansOne, setAnsOne] = useState("");
  const [ansTwo, setAnsTwo] = useState("");
  const [ansThree, setAnsThree] = useState("");
  const [rightAns, setRightAns] = useState("");
  const [visible, setVisible] = useState(0);

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [id, setID] = useState({});


  useEffect(() => {
    const getID = async () => {
      const res = await dispatch(fetchCurrentUser()).then((result) => result.payload as any)
      setID(res.userID)
    }
    getID();
  },[dispatch])

  function createMultiCard(e: any) {
    e.preventDefault();
    setLoading(true);
    let data = {
      Category: category,
      Question: question,
      OptionOne: ansOne,
      OptionTwo: ansTwo,
      OptionThree: ansThree,
      Public: visible,
      RightAns: rightAns,
      UserID: id,
    };
    agent.MultiCards.post(data)
    console.log(data);
    setQuestion("");
    setAnsOne("");
    setAnsTwo("");
    setAnsThree("");
    setRightAns("");
    setLoading(false);
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ width: "30rem" }}
    >
      <Box sx={style}>
        <Typography variant="h6">Create a Multiple Choices Card</Typography>
        <TextField
          id="standard-multiline-flexible"
          label="Category"
          maxRows={4}
          variant="standard"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <TextField
          id="standard-multiline-flexible"
          label="Question"
          maxRows={4}
          variant="standard"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
        <TextField
          id="standard-multiline-flexible"
          label="Wrong Answer"
          maxRows={4}
          variant="standard"
          onChange={(e) => setAnsOne(e.target.value)}
          value={ansOne}
        />

        <TextField
          id="standard-multiline-flexible"
          label="Wrong Answer"
          maxRows={4}
          variant="standard"
          onChange={(e) => setAnsTwo(e.target.value)}
          value={ansTwo}
        />

        <TextField
          id="standard-multiline-flexible"
          label="Wrong Answer"
          maxRows={4}
          variant="standard"
          onChange={(e) => setAnsThree(e.target.value)}
          value={ansThree}
        />

        <TextField
          id="standard-multiline-flexible"
          label="Right Answer"
          maxRows={4}
          variant="standard"
          onChange={(e) => setRightAns(e.target.value)}
          value={rightAns}
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
              value={0}
              control={<Radio />}
              label="Private"
              onChange={() => setVisible(0)}
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Public"
              onChange={() => setVisible(1)}
            />
          </RadioGroup>
        </FormControl>
        <LoadingButton
          loading={loading}
          sx={btnStyles}
          onClick={createMultiCard}
        >
          Create Card
        </LoadingButton>
      </Box>
    </Modal>
  );
}
