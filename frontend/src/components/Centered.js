import React from "react";
import Box from "@material-ui/core/Box";


const Centered = props => {
  const label = props.label;
  return (
    <Box
      p={1}
      pl={4}
      display="flex"
      style={{
        width: "100%"
      }}
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      bgcolor="background.paper"
    >
      <Box p={1} bgcolor="grey.300" textAlign="center">
        {label}
      </Box>
    </Box>
  );
};

export default Centered;
