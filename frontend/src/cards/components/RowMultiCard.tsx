import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { MultiCardModel } from "../../app/models/MultiCardModel";
import agent from "../../app/api/agent";

interface Props {
    card: MultiCardModel;
  }

export default function RowMultiCard({card}: Props){
    const fetchCurrentUser = () => {
        const res = JSON.parse(localStorage.getItem("user") as any);
        return res;
      };
    const user = fetchCurrentUser();
    const id = user.userID;

    const values = {
      Category: card?.category,
      Question: card?.question,
      OptionOne: card?.optionOne,
      OptionTwo: card?.optionTwo,
      OptionThree: card?.optionThree,
      Public: 0,
      RightAns: card?.rightAns,
      UserID: id,
    }

    function addCard(e: any){
        e.preventDefault();
        agent.MultiCards.post(values)
    }

    function createData(
        ID: number,
        category: string,
        question: string,
        wrong_ans_one: string,
        wrong_ans_two: string,
        wrong_ans_three: string,
        right_ans: string,
        add: any
      ) {
        return {
          ID,
          category,
          question,
          wrong_ans_one,
          wrong_ans_two,
          wrong_ans_three,
          right_ans,
          add,
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
      <Button variant="outlined" color="success" onClick={addCard}>
        <AddCircleOutlineSharpIcon />
        ADD
      </Button>
        ),
      ];
    
      return (
        <>
          <TableContainer component={Paper} sx={{ minWidth: 700 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{width: "2rem"}}>ID</TableCell>
                  <TableCell sx={{width: "5rem"}}>Category</TableCell>
                  <TableCell sx={{width: "9rem"}}>Question</TableCell>
                  <TableCell sx={{width: "6rem"}}>Wrong Answer One</TableCell>
                  <TableCell sx={{width: "6rem"}}>Wrong Answer Two</TableCell>
                  <TableCell sx={{width: "6rem"}}>Wrong Answer Three</TableCell>
                  <TableCell sx={{width: "6rem"}}>Right Answer</TableCell>
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
                    <TableCell>{row.question}</TableCell>
                    <TableCell>{row.wrong_ans_one}</TableCell>
                    <TableCell>{row.wrong_ans_two}</TableCell>
                    <TableCell>{row.wrong_ans_three}</TableCell>
                    <TableCell>{row.right_ans}</TableCell>
                    <TableCell>{row.add}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      );
}