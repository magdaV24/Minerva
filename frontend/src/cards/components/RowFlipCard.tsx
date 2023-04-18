import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { FlipCardModel } from "../../app/models/FlipCardModel";
import agent from "../../app/api/agent";

interface Props {
  card: FlipCardModel;
}

export default function RowFlipCard({ card }: Props) {

    const fetchCurrentUser = () => {
        const res = JSON.parse(localStorage.getItem("user") as any);
        return res;
      };
    const user = fetchCurrentUser();
    const id = user.userID;

    const values = {
      Category: card?.category,
      Front: card?.front,
      Back: card?.back,
      Public: 0,
      UserID: id,
    }

    function addCard(e: any){
        e.preventDefault();
        agent.FlipCards.post(values);
    }
  function createData(
    ID: number,
    category: string,
    front: string,
    back: string,
    add: any
  ) {
    return { ID, category, front, back, add };
  }

  const rows = [
    createData(
      card?.id,
      card?.category,
      card?.front,
      card?.back,
      <Button variant="outlined" color="success" onClick={addCard}>
        <AddCircleOutlineSharpIcon />
        ADD
      </Button>
    ),
  ];
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: "2rem"}}>ID</TableCell>
              <TableCell sx={{width: "5rem"}}>Category</TableCell>
              <TableCell sx={{width: "17rem"}}>Front</TableCell>
              <TableCell sx={{width: "17rem"}}>Back</TableCell>
              <TableCell sx={{width: "5rem"}}> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.ID}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.front}</TableCell>
                <TableCell>{row.back}</TableCell>
                <TableCell>{row.add}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
