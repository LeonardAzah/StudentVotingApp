import React from "react";
import { Card, Typography, Avatar, Box } from "@mui/material";
import Buttons from "./Button";
import me from "../assets/me.jpg";
import styled from "@emotion/styled";

const StyledCard = styled((props) => <Card {...props} />)(({ theme }) => ({
  padding: "0.5rem",
  borderRadius: "0.5rem",
  backgroundColor: "#fafafa",
  boxShadow: 5,
  width: "333px",
  height: "222px",
}));

const styledAvatar = {
  height: "10rem",
  width: "8rem",
};

const VoteCard = ({ name, bio, handleClick, image }) => {
  return (
    <StyledCard elevation={1}>
      <Box sx={{ display: "block" }}>
        <Box sx={{ display: "flex", height: "10rem" }}>
          <Avatar
            variant="rounded"
            sx={styledAvatar}
            alt="photo"
            src={`http://localhost:3500/uploads/` + image}
          />

          <Box sx={{ padding: "0.1rem", overflow: "auto" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#233862", textAlign: "center" }}
            >
              {name}
            </Typography>

            <Typography variant="body2" sx={{ textAlign: "center" }}>
              {bio}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            paddingTop: "0.5rem",
          }}
        >
          <Buttons
            variant="contained"
            color="primary"
            btnText="Vote"
            sx={{ fontWeight: 700, fontSize: "17px" }}
            onClick={handleClick}
            fullWidth
          />
        </Box>
      </Box>
    </StyledCard>
  );
};

export default VoteCard;
