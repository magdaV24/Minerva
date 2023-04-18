import { useState } from "react";
import CategoryFlipCard from "../components/CategoryFlipCard";
import PublicSharpIcon from "@mui/icons-material/PublicSharp";
import { Box, Typography } from "@mui/material";
import { User } from "../../app/models/User";
import PublicOffSharpIcon from "@mui/icons-material/PublicOffSharp";
import { useFlipCards } from "../../app/hooks/useFlipCards";
import { useFlipCardsId } from "../../app/hooks/useFlipCardsId";

export default function DisplayFlipCards() {
  //Fetching the current user
  const fetchCurrentUser = () => {
    const res = JSON.parse(localStorage.getItem("user") as any);
    return res;
  };
  const [user, setUser] = useState<User>(fetchCurrentUser());
  const userID = user.userID;

  const { userCategs } = useFlipCardsId({ id: userID });
  const { publicCategs } = useFlipCards();

  return (
    <>
      {publicCategs.length > 0 && <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginLeft: 45,
          bgcolor: "background.paper",
          padding: 2,
          borderRadius: 2,
          width: "90%",
          height: "fit-content",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
          }}
          variant="h5"
          color="secondary.light"
        >
          <PublicSharpIcon />
          Public Cards
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 5,
          }}
        >
          {publicCategs &&
            Object.keys(publicCategs).map((key, index: number) => (
              <CategoryFlipCard key={key} category={publicCategs[index]} pub={true}/>
            ))}
        </Box>
      </Box>}
          
      {userCategs.length > 0 && <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginLeft: 45,
          marginTop: 10,
          bgcolor: "background.paper",
          padding: 2,
          borderRadius: 2,
          width: "90%",
          height: "fit-content",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
          }}
          variant="h5"
          color="secondary.light"
        >
          <PublicOffSharpIcon />
          Your Cards
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 5,
          }}
        >
          {userCategs &&
            Object.keys(userCategs).map((key, index: number) => (
              <CategoryFlipCard key={key} category={userCategs[index]} pub={false}/>
            ))}
        </Box>
      </Box>}

      {publicCategs.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginLeft: 45,
            marginTop: 10,
            bgcolor: "background.paper",
            padding: 2,
            borderRadius: 2,
            width: "90%",
            height: "fit-content",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Typography>No one created any public cards yet!</Typography>
        </Box>
      )}
      {userCategs.length ===  0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginLeft: 45,
            marginTop: 10,
            bgcolor: "background.paper",
            padding: 2,
            borderRadius: 2,
            width: "90%",
            height: "fit-content",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Typography>You didn't create any cards yet!</Typography>
        </Box>
      )}
    </>
  );
}
