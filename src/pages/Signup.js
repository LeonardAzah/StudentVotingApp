import React, { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

import AuthContext from "../hooks/AuthContext";
import RadioButton from "../components/RadioButton";
import DateInput from "../components/DateInput";
import DropdownList from "../components/DropdownList";
import InputText from "../components/InputText";
import Button from "../components/Button";
import { usePasswordToggle } from "../components/InputText";
import logo from "../assets/logo.png";
import sideimage from "../assets/sideimage.PNG";

export const gridStyle = {
  // marginTop: { xs: "40%", sm: "10%" },
  // paddingY: "1rem",
  padding: "1rem",
};

export const btnStyle = {
  fontSize: "0.9375rem",
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  matricule: "",
  sex: "",
  dateOfBirth: "",
  faculty: "",
  department: "",
  password: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
  matricule: yup.string(),
  sex: yup.string(),
  dateOfBirth: yup.date(),
  faculty: yup.string(),
  department: yup.string(),
  password: yup.string(),
});

const Signup = () => {
  const { login, errorMessage } = useContext(AuthContext);

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();

  const onHandleSubmit = async (values, props) => {
    const isLoggedIn = await login(values);
    props.setSubmitting(false);
    isLoggedIn && navigate("/admin");
  };

  const [name, setName] = React.useState([]);
  const handleChangeFaculty = (event) => {
    const {
      target: { value },
    } = event;
    setName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={gridStyle}
    >
      <Grid item display="contents" alignContent="center">
        <img
          src={logo}
          alt="logo"
          style={{
            width: "250px",
            height: "250px",
            objectFit: "contain",
          }}
        />

        <h1 style={{ marginTop: "initial" }}> Sign Up</h1>
      </Grid>
      <Grid sx={{ display: "flex", alignItems: "center" }} md={6} Spacing={2}>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            paddingRight: "1rem",
          }}
        >
          <img
            src={sideimage}
            alt="vote"
            style={
              {
                // alignSelf: "stretch",
                // objectFit: "cover",
              }
            }
          />
        </Box>
        <Grid item>
          <Formik
            onSubmit={onHandleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Typography
                  className={errorMessage ? "errorMessage" : "offscreen"}
                  aria-live="assertive"
                  sx={{
                    fontWeight: 900,
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {errorMessage}
                </Typography>
                <Field
                  as={InputText}
                  label="First Name"
                  name="firstName"
                  type="string"
                  fullWidth
                  required
                  onChange={props.handleChange}
                  value={props.values.firstName}
                />
                <Field
                  as={InputText}
                  label="Last Name"
                  name="lastName"
                  type="string"
                  fullWidth
                  required
                  onChange={props.handleChange}
                  value={props.values.firstName}
                />
                <Field
                  as={InputText}
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  onChange={props.handleChange}
                  value={props.values.email}
                />
                <Field
                  as={InputText}
                  label="Matricule"
                  name="matricule"
                  type="string"
                  fullWidth
                  required
                  onChange={props.handleChange}
                  value={props.values.matricule}
                />
                <Field
                  as={RadioButton}
                  name="sex"
                  required
                  onChange={props.handleChange}
                  value={props.values.sex}
                />
                <Box sx={{ display: "flex" }}>
                  <Field
                    as={DateInput}
                    required
                    onChange={props.handleChange}
                    value={props.values.dateOfBirth}
                  />
                  <Field
                    as={DropdownList}
                    // name="faculty"
                    required
                    onChange={handleChangeFaculty}
                    value={name}
                  />
                </Box>
                <Field
                  as={InputText}
                  label="Password"
                  name="password"
                  type={PasswordInputType}
                  fullWidth
                  required
                  iconEnd={ToggleIcon}
                  onChange={props.handleChange}
                  value={props.values.password}
                />
                <Field
                  as={Button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={props.isSubmitting}
                  sx={btnStyle}
                  btnText={
                    props.isSubmitting ? (
                      <CircularProgress
                        style={{
                          width: "20px",
                          height: "20px",
                          size: "0.5rem",
                        }}
                      />
                    ) : (
                      "Sign up"
                    )
                  }
                  fullWidth
                />
              </Form>
            )}
          </Formik>
          {/* <Box>
            <Typography>Already have an account? Sign in</Typography>
          </Box> */}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Signup;
