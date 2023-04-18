import { Box, AppBar, Toolbar, Typography, Link } from "@mui/material";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, mb: 10 }}>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            height: "100%",
            gap: .5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PsychologyOutlinedIcon sx={{ fontSize: "2.5rem" }} color="secondary" />
          <Link href="/dashboard" color="primary.light" sx={{textDecoration: "none", fontSize: '2.5rem', color: 'secondary.main'}}>
              Minerva
            </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
