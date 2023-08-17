import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  roleId: 3,
};

const roleList = [
  { id: 2, name: "seller" },
  { id: 3, name: "buyer" },
];


const registerSchema = Yup.object({
  firstName: Yup.string()
    .min(2)
    .max(25)
    .required("please enter your first name"),
  lastName: Yup.string().min(2).max(25).required("please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .min(6)
    .required("Please enter password with min 6 char"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
  roleId: Yup.number().required("Role is required"),
});


const Registration = () => {
  const navigate = useNavigate();

const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: (values) => {
        // console.log("form vals", values);
        // alert("sucessfull");
        delete values.confirmPassword;
        authService.create(values).then((res) => {
          navigate("/login");
          toast.success("Successfully registered");
        });
      },
    });



  return (
    <Container maxWidth="lg" sx={{margin:"1.5rem auto"}}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontWeight: 600 , fontFamily: "Work Sans" }}

            textAlign="center"
          >
            Login or Create An Account
          </Typography>
          <Box>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 600 , fontFamily: "Work Sans" }}>
              Personal Information
            </Typography>
            <hr />
            <Typography variant="body1" gutterBottom color="grey" style={{fontFamily: "Work Sans"}}>
              Please enter your information to create your account.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom style={{fontFamily: "Work Sans"}}>
                  First Name *
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  fullWidth
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{fontFamily: "Work Sans"}}
                  helperText={errors.firstName && touched.firstName ? errors.firstName :null}
                  error={errors.firstName && touched.firstName}
                />

              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom style={{fontFamily: "Work Sans"}}>
                  Last Name *
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  fullWidth
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.lastName && touched.lastName ? errors.lastName :null}
                  error={errors.lastName && touched.lastName}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom style={{fontFamily: "Work Sans"}}>
                  Email Address *
                </Typography>
                <TextField
                  type="email"
                  size="small"
                  fullWidth
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  style={{fontFamily: "Work Sans"}}
                  onBlur={handleBlur}
                  helperText={errors.email && touched.email ? errors.email :null}
                  error={errors.email && touched.email}
                />
              </Grid>
              <Grid item xs={6} >
                <Typography variant="body1" gutterBottom style={{fontFamily: "Work Sans"}}>
                  Role *
                </Typography>
                <Select
                  value={values.roleId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="roleId"
                  size="small"
                  style={{fontFamily: "Work Sans"}}
                  fullWidth
                 displayEmpty
                >
                  {roleList.length > 0 &&
                    roleList.map((role) => (
                      <MenuItem value={role.id} style={{fontFamily: "Work Sans"}} key={"name" + role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                </Select>


              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 600 , fontFamily: "Work Sans" }}>
              Login Information
            </Typography>
            <hr />

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom style={{fontFamily: "Work Sans"}}>
                  Password *
                </Typography>
                <TextField
                  type="password"
                  size="small"
                  fullWidth
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  style={{fontFamily: "Work Sans"}}
                  onBlur={handleBlur}
                  helperText={errors.password && touched.password ? errors.password :null}
                  error={errors.password && touched.password}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom style={{fontFamily: "Work Sans"}}>
                  Confirm Password *
                </Typography>
                <TextField
                  type="password"
                  size="small"
                  fullWidth
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword :null}
                  error={errors.confirmPassword && touched.confirmPassword}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{fontFamily: "Work Sans"}}
              sx={{ textTransform: "capitalize", backgroundColor: "#1976d2" ,  }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default Registration;
