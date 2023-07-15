import React, { useContext, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import Buttons from "../components/Button";
import InputText, { usePasswordToggle } from "../components/InputText";

import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../hooks/AuthContext";

import logo from "../assets/logo.png";

export const gridStyle = {
  marginTop: { xs: "40%", sm: "5%" },
};

export const btnStyle = {
  fontSize: "0.9375rem",
};

const initialValues = {
  matricule: "",
  password: "",
};

const validationSchema = yup.object().shape({
  matricule: yup.string(),
  password: yup.string(),
});

const Signin = () => {
  const { login, errorMessage, userInfo } = useContext(AuthContext);

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();

  const onHandleSubmit = async (values, props) => {
    const isLoggedIn = await login(values);
    props.setSubmitting(false);
    isLoggedIn && navigate("/home");
  };

  useEffect(() => {
    onHandleSubmit();
  }, [errorMessage]);
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

        <h1 style={{ marginTop: "initial" }}> Sign In</h1>
      </Grid>
      <Grid item>
        <Formik
          onSubmit={onHandleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Typography
                className={
                  errorMessage && errorMessage ? "errorMessage" : "offscreen"
                }
                aria-live="assertive"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                  color: "#ba000d",
                }}
              >
                {errorMessage}
              </Typography>
              <Field
                as={InputText}
                label="Matricule"
                name="matricule"
                type="String"
                fullWidth
                required
                onChange={props.handleChange}
                value={props.values.matricule}
              />
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
                as={Buttons}
                type="submit"
                variant="contained"
                color="primary"
                disabled={props.isSubmitting}
                sx={btnStyle}
                btnText={
                  props.isSubmitting ? (
                    <CircularProgress
                      style={{ width: "20px", height: "20px", size: "0.5rem" }}
                    />
                  ) : (
                    "Sign In"
                  )
                }
                fullWidth
              />
            </Form>
          )}
        </Formik>
        <Typography
          sx={{ textAlign: "right", display: "block" }}
          component={Link}
        >
          Forgotten Password
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Signin;
