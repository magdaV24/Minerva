import agent from "../../app/api/agent";
import { useNavigate } from "react-router-dom";
import { Modal, Box, TextField, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/store/configureStore";
import { signInUser } from "./accountSlice";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "20%",
  left: "30%",
  width: 600,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  bgcolor: "secondary.light",
  boxShadow: 24,
  p: 4,
  borderRadius: "2px",
};

const btnStyles = {
  width: "100%",
  height: "3rem",
  fontSize: "1.1rem",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  bgcolor: "primary.dark",
  color: "secondary.dark",
};

export default function Login({ open, handleClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  async function login(values: FieldValues) {
    try {
      await agent.Account.login(values);
      dispatch(signInUser(values));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit(login)}>
          <Typography variant="h6">Welcome back!</Typography>
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            autoFocus
            {...register("username")}
          />
          <TextField
            id="standard-basic"
            type="password"
            label="Password"
            variant="standard"
            autoFocus
            {...register("password")}
          />

          <LoadingButton
            sx={btnStyles}
            loading={isSubmitting}
            type="submit"
            onClick={login}
          >
            LOGIN
          </LoadingButton>
          <Link href="/register" variant="body2">
            {"You aren't registered yet? Create an account now!"}
          </Link>
        </Box>
      </Modal>
    </>
  );
}
