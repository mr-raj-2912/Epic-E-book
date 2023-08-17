/* eslint-disable react/prop-types */
// import Star from "./Star";

// // eslint-disable-next-line react/prop-types
// const BookCard = ({ title, price, author, img  , rating}) => {

//   const MAX_RATING = 5;

//   return (
//     <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:cursor-pointer m-2">
//       <div className="w-70 h-60 overflow-hidden p-2">
//           <img
//             className=" object-contain w-full h-full bg-blue-200 p-2 transition-all duration-500 hover:p-0 hover:scale-110"
//             src={img}
//             alt="product image"
//           />
//          </div>
//       <div className="px-5 pb-5">
//         <a href="#">
//           <h5 className="text-xl font-semibold tracking-tight text-gray-900">
//             {title}
//           </h5>{" "}
//           <br />
//         </a>
//         <div className="flex items-center mt-2.5 mb-5">

//         {Array.from({ length: MAX_RATING }).map((_, index) => (
//         <Star key={index} isActive={index < rating} />
//       ))}

//           <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 ml-2 px-2.5 py-0.5 rounded">
//           {rating}
//           </span>
//         </div>
//         <h6 className="text-sm font-semibold tracking-tight text-gray-900">
//           By {author}
//         </h6>{" "}
//         <br />
//         <div className="flex items-center justify-between">
//           <span className="text-3xl font-bold text-gray-900">₹{price}</span>
//           <a
//             href="#"
//             className="text-white bg-[#1976d2] hover:bg-[#1076dc] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
//           >
//             Add to cart
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;




import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Chip, Stack } from "@mui/material";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import shared from "../../../utils/shared";
import { useAuthContext } from "../../../context/auth";
import { useCartContext } from "../../../context/cart";

const BookCard = ({ book }) => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();

  const addToCart = (book) => {
    shared.addToCart(book, authContext.user.id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        cartContext.updateCart();
      }
    });
  };

  return (
    <>
      <div
        style={{
          borderRadius: "1rem",
          overflow: "hidden",
          border: "1px solid #d4d4d4",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "1rem",
            height: "100%",
            overflow: "hidden",
            // borderRadius: "1rem",
            // border: "1px solid #d4d4d4",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              width: "40%",
              // backgroundColor: "#eeee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={book.base64image}
              alt="book image"
              style={{ height: "12rem", objectFit: "cover" }}
            />
          </div>
          <Stack
            alignItems="flex-start"
            useFlexGap
            spacing={1}
            sx={{ height: "100%", paddingY: "0.5rem", width: "50%" }}
          >
            <div
              style={{
                // backgroundColor: "orange",
                border: "1px solid #1976d2",
                borderRadius: "10px",
              }}
            >
              <Typography
                style={{ margin: "5px 15px", color: "#1976d2" }}
                variant="h6"
              >
                {book.name}
              </Typography>
            </div>
            <Chip label={book.category} sx={{ backgroundColor: "#e0e8eb" }} />

            {/* <Typography variant="body2" color="text.secondary">
          {description}
        </Typography> */}
            <Typography variant="h6">&#8377; {book.price}</Typography>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                marginTop: "auto",
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#024384",
                },
              }}
              onClick={() => addToCart(book)}
            >
              Add
            </Button>
          </Stack>
        </Box>
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#f7f3f3ed",
          }}
        >
          <Typography
            style={{
              margin: "5px 10px",
            }}
            variant="body2"
            color="text.secondary"
          >
            &nbsp;&nbsp;&nbsp;{book.description}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default BookCard;
