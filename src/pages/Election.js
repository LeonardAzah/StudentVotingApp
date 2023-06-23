import React, { useEffect, useContext } from "react";

import { Typography, Box } from "@mui/material";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";

import ElectionCard from "../components/ElectionCard";

import useAxios from "../hooks/useAxios";
import axiosInstance from "../api/AxiosInstance";
import AuthContext from "../hooks/AuthContext";
import Spinner from "../components/Spinner";
import Appbar from "../components/Appbar";

const userInfo = window.localStorage.getItem("user");
const user = JSON.parse(userInfo);
const facultyId = user.faculty;
const departmentId = user.department;
const ELECTION_URL = `/poll/faculty/${facultyId}/department/${departmentId}`;
const Election = () => {
  const [response, errorMessage, loading, axiosFetch] = useAxios();

  const getData = async () => {
    await axiosFetch({
      axiosInstance: axiosInstance,
      method: "get",
      url: ELECTION_URL,
    });

    return axiosFetch;
  };

  useEffect(() => {
    getData();
  }, []);

  const elections = response;
  console.log(elections);
  return (
    <Box>
      <Box sx={{ paddingBottom: "8rem" }}>
        <Appbar />
      </Box>
      <Box>
        <div
          style={{
            borderRadius: "25px",
            background: "rgba(5, 0, 255, 0.2)",
            padding: "0.5rem",
          }}
        >
          <Typography
            sx={{
              color: " #0500FF",
              textAlign: "center",
              fontWeight: "400",
              fontSize: "18px",
            }}
          >
            Faculty Elections
          </Typography>
        </div>
        <Box sx={{ padding: "0.5rem", display: "flex" }}>
          {loading && <Spinner text="Fetching elections..." />}

          {/* {response.length > 0 ? (
            response.map((election) => (
              <ElectionCard
                link="/result"
                result={election}
                title={election.title}
              />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                marginTop: "20%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <BallotOutlinedIcon />

              <Typography
                component="h6"
                variant="h6"
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  fontWeight: "600",
                  fontSize: "1.4rem",
                }}
              >
                No Available Elections
              </Typography>
            </Box>
          )} */}
        </Box>
      </Box>

      <Box>
        <div
          style={{
            borderRadius: "25px",
            background: "rgba(5, 0, 255, 0.2)",
            padding: "0.5rem",
          }}
        >
          <Typography
            sx={{
              color: " #0500FF",
              textAlign: "center",
              fontWeight: "400",
              fontSize: "18px",
            }}
          >
            Departmental Elections
          </Typography>
        </div>
        <Box sx={{ padding: "0.5rem" }}>
          <ElectionCard />
        </Box>
      </Box>
    </Box>
  );
};

export default Election;
