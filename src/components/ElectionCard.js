import React from "react";
import {
  Card,
  Typography,
  CardMedia,
  CardHeader,
  Avatar,
  CardContent,
  Box,
} from "@mui/material";
import styled from "@emotion/styled";

import sideimage from "../assets/sideimage.PNG";
import { Link } from "react-router-dom";

const StyledCard = styled((props) => <Card {...props} />)(({ theme }) => ({
  padding: "1rem",
  borderRadius: "0.5rem",
  backgroundColor: "#fefefe",
  boxShadow: 5,
  width: "150px",
  height: "200px",
}));
const styledImage = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: "100%",
  width: "100%",
  objectFit: "cover",
  cursor: "pointer",
  borderRadius: "0.5rem",
  border: "1px solid #f9f9f9",
};
const styledAvatar = {
  height: "4rem",
  width: "4rem",
  margin: "10px auto",
  display: "flex",
  justifyContent: "center",
};
const ElectionCard = ({ election, link }) => {
  const { title, id } = election;
  <StyledCard elevation={1}>
    <Box component={Link} to={link} state={id}>
      <Avatar variant="circular" sx={styledAvatar}>
        <CardMedia
          component="img"
          height="50"
          width="50"
          image={sideimage}
          alt="vote"
          sx={styledImage}
        />
      </Avatar>

      <CardContent>
        <Typography variant="body1">{title}</Typography>
      </CardContent>
    </Box>
  </StyledCard>;
};

export default ElectionCard;
