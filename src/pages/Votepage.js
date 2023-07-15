import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { Typography, Box, Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import VoteCard from "../components/VoteCard";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";
import Spinner from "../components/Spinner";
import NotPresent from "../components/NotPresent";
import Modal from "../components/Modal";
import CountdownTimer from "../components/CountdownTimer";

const Votepage = () => {
  const { id } = useParams();

  const [open, setOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const userInfo = window.localStorage.getItem("user");
  const user = JSON.parse(userInfo);
  const studentId = user.id;

  const [response, errorMessage, loading, axiosFetch] = useAxios();
  const CANDIDATES_URL = `/poll/candidates/${id}`;
  // const VOTE_URL = `/std/vote/${studentId}/poll/${id}/candidate/${selectedStudent}`;
  const VOTE_URL = `/poll/vote/${studentId}/poll/${id}/candidate/${selectedStudent}`;

  const handleClickOpen = (candidate) => {
    setData(candidate);
    setSelectedStudent(candidate.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const handleSubmit = async () => {
    const success = await axiosFetch({
      axiosInstance: axiosInstance,
      method: "post",
      url: VOTE_URL,
    });
    if (success) {
      setShowSuccessAlert(true);
      getData();
      handleClose();
    } else {
      handleClose();
      setShowErrorAlert(true);
    }
  };

  const getData = async () => {
    const success = await axiosFetch({
      axiosInstance: axiosInstance,
      method: "get",
      url: CANDIDATES_URL,
    });

    return axiosFetch;
  };

  useEffect(() => {
    getData();
  }, []);

  const candidates = response;

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  return (
    <Box>
      <Box sx={{ paddingBottom: "5rem" }}>
        <Appbar />
      </Box>

      <CountdownTimer id={id} />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#01579B",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Vote for your preferred candidate
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ padding: "0.5rem", display: "flex", gap: 2.5 }}>
            <Modal
              open={open}
              handleClose={handleClose}
              text={`Vote for ${
                data && data.name
              },  Are you sure you want to proceed?`}
              handleSubmit={handleSubmit}
            />
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              open={showSuccessAlert}
              autoHideDuration={6000}
              onClose={handleAlertClose}
            >
              <Alert
                onClose={handleAlertClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Vote successfully cast
              </Alert>
            </Snackbar>

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={showErrorAlert}
              autoHideDuration={3000}
              onClose={handleAlertClose}
            >
              <Alert
                severity="error"
                variant="filled"
                onClose={handleAlertClose}
              >
                {errorMessage}
              </Alert>
            </Snackbar>

            <Box sx={{ padding: "0.5rem", display: "flex", gap: 2.5 }}>
              {loading && <Spinner text="Fetching elections..." />}

              {candidates && candidates.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: 2.5,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {candidates.map((candidate) => (
                    <>
                      <VoteCard
                        key={candidate.id}
                        name={candidate.name}
                        bio={candidate.bio}
                        image={candidate.image}
                        handleClick={() => handleClickOpen(candidate)}
                      />
                    </>
                  ))}
                </Box>
              ) : (
                <NotPresent text="No Available Candidates" />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Votepage;
