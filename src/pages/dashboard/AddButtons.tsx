import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';

const styles = {
    position: 'fixed',
    bottom: 16,
    left: 0,
    width: '100%',
    display: 'flex',
    gap: 3
}

interface Props {
  openFlipCardForm: () => void, 
  openMultiCardForm: () => void
}

export default function AddButtons({openFlipCardForm, openMultiCardForm}: Props) {
  return (
    <Container sx={styles} >
      <Fab variant="extended" color='secondary' onClick={openMultiCardForm}>
        <AddIcon/>
        Multi Choice card
      </Fab>
      <Fab variant="extended" color='secondary' onClick={openFlipCardForm}>
        <AddIcon />
        Flip Card
      </Fab>
    </Container>
  );
}
