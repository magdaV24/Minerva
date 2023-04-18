import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { FlipCardModel } from "../../app/models/FlipCardModel";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import agent from "../../app/api/agent";
import { useState } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";

interface Props {
  card: FlipCardModel;
}

export default function UpdateFlipCard({ card }: Props) {
  const dispatch = useAppDispatch();
  const id = card.id;
  const deleteCard = async (id: number) => {
    return await agent.FlipCards.delete(id);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false)

  const editCard = async (values: any) => {
    return await agent.FlipCards.put(values);
  };

  const oldCategory = card?.category;
  const oldFront = card?.front;
  const oldBack = card?.back;

  const EditForm = () => {
    const [newCategory, setNewCategory] = useState("");
    const [newFront, setNewFront] = useState("");
    const [newBack, setNewBack] = useState("");
    const [newPrivate, setNewPrivate] = useState(0);

    async function submitEdit(e: any) {
      e.preventDefault();
      setLoading(true)
      let values = {
        Id: id,
        Category: newCategory,
        Front: newFront,
        Back: newBack,
        Private: newPrivate,
      };
      try {
      dispatch(() => editCard(values))
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
        <Box
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
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
            label="Front"
            defaultValue={oldFront}
            onChange={(e) => setNewFront(e.target.value)}
          />
          <TextField
            multiline
            maxRows={4}
            id="outlined-required"
            label="Back"
            defaultValue={oldBack}
            onChange={(e) => setNewBack(e.target.value)}
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

          <LoadingButton loading={loading} size="large" type="submit" variant="outlined" onClick={submitEdit}>
            SAVE
          </LoadingButton>
        </Box>
      </Box>
    );
  };
  function createData(
    ID: number,
    category: string,
    front: string,
    back: string,
    edit: any,
    del: any
  ) {
    return { ID, category, front, back, edit, del };
  }

  const rows = [
    createData(
      card?.id,
      card?.category,
      card?.front,
      card?.back,
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
            <TableRow sx={{width: 950}}>
              <TableCell  sx={{width: "2rem"}}>ID</TableCell>
              <TableCell  sx={{width: "6rem"}}>Category</TableCell>
              <TableCell  sx={{width: "14rem"}}>Front</TableCell>
              <TableCell  sx={{width: "14rem"}}>Back</TableCell>
              <TableCell  sx={{width: "6rem"}}> </TableCell>
              <TableCell  sx={{width: "6rem"}}> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{width: "2rem"}}>{row.ID}</TableCell>
                <TableCell sx={{width: "6rem"}}>{row.category}</TableCell>
                <TableCell sx={{width: "14rem"}}>{row.front}</TableCell>
                <TableCell sx={{width: "14rem"}}>{row.back}</TableCell>
                <TableCell sx={{width: "6rem"}}>{row.edit}</TableCell>
                <TableCell sx={{width: "6rem"}}>{row.del}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isEditing && <EditForm />}
    </>
  );
}
