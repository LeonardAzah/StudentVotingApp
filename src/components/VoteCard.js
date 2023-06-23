import React from "react";
import {
  Card,
  Typography,
  CardMedia,
  Avatar,
  CardHeader,
  CardContent,
} from "@mui/material";
import Buttons from "./Button";
import sideimage from "../assets/sideimage.PNG";

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

const VoteCard = (props) => {
  const { image, name, bio } = props;
  return (
    <StyledCard elevation={1}>
      <Avatar variant="circular" sx={styledAvatar}>
        <CardMedia
          component="img"
          height="50"
          width="50"
          image={image}
          alt="vote"
          sx={styledImage}
        />
      </Avatar>
      <CardContent>
        <Typography variant="body1">{name}</Typography>

        <Typography variant="body1">{bio}</Typography>
      </CardContent>

      <Buttons variant="text" color="primary" btnText="Vote" />
    </StyledCard>
  );
};

export default VoteCard;
