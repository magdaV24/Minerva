import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import {
  Avatar,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Link,
  createTheme,
} from "@mui/material";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import agent from "../../app/api/agent";
import { lightTheme, darkTheme } from "../../app/layout/Themes";

interface Props{
  url: string
}
export default function Register({url}: Props) {

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");
  const [email, setEmail] = useState("");

  function checkPasswrds(valOne: string, valTwo: string) {
    if (valOne !== valTwo) {
      return false;
    } else {
      return true;
    }
  }

  function handleRegister(e: any) {
    e.preventDefault();
    setIsLoading(true);

    if (checkPasswrds(password, verification)) {
      const data = {
        username, password, email
      }
      agent.Account.register(data)
      setUsername("")
      setEmail("")
      setPassword("")
      setVerification("")
    }

    setIsLoading(false);
  }
  return (
    <>
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:`url(${url})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ bgcolor: "background.paper" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.dark" }}>
              <PsychologyOutlinedIcon sx={{ color: "primary.light" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create a new account
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleRegister}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setVerification(e.target.value)}
                value={verification}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                autoFocus
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isLoading}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <Link href="/" variant="body2" color="primary.light">
                    {
                      "You already have an account? Go to the home page and log in!"
                    }
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
