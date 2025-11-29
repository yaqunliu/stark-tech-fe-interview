import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/material";

export default function DoneIcon() {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        bgcolor: "success.main", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CheckIcon sx={{ fontSize: 16, color: "common.white" }} />
    </Box>
  );
}
