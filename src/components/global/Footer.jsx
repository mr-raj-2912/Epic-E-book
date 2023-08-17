import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from "../../assets/img/book_logo.png";
const Footer = () => {
  return (
    <Box
      sx={{
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        marginTop: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100px",
          justifyContent: "center",
        }}
      >
        <img src={logo} alt="logo" style={{width: "150px"}} />
      </Box>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ color: "grey", marginTop: "5px" }}
        style={{fontFamily: "Work Sans"}}
      >
        @2023 <a target="_blank" className=" text-blue-800" style={{fontFamily: "Work Sans"}} rel="noreferrer">Raj Tukadiya </a>  All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;
