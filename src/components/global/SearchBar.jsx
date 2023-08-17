import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

const SearchBar = () => {
  return (
    <Box
      sx={{
        height: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        fontFamily: "Work Sans"
      }}
    >
      <TextField
        type="text"
        placeholder="What are you looking for ..."
        size="small"
      sx={{width:"422px"}}
      />
      <Button
        variant="contained"
        style={{fontFamily: "Work Sans"}}
        sx={{ textTransform: "capitalize", backgroundColor:"#1976d2",'&:hover': {
            backgroundColor: "#1976d2",
            } }}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>

    </Box>
  );
};

export default SearchBar;
