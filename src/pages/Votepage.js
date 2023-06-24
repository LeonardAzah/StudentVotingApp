import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import VoteCard from "../components/VoteCard";
import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";
import Spinner from "../components/Spinner";
import NotPresent from "../components/NotPresent";
import Modal from "../components/Modal";

const userInfo = window.localStorage.getItem("user");
const user = JSON.parse(userInfo);
const studentId = user.student;
const departmentId = user.department;

const Votepage = () => {
  const [open, setOpen] = React.useState(false);
  const [toSuccess, setToSuccess] = useState(false);
  const { id, candidateId } = useParams();
  const navigate = useNavigate();

  const [response, errorMessage, loading, axiosFetch] = useAxios();
  const CANDIDATES_URL = `/poll/candidates/${id}`;
  const VOTE_URL = `/std/vote/${studentId}/poll/${id}/candidate/${candidateId}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const success = await axiosFetch({
      axiosInstance: axiosInstance,
      method: "post",
      url: VOTE_URL,
    });
    if (success) {
      setToSuccess(true);
      navigate("/home/poll");
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
  console.log(candidates);

  const handleModal = {};
  return (
    <Box>
      <Box sx={{ paddingBottom: "8rem" }}>
        <Appbar />
      </Box>
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
            {loading && loading ? (
              <Spinner text="Fetching elections..." />
            ) : (
              candidates.map((candidate) => (
                <>
                  <VoteCard
                    key={candidate.id}
                    name={candidate.name}
                    bio={candidate.bio}
                    handleClick={handleClickOpen}
                  />
                  <Modal
                    open={open}
                    handleClose={handleClose}
                    text={`Vote for ${candidate.name},  Are you sure you want to proceed?`}
                    handleSubmit={handleSubmit}
                  />
                </>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Votepage;
