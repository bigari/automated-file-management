import React from "react";
import { Box, Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import grey from "@material-ui/core/colors/grey";

const borderColor = grey[300];

const Reply = function(props) {
  const reply = props.reply;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const edit = function() {};
  const deleteReply = function() {};
  const closeMenu = function() {
    setAnchorEl(null);
  };
  const showMenu = function(event) {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box p={2} borderTop={1} borderColor={borderColor}>
      <Box
        display="flex"
        flexDirection="horizontal"
        justifyContent="space-between"
      >
        {/* username + timestamp */}
        <Box>
          <Box pb={1}>{reply.username} - Moderator</Box>
          <Box pb={2}>{reply.timestamp}</Box>
        </Box>

        {/* dropdown option button */}
        <IconButton
          onClick={showMenu}
          disableRipple={true}
          disableFocusRipple={true}
          size="small"
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          key="menu"
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={edit}>reply</MenuItem>
          <MenuItem onClick={deleteReply}>delete</MenuItem>
        </Menu>
      </Box>
      <Box pb={1}>{reply.content}</Box>
    </Box>
  );
};

export default Reply;
