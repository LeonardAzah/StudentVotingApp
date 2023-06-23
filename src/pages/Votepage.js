import React from "react";
import Appbar from "../components/Appbar";

const Votepage = () => {
  return (
    <div>
      <Box sx={{ paddingBottom: "8rem" }}>
        <Appbar />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#01579B",
            fontWeight: "700",
            position: "absolute",
            textAlign: "center",
          }}
        >
          Vote for your preferred candidate
        </Typography>
      </Box>
    </div>
  );
};

export default Votepage;
