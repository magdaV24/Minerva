import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
};

const btnStyles = {
  width: "10rem",
  height: "5rem",
  fontSize: "2rem",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  backgroundColor: 'secondary.light'
};

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  function closeLogin(){
    setShowLogin(false)
  }

  return (
    <div style={styles}>
      <Container
        sx={{
          height: "40vh",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
          backgroundColor: 'background.paper',
          borderRadius: '5px'
        }}
      >
        <Box>
          <Button sx={btnStyles} variant="outlined" onClick={() => setShowLogin(true)}>
            LOG IN
          </Button>
        </Box>
        <Box>
          <Button sx={btnStyles} variant="outlined" component={Link} to='/register'>
            REGISTER
          </Button>
        </Box>
      </Container>

      <Login open={showLogin} handleClose={closeLogin} />
    </div>
  );
}
