import { useState } from "react";
import { User } from "../../app/models/User";
import { Box, Typography } from "@mui/material";
import PublicOffSharpIcon from "@mui/icons-material/PublicOffSharp";
import PublicSharpIcon from "@mui/icons-material/PublicSharp";
import CategoryMultiCard from "../components/CategoryMultiCards";
import { useMultiCardsUserCategs } from "../../app/hooks/useMultiCardsUserCategs";
import useMultiCards from "../../app/hooks/useMultiCards";

export default function DisplayMultiCards() {
  //Fetching current user
  const fetchCurrentUser = () => {
    const res = JSON.parse(localStorage.getItem("user") as any);
    return res;
  };
  const [user, setUser] = useState<User>(fetchCurrentUser());
  const userID = user.userID;
  const { publicCategs } = useMultiCards();
  const { userMultiCategs } = useMultiCardsUserCategs({ id: userID });

  return (
    <>
      {publicCategs.length !== 0 && (
        <Box
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
            {publicCategs && Object.keys(publicCategs).map((key, index: number) => (
              <CategoryMultiCard key={key} category={publicCategs[index]} pub={true}/>
            ))}
          </Box>
        </Box>
      )}

      {userMultiCategs.length !== 0 && (
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
            {userMultiCategs && Object.keys(userMultiCategs).map((key, index: number) => (
              <CategoryMultiCard key={key} category={userMultiCategs[index]} pub={false}/>
            ))}
          </Box>
        </Box>
      )}
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
      {userMultiCategs.length === 0 && (
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
