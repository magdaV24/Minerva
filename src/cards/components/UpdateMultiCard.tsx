import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import agent from "../../app/api/agent";
import { MultiCardModel } from "../../app/models/MultiCardModel";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { useAppDispatch } from "../../app/store/configureStore";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

interface Props {
  card: MultiCardModel;
}
export default function UpdateMultiCard({ card }: Props) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false)
  const id = card.id;

  const deleteCard = async (id: number) => {
    return await agent.MultiCards.deleteMultiCard(id);
  };
  const editCard = async (values: any) => {
    return await agent.MultiCards.put(values);
  };

  const EditForm = () => {
    const [newQuestion, setNewQuestion] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newAnsOne, setNewAnsOne] = useState("");
    const [newAnsTwo, setNewAnsTwo] = useState("");
    const [newAnsThree, setNewAnsThree] = useState("");
    const [newAnsRight, setNewAnsRight] = useState("");
    const [newPrivate, setNewPrivate] = useState(0);

    const oldCategory = card?.category;
    const oldQuestion = card?.question;
    const oldOptOne = card?.optionOne;
    const oldOptTwo = card?.optionTwo;
    const oldOptThree = card?.optionThree;
    const oldRightAns = card?.rightAns;

    async function submitEdit(e: any) {
      e.preventDefault();
      let values = {
        Id: id,
        Category: newCategory,
        Question: newQuestion,
        OptionOne: newAnsOne,
        OptionTwo: newAnsTwo,
        OptionThree: newAnsThree,
        RightAns: newAnsRight,
        Private: newPrivate,
      };
      try {
        dispatch(() => editCard(values));
        setLoading(false);
        setIsEditing(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
      
    }

    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: 4,
          width: 575,
        }}
      >
        <Box style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <TextField
            multiline
            maxRows={4}
            id="outlined-required"
            label="Category"
            defaultValue={oldCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <TextField
            multiline
            maxRows={4}
            id="outlined-required"
            label="Question"
            defaultValue={oldQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <TextField
            multiline
            maxRows={4}
            id="outlined-required"
            label="Option One"
            defaultValue={oldOptOne}
            onChange={(e) => setNewAnsOne(e.target.value)}
          />
          <TextField
            multiline
            maxRows={4}
            id="outlined-required"
            label="Option Two"
            defaultValue={oldOptTwo}
            value={newAnsTwo}
            onChange={(e) => setNewAnsTwo(e.target.value)}
          />
          <TextField
            multiline
            maxRows={4}
            id="outlined-required"
            label="Option Three"
            defaultValue={oldOptThree}
            onChange={(e) => setNewAnsThree(e.target.value)}
          />
          <TextField
            multiline
            maxRows={4}
            id="outlined-required"
            label="Right Answer"
            defaultValue={oldRightAns}
            onChange={(e) => setNewAnsRight(e.target.value)}
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
                onChange={() => setNewPrivate(0)}
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Public"
                onChange={() => setNewPrivate(1)}
              />
            </RadioGroup>
          </FormControl>
          <LoadingButton
            loading={loading}
            size="large"
            type="submit"
            variant="outlined"
            onClick={submitEdit}
          >
            SAVE
          </LoadingButton>
        </Box>
      </Box>
    );
  };

  function createData(
    ID: number,
    category: string,
    question: string,
    wrong_ans_one: string,
    wrong_ans_two: string,
    wrong_ans_three: string,
    right_ans: string,
    edit: any,
    del: any
  ) {
    return {
      ID,
      category,
      question,
      wrong_ans_one,
      wrong_ans_two,
      wrong_ans_three,
      right_ans,
      edit,
      del,
    };
  }

  const rows = [
    createData(
      card?.id,
      card?.category,
      card?.question,
      card?.optionOne,
      card?.optionTwo,
      card?.optionThree,
      card?.rightAns,
      <Button
        variant="outlined"
        color="success"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        <EditSharpIcon />
        EDIT
      </Button>,
      <Button
        variant="outlined"
        color="error"
        onClick={() => deleteCard(card.id)}
      >
        <DeleteOutlineSharpIcon />
        DELETE
      </Button>
    ),
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell  >ID</TableCell>
              <TableCell  >Category</TableCell>
              <TableCell  >Question</TableCell>
              <TableCell  sx={{width: "7rem"}}>Wrong Answer One</TableCell>
              <TableCell  sx={{width: "7rem"}}>Wrong Answer Two</TableCell>
              <TableCell  sx={{width: "7rem"}}>Wrong Answer Three</TableCell>
              <TableCell  sx={{width: "7rem"}}>Right Answer</TableCell>
              <TableCell  sx={{width: "1rem"}}> </TableCell>
              <TableCell  sx={{width: "1rem"}}> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{width: "2rem"}}>{row.ID}</TableCell>
                <TableCell sx={{width: "5rem"}}>{row.category}</TableCell>
                <TableCell sx={{width: "10rem"}}>{row.question}</TableCell>
                <TableCell sx={{width: "7rem"}}>{row.wrong_ans_one}</TableCell>
                <TableCell sx={{width: "7rem"}}>{row.wrong_ans_two}</TableCell>
                <TableCell sx={{width: "7rem"}}>{row.wrong_ans_three}</TableCell>
                <TableCell sx={{width: "7rem"}}>{row.right_ans}</TableCell>
                <TableCell sx={{width: "1rem"}}>{row.edit}</TableCell>
                <TableCell sx={{width: "1rem"}}>{row.del}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isEditing && <EditForm />}
    </>
  );
}
