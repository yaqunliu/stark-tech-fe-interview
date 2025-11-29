import { styled } from "@mui/material/styles";
import {
    Box,
    Paper,
    Button,
    TableCell,
    TableContainer,
    Stack,
    TableRow,
    IconButton
 } from "@mui/material";
 import { createTheme } from "@mui/material/styles";

export const Root = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    backgroundColor: "#2b2b2b",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  }));
  
export const Card = styled(Paper)(({ theme }) => ({
    width: "100%",
    backgroundColor: "#181818",
    color: theme.palette.common.white,
    borderRadius: 8,
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  }));
  
export const Header = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
  }));
export const NewButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    borderRadius: "6px",
    color: theme.palette.common.white,
    borderColor: '#444',
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  }));
  
export const Toolbar = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(2),
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
  }));
  
export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    backgroundColor: "transparent",
  }));
  
export  const TaskTitleCell = styled(TableCell)(() => ({
    borderBottomColor: "#333",
    color: "#f5f5f5",
  }));
  
export const DateCell = styled(TableCell)(() => ({
    borderBottomColor: "#333",
    color: "#f5f5f5",
  }));
  
export const NewTaskRow = styled(TableRow)(() => ({
    "&:hover": {
      backgroundColor: "transparent",
    },
  }));
  
export const theme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });
export const IconSortButton = styled(IconButton)(() =>({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  //  background: '#121212',
    width: 34,
    height: 34,
    borderRadius: 2,
    position: 'relative'
}));