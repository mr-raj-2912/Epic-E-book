import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../assets/img/book_logo.png";

import { Link } from "react-router-dom";

import { RoutePaths } from "./../../utils/enum";
import Shared from "../../utils/shared";
import { useMemo } from "react";

import { useAuthContext } from "../../context/auth";
import { useCartContext } from "../../context/cart";
import { Chip } from "@mui/material";

const linkStyle = {
  textDecoration: "none",
};

const Navbar = () => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();

  const items = useMemo(() => {
    return Shared.NavigationItems.filter(
      (item) =>
        !item.access.length || item.access.includes(authContext.user.roleId)
    );
  }, [authContext.user]);

  const logOut = () => {
    authContext.signOut();
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "92px",
        }}
      >
        <Link
          to={RoutePaths.BookListing}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "100px",
              justifyContent: "center",
            }}
          >
            <img src={logo} alt="logo" />
            <h2
              className="text-2xl font-semibold"
              style={{ marginTop: "35px" }}
            >
              Ebook
            </h2>
          </Box>
        </Link>

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!!authContext.user.id && (
            <Chip
              label={`Welcome, ${authContext.user.firstName} ${authContext.user.lastName}`}
              sx={{ backgroundColor: "#1976D2", fontSize: "16px" ,fontFamily: "Work Sans" , color:"white" }}
            />
          )}

          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {!authContext.user.id && (
              <>
                <Link to={RoutePaths.Login} style={linkStyle}>
                  <Button
                    variant="text"
                    color="primary"
                    sx={{ textTransform: "capitalize" }}
                    style={{ fontFamily: "Work Sans" }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to={RoutePaths.Registation} style={linkStyle}>
                  <Button
                    variant="text"
                    color="primary"
                    sx={{ textTransform: "capitalize" }}
                    style={{ fontFamily: "Work Sans" }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
            {items.map((item, index) => {
              return (
                <Link to={item.route} style={linkStyle} key={index}>
                  <Button
                    variant="text"
                    color="primary"
                    sx={{ textTransform: "capitalize" }}
                    style={{ fontFamily: "Work Sans" }}
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </Stack>
          <Link to={RoutePaths.Cart} style={linkStyle}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ShoppingCartIcon style={{ color: "#1976d2" }} />}
            >
              <span style={{ color: "#1976d2", marginRight: "5px" }}>
                {cartContext.cartData.length}
              </span>
              Cart
            </Button>
          </Link>
          {!!authContext.user.id && (
            <Link to="/book" style={linkStyle}>
              <Button
                variant="text"
                color="primary"
                sx={{ textTransform: "capitalize" }}
                onClick={logOut}
              >
                Logout
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Navbar;
